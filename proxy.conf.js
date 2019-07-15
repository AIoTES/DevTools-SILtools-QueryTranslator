const PROXY_CONFIG = {
  "/auth": {
    "target": "http://localhost:3000",
    "secure": false,
    "changeOrigin": false,
    "logLevel": "debug"
  },
  "/api": {
      "target": "http://160.40.50.208:8081",
      "secure": false,
      "pathRewrite": {
        "^/api": ""
      },
      "changeOrigin": false,
      "logLevel": "debug"
  }
}

module.exports = PROXY_CONFIG;