// cypress/e2e/mahasiswa/auth/register/01-form-elements.cy.js

describe('Register Page - Access and Form Elements', () => {
  beforeEach(() => {
    cy.visitAuth('/auth/register');
  });

  it('Visit register page', () => {
    cy.contains('NIM').should('be.visible');
  });

  it('Contains all required form elements', () => {
    // NIM field
    cy.verifyInputAttributes('nim', {
      type: 'text',
      placeholder: 'contoh: 12xxxxxxx'
    });

    // Semester field
    cy.getInput('semester').should('be.visible').should('have.attr', 'type', 'text');

    // Name field
    cy.verifyInputAttributes('name', {
      type: 'text',
      placeholder: 'contoh: Ahmad Syahroni'
    });

    // WhatsApp number field
    cy.verifyInputAttributes('whatsapp_number', {
      type: 'tel',
      placeholder: 'contoh: 08xxxxxxxxxx'
    });

    // Email field
    cy.verifyInputAttributes('email', {
      type: 'email',
      placeholder: 'contoh: email@student.itera.ac.id'
    });

    // Password field
    cy.getInput('password').should('be.visible').should('have.attr', 'type', 'password');
  });
});
