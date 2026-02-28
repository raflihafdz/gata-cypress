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

describe("Bimbingan - Dosen Menambah Jadwal Bimbingan", () => {
  it("KBA-003 Dosen dapat menambahkan jadwal ketersediaan bimbingan", () => {
    loginAsLecturer("andre.febrianto@if.itera.ac.id", "password.AFO");
    navigateToDashboardBimbingan();
    cy.contains("a", "Kelola Jadwal").click();
    cy.url().should("include", "/dosen/bimbingan/jadwal");
    cy.contains("Kelola Jadwal Ketersediaan");
    cy.contains("button", "Tambah Sesi").click();
    cy.contains("Tambah Sesi");


    cy.get('input[type="time"][id="start_time"]').type("10:00");
    cy.get('input[type="time"][id="end_time"]').type("12:00");

    cy.get('input[id="location"]').type("Ruang 101");

    cy.get('button[type="button"]').contains("Tambah").click();
  });
});
