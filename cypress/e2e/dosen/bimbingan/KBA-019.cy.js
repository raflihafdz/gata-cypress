const loginAsLecturer = (email, password) => {
  cy.viewport(1366, 768);
  cy.visit("http://gata.web.id/auth/login");
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.contains("Selamat Datang");
};

const navigateToDashboardBimbingan = () => {
  cy.contains("button", "Bimbingan").click();

  cy.contains("button", "Bimbingan")
    .parent()
    .find("*")
    .contains("Dashboard")
    .click();
  cy.url().should("include", "/bimbingan");
  cy.contains("Jadwal Bimbingan Tugas Akhir");
};

describe("Bimbingan - Dashboard, Topik Yang Diajukan", () => {
  it("KBA-013-016 Dosen melihat topik, mahasiswa yang mengajukan, akses link draft", () => {
    loginAsLecturer("miranti.verdiana@if.itera.ac.id", "password.MIV");
    navigateToDashboardBimbingan();

    // Scroll card paling bawah (hari Jumat)

    cy.get('[data-slot="card"]').last().scrollIntoView();
    cy.pause(500);

    cy.contains("Aksi Sesi Bimbingan");

    // Pilih aksi
    cy.get('[role="combobox"]').eq(0).click();
    cy.get('[role="option"]').contains("Batalkan").click();

    // Isi catatan
    cy.get("#catatan").type("Bimbingan reschedule ya.");
  });
});
