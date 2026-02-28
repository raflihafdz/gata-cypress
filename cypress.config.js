const { defineConfig } = require("cypress");
const path = require("path");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Tambahkan event listener Cypress di sini (kalau ada)
    },
    viewportWidth: 1366,
    viewportHeight: 768,
    // Optimasi untuk performa
    video: false, // Matikan video saat lokal, aktifkan di CI
    screenshotOnRunFailure: true,
    videoCompression: 32,
    defaultCommandTimeout: 8000,
    requestTimeout: 8000,
    responseTimeout: 8000,
    pageLoadTimeout: 30000,
    // Retry otomatis untuk test yang gagal
    retries: {
      runMode: 2, // CI mode: retry 2x
      openMode: 0 // Dev mode: tidak retry
    },
    // Pattern untuk spec files
    specPattern: 'cypress/e2e/**/*.cy.js',
    // Browser yang digunakan
    chromeWebSecurity: false,
    // Eksperimen untuk performa
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 10
  },
  webpack: {
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, "cypress/support/components"),
      },
    },
  },
});

