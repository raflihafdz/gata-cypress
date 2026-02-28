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
  cy.contains("button","Validasi").should("be.visible").click();
  cy.url().should("include", "/dosen/validasi");
};

describe ("Belum ada mahasiswa pendaftar",()=>{
    it("Tidak ada pendaftar mahasiswa",()=>{
        loginAsLecturer("lecturer1@example.com");
        navigateToTAValidation();
        cy.contains("Belum ada Tugas Akhir untuk Divalidasi");
    });
});
