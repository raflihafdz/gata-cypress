const loginAsLecturer = (email) => {
  cy.viewport(1366, 768);
  cy.visit("http://localhost:3000/auth/login");
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type("password123");
  cy.get('button[type="submit"]').click();
  cy.contains("Dashboard Dosen");
};

const navigateToTAValidation = () => {
  cy.contains("button", "Tugas Akhir").click();
  cy.contains("button","validasi").sholud("be.visible").click();
  cy.url().should("include", "/dosen/validasi");
};

describe("Mendapatkan data pendaftar yang mendaftar pada dosen tersebut",() =>{
  it("Positive - GET data pendaftar",()=>{
    loginAsLecturer();
    navigateToTAValidation();
    cy.contains("Ringkasan Kuota Pembimbing");
  });

});