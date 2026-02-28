// cypress/e2e/mahasiswa/auth/register/02-field-validations.cy.js

describe('Register Page - Field Validations', () => {
  beforeEach(() => {
    cy.visitAuth('/auth/register');
  });

  it('Do register with null value', () => {
    cy.submitForm();
    cy.shouldShowError('NIM wajib diisi');
    cy.shouldShowError('Nama wajib diisi');
    cy.shouldShowError('Nomor WhatsApp wajib diisi');
    cy.shouldShowError('Email wajib diisi');
    cy.shouldShowError('Password wajib diisi');
  });

  describe('NIM Validations', () => {
    it('Do input NIM with more than 9 characters', () => {
      cy.typeInInput('nim', '1211400610');
      cy.blurInput('nim');
      cy.shouldShowError('NIM harus berupa 9 digit angka');
    });

    it('Do input NIM with less than 9 characters', () => {
      cy.typeInInput('nim', '12114006');
      cy.blurInput('nim');
      cy.shouldShowError('NIM harus berupa 9 digit angka');
    });

    it('Do input NIM with valid value', () => {
      cy.typeInInput('nim', '121140061');
      // No error should appear
    });

    it('Do input NIM with null value and submit', () => {
      cy.submitForm();
      cy.shouldShowError('NIM wajib diisi');
    });
  });

  describe('Name Validations', () => {
    it('Do input name with valid value', () => {
      cy.typeInInput('name', 'Rafli Haikal Aflah');
      // No error should appear
    });

    it('Do input name with null value and submit', () => {
      cy.submitForm();
      cy.shouldShowError('Nama wajib diisi');
    });
  });

  describe('WhatsApp Number Validations', () => {
    it('Do input nomor whatsapp with valid value', () => {
      cy.typeInInput('whatsapp_number', '081234567890');
      // No error should appear
    });

    it('Do input nomor whatsapp with null value and submit', () => {
      cy.submitForm();
      cy.shouldShowError('Nomor WhatsApp wajib diisi');
    });
  });

  describe('Email Validations', () => {
    it('Do input email with valid value', () => {
      cy.typeInInput('email', 'rafli.121140061@student.itera.ac.id');
      // No error should appear
    });

    it('Do input email with null value and submit', () => {
      cy.submitForm();
      cy.shouldShowError('Email wajib diisi');
    });
  });
});
