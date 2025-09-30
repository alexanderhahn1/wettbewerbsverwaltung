// httpyac.config.js
module.exports = {
  // options...
  log: {
    level: "info",
    supportAnsiColors: true,
  },
  cookieJarEnabled: true,
  environments: {
    "$shared": {
    },
    "local": {
        "KEYCLOAK_URL": "http://localhost:8000",
        "BACKEND_URL": "http://localhost:8080/api"
    },
    "leonding": {
        "KEYCLOAK_URL": "https://auth.htl-leonding.ac.at",
    }
  }
}