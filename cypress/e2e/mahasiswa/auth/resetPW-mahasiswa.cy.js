// cypress/e2e/mahasiswa/auth/resetPW-mahasiswa-optimized.cy.js

describe('Reset Password Page - Access and Reset', () => {
  const resetToken = 'sampletoken';
  
  beforeEach(() => {
    cy.visitAuth(`/mahasiswa/reset-password?token=${resetToken}`);
  });

  it('Get reset password page', () => {
    cy.contains('RESET PASSWORD').should('be.visible');
  });

  it('Do reset password with matching passwords', () => {
    cy.fillResetPasswordForm('testing', 'testing');
    cy.submitForm();
    cy.shouldShowSuccess('Password berhasil diubah');
  });
});
