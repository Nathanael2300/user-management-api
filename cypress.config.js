import { defineConfig } from "cypress";
import path from "path";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    env: {
      hideCredentials: true,
    },
    supportFile: path.resolve("tests/E2e/cypress/support/e2e.js"),
    specPattern: "tests/E2e/cypress/e2e/**/*.cy.js",
    baseUrl: "http://localhost:3000/users",
  },
});
