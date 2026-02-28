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
};

describe("Cek Halaman Riwayat TA Saat Pendaftaran Ditolak", () => {
  it("Login", () => {
    loginAsStudent("student1@example.com");
    openRiwayatTA();
    cy.contains("Status Pendaftaran: Ditolak");
    cy.containst("button", "Hapus").click();
    cy.contains("Apakah Anda yakin ingin melanjutkan ?");
    cy.contains("button", "Ya").click();
    cy.url().should("include", "/mahasiswa/tugas-akhir/daftar");
  });
});
