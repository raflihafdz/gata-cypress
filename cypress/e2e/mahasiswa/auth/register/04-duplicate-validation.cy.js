// cypress/e2e/mahasiswa/auth/register/04-duplicate-validation.cy.js

describe('Register Page - Duplicate Data Validation', () => {
  beforeEach(() => {
    cy.visitAuth('/auth/register');
  });

  it('Do register with registered NIM', () => {
    cy.fillRegisterForm({
      nim: '121140061',
      semester: '7',
      name: 'Rafli Test',
      whatsapp_number: '081234567890',
      email: 'rafli.test@student.itera.ac.id',
      password: 'test12345'
    });

    cy.submitForm();
    cy.shouldShowError('NIM sudah terdaftar');
  });

  it('Do register with registered Email', () => {
    cy.fillRegisterForm({
      nim: '121140999',
      semester: '7',
      name: 'Rafli Test',
      whatsapp_number: '081234567890',
      email: 'rafli.121140061@student.itera.ac.id',
      password: 'test12345'
    });

    cy.submitForm();
    cy.shouldShowError('Email sudah terdaftar');
  });
});
