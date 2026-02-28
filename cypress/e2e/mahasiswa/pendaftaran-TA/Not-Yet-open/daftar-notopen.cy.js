const loginAsStudent = (email) => {
  cy.viewport(1366, 768);
  cy.visit("http://localhost:3000/auth/login");
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type("password123");
  cy.get('button[type="submit"]').click();
  cy.contains("Progress Bimbingan");
};

const openPendaftaranTA = () => {
  cy.contains("button", "Pendaftaran TA").click();
  cy.contains("button", "Daftar").should("be.visible").click();
  cy.url().should("include", "/mahasiswa/tugas-akhir/daftar");
  cy.contains("Pendaftaran Tugas Akhir Belum Dibuka Kembali");
};

describe("Cek Halaman Pendaftaran TA Saat Belum Dibuka", () => {
    it("Login", () => {
    loginAsStudent("student12@example.com");
    openPendaftaranTA();
    });
});