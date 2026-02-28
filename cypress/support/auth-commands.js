// cypress/support/auth-commands.js
// Helper commands untuk authentication flows

/**
 * Visit halaman dengan base URL yang konsisten
 * @param {string} path - Path relatif dari base URL
 */
Cypress.Commands.add('visitAuth', (path) => {
  cy.visit(`http://localhost:3000${path}`);
});

/**
 * Get form input by name attribute
 * @param {string} name - Name attribute of input
 */
Cypress.Commands.add('getInput', (name) => {
  return cy.get(`input[name="${name}"]`);
});

/**
 * Fill login form
 * @param {string} email - Email address
 * @param {string} password - Password
 */
Cypress.Commands.add('fillLoginForm', (email, password) => {
  if (email) {
    cy.getInput('email').type(email);
  }
  if (password) {
    cy.getInput('password').type(password);
  }
});

/**
 * Submit form
 */
Cypress.Commands.add('submitForm', () => {
  cy.get('button[type="submit"]').click();
});

/**
 * Fill register form dengan semua field
 * @param {object} data - Object berisi nim, semester, name, whatsapp_number, email, password
 */
Cypress.Commands.add('fillRegisterForm', (data = {}) => {
  const {
    nim,
    semester,
    name,
    whatsapp_number,
    email,
    password
  } = data;

  if (nim) cy.getInput('nim').type(nim);
  if (semester) cy.getInput('semester').type(semester);
  if (name) cy.getInput('name').type(name);
  if (whatsapp_number) cy.getInput('whatsapp_number').type(whatsapp_number);
  if (email) cy.getInput('email').type(email);
  if (password) cy.getInput('password').type(password);
});

/**
 * Fill forgot password form
 * @param {string} email - Email address
 */
Cypress.Commands.add('fillForgotPasswordForm', (email) => {
  cy.getInput('email').type(email);
});

/**
 * Fill reset password form
 * @param {string} password - New password
 * @param {string} confirmPassword - Confirm password
 */
Cypress.Commands.add('fillResetPasswordForm', (password, confirmPassword) => {
  cy.getInput('password').type(password);
  cy.getInput('confirmPassword').type(confirmPassword);
});

/**
 * Assert validation error message
 * @param {string} message - Error message to check
 */
Cypress.Commands.add('shouldShowError', (message) => {
  cy.contains(message, { timeout: 5000 }).should('be.visible');
});

/**
 * Assert success message
 * @param {string} message - Success message to check
 */
Cypress.Commands.add('shouldShowSuccess', (message) => {
  cy.contains(message, { timeout: 10000 }).should('be.visible');
});

/**
 * Verify input field attributes
 * @param {string} name - Input name
 * @param {object} attrs - Attributes to verify {type, placeholder, etc}
 */
Cypress.Commands.add('verifyInputAttributes', (name, attrs = {}) => {
  const input = cy.getInput(name);
  input.should('be.visible');
  
  Object.keys(attrs).forEach(attr => {
    input.should('have.attr', attr, attrs[attr]);
  });
});

/**
 * Clear and type into input
 * @param {string} name - Input name
 * @param {string} value - Value to type
 */
Cypress.Commands.add('typeInInput', (name, value) => {
  cy.getInput(name).clear().type(value);
});

/**
 * Trigger blur event on input
 * @param {string} name - Input name
 */
Cypress.Commands.add('blurInput', (name) => {
  cy.getInput(name).blur();
});
