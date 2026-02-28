// cypress/e2e/mahasiswa/auth/forgetPW-mahasiswa-optimized.cy.js

describe('Forget Password Page - Request Reset Password', () => {
  beforeEach(() => {
    cy.visitAuth('/auth/forgot-password');
    cy.contains('Masukkan email Anda untuk menerima link reset password').should('be.visible');
  });

  it('Request Reset Password with valid email', () => {
    cy.fillForgotPasswordForm('rafli.121140061@student.itera.ac.id');
    cy.submitForm();
    
    // Tunggu response dengan smart assertion (bukan static wait)
    cy.shouldShowSuccess('Cek email untuk reset password.');
  });

  it('Request Reset Password with unregistered email', () => {
    cy.fillForgotPasswordForm('unregistered@student.itera.ac.id');
    cy.submitForm();
    
    // Tunggu response dengan smart assertion
    cy.shouldShowError('Email tidak ditemukan.');
  });
});
