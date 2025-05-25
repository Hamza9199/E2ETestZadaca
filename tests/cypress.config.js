const {defineConfig} = require("cypress");

module.exports = defineConfig({
  e2e : {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl : "http://localhost:5173" || process.env.CYPRESS_BASE_URL,
  },
});
