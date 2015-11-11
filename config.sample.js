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
};


module.exports = config;
