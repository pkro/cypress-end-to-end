import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', ({
        // define functions to be run outside here
        seedDatabase(someValue) {
          // run node js code, e.g. clean up and seed the test database,
          // delete and re-create a test client in directus using the CLI etc.
          console.log(`seeding database with argument ${someValue}`);

          // the method must return a value, null or a promise that resolves to a value or null
          return null;
        }
      }));
    },
  },
});
