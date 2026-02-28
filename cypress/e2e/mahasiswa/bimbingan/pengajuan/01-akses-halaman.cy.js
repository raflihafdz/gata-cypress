const loginAsStudent = (email) => {
  cy.viewport(1366, 768);
  cy.visit("http://localhost:3000/auth/login");
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type("password123");
  cy.get('button[type="submit"]').click();
  cy.contains("Progress Bimbingan");
};

describe("Pengajuan Bimbingan - Akses Halaman", () => {
  it("Mahasiswa mengakses halaman bimbingan saat belum mendaftar pengajuan TA", () => {
    loginAsStudent("student10@example.com");
    cy.wait(500);
    cy.contains("button", "Bimbingan").should("not.exist");
  });

  it("Mahasiswa dapat mengakses halaman pengajuan bimbingan saat pengajuan TA diterima", () => {
    loginAsStudent("student1@example.com");
    cy.wait(500);
    cy.contains("button", "Bimbingan").click();
    cy.contains("button", "Pengajuan").should("be.visible");
  });
});
