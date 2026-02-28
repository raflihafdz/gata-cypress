const loginAsStudent = (email, password) => {
  cy.viewport(1366, 768);
  cy.visit("https://gata.web.id/auth/login");
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.contains("Progress Bimbingan");
};

const navigateToPendaftaranSidang = () => {
  cy.contains("button", "Bimbingan").click();
  cy.contains("button", "Pengajuan Sidang").click();
  cy.url().should("include", "/mahasiswa/bimbingan/pengajuan-sidang");
  cy.contains("Pengajuan Sidang Tugas Akhir");
};

describe("Pendaftaran Sidang - Dashboard", () => {
  it("DSA-001 Mahasiswa memilih tipe sidang yang akan dipilih (proposal / hasil)", () => {
    loginAsStudent("student1@example.com", "password123");
    navigateToPendaftaranSidang();
    cy.get('button[role="combobox"]').eq(0).click();
    cy.pause(500);

    cy.contains("Dosen Pembimbing");
    cy.get('button[role="combobox"]').eq(1).click();
    cy.pause(500);

    cy.contains("Kelompok Keahlian");
    cy.get('button[role="combobox"]').eq(2).click();
    cy.pause(500);
    cy.get('button[role="combobox"]').eq(3).click();
    cy.pause(500);

    cy.contains("Link Draft Final Tugas Akhir");
    cy.get('button[role="combobox"]').eq(4).click();
    cy.pause(500);
    cy.get('input[placeholder="Contoh: Laporan_Final.pdf"]').type(
      "Draft Final TA"
    );
    cy.get("input[name='finalDraftLinks.0.url']").type(
      "https://drive.google.com/draft-final-ta"
    );

    cy.contains("Link Slide PPT");
    cy.get('button[role="combobox"]').eq(5).click();
    cy.pause(500);
    cy.get("input[name='pptLinks.0.name']").type("Draft Final TA");
    cy.get("input[name='pptLinks.0.url']").type(
      "https://drive.google.com/draft-final-ta"
    );

    // cy.contains("button", "Kirim Pengajuan Sidang").click();
  });
});
