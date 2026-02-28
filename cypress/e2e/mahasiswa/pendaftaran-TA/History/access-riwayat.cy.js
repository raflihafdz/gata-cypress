const loginAsStudent = (email) => {
  cy.viewport(1366, 768);
  cy.visit("http://localhost:3000/auth/login");
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type("password123");
  cy.get('button[type="submit"]').click();
  cy.contains("Progress Bimbingan");
};

const openRiwayatTA = () => {
  cy.contains("button", "Pendaftaran TA").click();
  cy.contains("button", "Riwayat").should("be.visible").click();
  cy.url().should("include", "/mahasiswa/tugas-akhir/riwayat");
  cy.contains("Resume Kebaharuan");
};

describe("Cek Halaman Riwayat TA Saat Sesudah Daftar", () => {
    it("Login", () => {
    loginAsStudent("student10@example.com");
    openRiwayatTA();
    });
});