const loginAsLecturer = (email, password) => {
  cy.viewport(1366, 768);
  cy.visit("http://gata.web.id/auth/login");
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.contains("Selamat Datang");
};

const navigateToPenilaian=()=>{
  cy.contains("button", "Penilaian")
    .parent() 
    .find("*")
    .contains("Penilaian")
    .click();
  cy.url().should("include", "/dosen/penilaian");
  cy.contains("Penilaian Sidang");
};

describe("Penilaian - Dosen Akses Penilaian Sidang", () => {
  it("DPA-001 Dosen dapat mengakses halaman Penilaian Sidang", () => {
    loginAsLecturer("aidil.afriansyah@if.itera.ac.id");
    navigateToPenilaian();
    cy.contains("button","↓ Detail").click();
    cy.contains("Lokasi");
    });
  });