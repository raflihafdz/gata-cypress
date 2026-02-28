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

const navigateToDashboardBimbingan = () => {
  cy.visit("http://localhost:3000/mahasiswa/bimbingan");
  cy.contains("Pengajuan Bimbingan Tugas Akhir");
};

describe("Pengajuan Bimbingan - Pemilihan Dosen Pembimbing", () => {
  beforeEach(() => {
    loginAsStudent("student1@example.com");
    navigateToPengajuan();
  });

  it("Mahasiswa dapat memilih dosen pembimbing yang available untuk hari besok", () => {
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

    cy.get(
      'input[placeholder="Contoh: Pembahasan BAB III - Metodologi Penelitian"]'
    ).type("Pembahasan BAB I - Pendahuluan");

    cy.get('input[placeholder="Contoh: BAB_III_Metodologi.pdf"]').type(
      "BAB 1 LATAR BELAKANG.pdf"
    );

    cy.get('input[placeholder="https://drive.google.com/file/d/..."]').type(
      "https://drive.google.com/file/d/1A2B3C4D5E6F7G8H9I0J"
    );

    cy.contains("button", "Kirim Pengajuan Bimbingan").click();

    navigateToDashboardBimbingan();
    cy.contains("13 November 2025");
  });

  it("Mahasiswa memilih dosen yang tidak available ", () => {
    cy.contains("Lecturer 02").should("be.visible");
    cy.get('button[role="combobox"]').eq(0).click();
    cy.pause();

  });
});
