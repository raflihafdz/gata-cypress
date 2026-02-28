const loginAsStudent = (email) => {
  cy.viewport(1366, 768);
  cy.visit("https://gata.web.id/auth/login");
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type("password123");
  cy.get('button[type="submit"]').click();
  cy.contains("Progress Bimbingan");
};

const cekDashboard = () => {
  cy.contains("button", "Bimbingan").click();
  cy.contains("Button", "Pengajuan").should("be.visible").click();
  cy.url().should("include", "/mahasiswa/bimbingan");
  cy.contains("Pengajuan Bimbingan Tugas Akhir");
};

describe ("Akses Dashboard",() => {
  it ("Login and Akses Dashboard", () => {
    loginAsStudent ("student1@example.com");
    cekDashboard();
  });
});