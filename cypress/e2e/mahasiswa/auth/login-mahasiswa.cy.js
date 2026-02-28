// cypress/e2e/mahasiswa/auth/login-mahasiswa.cy.js

describe('Login Page Mahasiswa - Form Elements', () => {
  beforeEach(() => {
    cy.visitAuth('/auth/login');
  });

  it('Contains form elements', () => {
    cy.getInput('email').should('be.visible');
    cy.getInput('password').should('be.visible');
  });
});

describe('Login Page - Validation Empty Fields', () => {
  beforeEach(() => {
    cy.visitAuth('/auth/login');
  });

  it('Do login with null value', () => {
    cy.submitForm();
    cy.shouldShowError('Email wajib diisi');
    cy.shouldShowError('Password wajib diisi');
  });
});

describe('Login Page - Validation Incorrect Credentials', () => {
  beforeEach(() => {
    cy.visitAuth('/auth/login');
  });

  it('Do login with incorrect password', () => {
    cy.fillLoginForm('student1@example.com', 'wrongpassword123');
    cy.submitForm();
    cy.shouldShowError('Password salah');
  });

  it('Do login with unregistered email', () => {
    cy.fillLoginForm('unregistered@example.com', 'password123');
    cy.submitForm();
    cy.shouldShowError('Email tidak ditemukan');
  });
});

describe('Login Page - Protected Route', () => {
  it('Redirect to login page when accessing protected route', () => {
    cy.visitAuth('/mahasiswa');
    cy.url().should('include', '/auth/login');
  });
});

describe('Login Page - Successful Login', () => {
  beforeEach(() => {
    cy.visitAuth('/auth/login');
  });

  it('Do login with registered email & password value', () => {
    cy.fillLoginForm('student1@example.com', 'password123');
    cy.submitForm();
    cy.shouldShowSuccess('Progress Bimbingan');
  });
});
