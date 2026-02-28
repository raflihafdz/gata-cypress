// cypress/e2e/mahasiswa/auth/register/03-successful-registration.cy.js

describe('Register Page - Successful Registration', () => {
  beforeEach(() => {
    cy.visitAuth('/auth/register');
  });

  it('Do register with valid input', () => {
    cy.fillRegisterForm({
      nim: '121140061',
      semester: '7',
      name: 'Rafli Haikal Aflah',
      whatsapp_number: '081234567890',
      email: 'rafli.121140061@student.itera.ac.id',
      password: 'test12345'
    });

    cy.submitForm();
    cy.url().should('eq', 'http://localhost:3000/mahasiswa');
  });
});
