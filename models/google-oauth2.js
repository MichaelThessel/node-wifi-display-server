var fs = require('fs');
var readline = require('readline');
var googleAuth = require('google-auth-library');
var config = require('../config.js');

/**
 * Allows to Authenticate for Google Apps access
 */
function GoogleOauth2() {
    this.SCOPES = [
       'https://www.googleapis.com/auth/calendar.readonly',
       'https://www.googleapis.com/auth/gmail.readonly'
    ];
    this.TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) + '/.credentials/';
    this.TOKEN_PATH = this.TOKEN_DIR + 'google-oauth2-token.json';
}

/**
 * Authenticate and execute callback
 * @param {function} callback The callback to call with the authorized client.
 */
GoogleOauth2.prototype.execute = function(callback) {
    this.authorize(config.googleOauth2.clientSecret, callback);
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
GoogleOauth2.prototype.authorize = function(credentials, callback) {
    var clientSecret = credentials.installed.client_secret;
    var clientId = credentials.installed.client_id;
    var redirectUrl = credentials.installed.redirect_uris[0];
    var auth = new googleAuth();
    var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

    // Check if we have previously stored a token.
    var _this = this;
    fs.readFile(this.TOKEN_PATH, function(err, token) {
        if (err) {
            _this.getNewToken(oauth2Client, callback);
        } else {
            oauth2Client.credentials = JSON.parse(token);
            callback(oauth2Client);
        }
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *         client.
 */
GoogleOauth2.prototype.getNewToken = function(oauth2Client, callback) {
    var authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: this.SCOPES
    });

    console.log('Authorize this app by visiting this url: ', authUrl);

    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    var _this = this;
    rl.question('Enter the code from that page here: ', function(code) {
        rl.close();
        oauth2Client.getToken(code, function(err, token) {
            if (err) {
                console.log('Error while trying to retrieve access token', err);
                return;
            }
            oauth2Client.credentials = token;
            _this.storeToken(token);
            callback(oauth2Client);
        });
    });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
GoogleOauth2.prototype.storeToken = function(token) {
    try {
        fs.mkdirSync(this.TOKEN_DIR);
    } catch (err) {
        if (err.code != 'EEXIST') {
            throw err;
        }
    }
    fs.writeFile(this.TOKEN_PATH, JSON.stringify(token));
    console.log('Token stored to ' + this.TOKEN_PATH);
}

module.exports = new GoogleOauth2();
