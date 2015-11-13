var config = {
    "display": {
        "ip": "10.0.0.140",
        "port": 8090
    },
    "jobs": {
        "gratificator": {
            "name": "FooBar",
            "attributes": ["is awesome", "rocks", "is the best", "-> the man", "splendid looks", "shiny!!!"],
        },
        "githubNotification": {
            "accessToken": "insertyouraccesstokenhere", // GitHub > Settings > Personal Access Token
        },
        "networkTraffic": {
            "interface": "eth0",
        },
        "weather": {
            "apiKey": "insertyourapikeyhere", // Forecast.io API key
            "latitude": 31.5225707,
            "longitude": 34.45317,
        },
    },
    "googleOauth2": {
       "clientSecret": {
          "installed": {
             "client_id":"772054908554-qb8scvp3lrrhsps6fnprfb77ljsg9l2g.apps.googleusercontent.com",
             "auth_uri":"https://accounts.google.com/o/oauth2/auth",
             "token_uri":"https://accounts.google.com/o/oauth2/token",
             "auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs",
             "client_secret":"AqzsyZxJBY3GVSA3rDzALimU",
             "redirect_uris":[
                "urn:ietf:wg:oauth:2.0:oob",
                "http://localhost"
             ]
          }
       }
    }
};


module.exports = config;
