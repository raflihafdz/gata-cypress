const loginAsStudent = (email) => {
  cy.viewport(1366, 768);
  cy.visit("http://localhost:3000/auth/login");
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type("password123");
  cy.get('button[type="submit"]').click();
  cy.contains("Progress Bimbingan");
};

const navigateToPengajuan = () => {
  cy.contains("button", "Bimbingan").click();
  cy.contains("button", "Pengajuan").click();
  cy.url().should("include", "/mahasiswa/bimbingan");
  cy.contains("Pengajuan Bimbingan Tugas Akhir");
};

describe("Pengajuan Bimbingan - Form Topik Bimbingan", () => {
  beforeEach(() => {
    loginAsStudent("student1@example.com");
    navigateToPengajuan();
  });
  it("Tidak mengisi form topik", () => {
    cy.contains("button", "Pilih dosen pembimbing...").click();

    cy.contains("Lecturer 01").should("be.visible");
    cy.get('button[role="combobox"]').eq(0).click();
    cy.pause();
    cy.get('button[role="combobox"] span')
      .invoke("text")
      .should("not.be.empty");

    cy.contains("Slot Waktu Tersedia");
    cy.get('button[role="combobox"]').eq(1).click();
    cy.pause();
    cy.get('button[role="combobox"] span')
      .invoke("text")
      .should("not.be.empty");

    cy.contains("button", "Kirim Pengajuan Bimbingan").click();
    cy.contains("Topik bimbingan harus diisi");
    cy.contains("Nama file harus diisi");
    cy.contains("Link harus diisi");
  });
});
