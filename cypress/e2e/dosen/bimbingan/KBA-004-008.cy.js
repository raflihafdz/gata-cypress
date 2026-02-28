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

describe("Bimbingan - Form Handler Check", () => {
  it("KBA-004 Hanya mengisi hari ", () => {
    loginAsLecturer("andre.febrianto@if.itera.ac.id", "password.AFO");
    navigateToDashboardBimbingan();
    cy.contains("a", "Kelola Jadwal").click();
    cy.url().should("include", "/dosen/bimbingan/jadwal");
    cy.contains("Kelola Jadwal Ketersediaan");
    cy.contains("button", "Tambah Sesi").click();
    cy.contains("Tambah Sesi");

    // cy.get('button[role="combobox"]').click();
    // cy.get('ul[role="listbox"] > li').contains("Senin").click();

    cy.get('button[type="button"]').contains("Tambah").click();
    cy.contains("Waktu mulai harus diisi");
  });

  it("KBA-005 Hanya mengisi waktu mulai ", () => {
    loginAsLecturer("andre.febrianto@if.itera.ac.id", "password.AFO");
    navigateToDashboardBimbingan();
    cy.contains("a", "Kelola Jadwal").click();
    cy.url().should("include", "/dosen/bimbingan/jadwal");
    cy.contains("Kelola Jadwal Ketersediaan");
    cy.contains("button", "Tambah Sesi").click();
    cy.contains("Tambah Sesi");

    // cy.get('button[role="combobox"]').click();
    // cy.get('ul[role="listbox"] > li').contains("Senin").click();
    cy.get('input[type="time"][id="start_time"]').type("11:00");

    cy.get('button[type="button"]').contains("Tambah").click();
    cy.contains("Waktu selesai harus diisi");
  });

  it("KBA-006 Hanya mengisi waktu selesai ", () => {
    loginAsLecturer("andre.febrianto@if.itera.ac.id", "password.AFO");
    navigateToDashboardBimbingan();
    cy.contains("a", "Kelola Jadwal").click();
    cy.url().should("include", "/dosen/bimbingan/jadwal");
    cy.contains("Kelola Jadwal Ketersediaan");
    cy.contains("button", "Tambah Sesi").click();
    cy.contains("Tambah Sesi");

    // cy.get('button[role="combobox"]').click();
    // cy.get('ul[role="listbox"] > li').contains("Senin").click();
    cy.get('input[type="time"][id="end_time"]').type("10:00");

    cy.get('button[type="button"]').contains("Tambah").click();
    cy.contains("Waktu mulai harus diisi");
  });

  it("KBA-007 Hanya mengisi lokasi ", () => {
    loginAsLecturer("andre.febrianto@if.itera.ac.id", "password.AFO");
    navigateToDashboardBimbingan();
    cy.contains("a", "Kelola Jadwal").click();
    cy.url().should("include", "/dosen/bimbingan/jadwal");
    cy.contains("Kelola Jadwal Ketersediaan");
    cy.contains("button", "Tambah Sesi").click();
    cy.contains("Tambah Sesi");

    // cy.get('button[role="combobox"]').click();
    // cy.get('ul[role="listbox"] > li').contains("Senin").click();
    cy.get('input[type="time"][id="start_time"]').type("12:00");
    cy.get('input[type="time"][id="end_time"]').type("12:50");
    cy.get('button[type="button"]').contains("Tambah").click();
    cy.contains("Lokasi harus diisi");
  });

  it("KBA-008 Dosen mengisi waktu selesai lebih kecil dari waktu mulai", () => {
    loginAsLecturer("andre.febrianto@if.itera.ac.id", "password.AFO");
    navigateToDashboardBimbingan();
    cy.contains("a", "Kelola Jadwal").click();
    cy.url().should("include", "/dosen/bimbingan/jadwal");
    cy.contains("Kelola Jadwal Ketersediaan");
    cy.contains("button", "Tambah Sesi").click();
    cy.contains("Tambah Sesi");

    // cy.get('button[role="combobox"]').click();
    // cy.get('ul[role="listbox"] > li').contains("Senin").click();

    cy.get('input[type="time"][id="start_time"]').type("12:00");
    cy.get('input[type="time"][id="end_time"]').type("10:00");

    cy.get('input[id="location"]').type("Ruang 101");

    cy.get('button[type="button"]').contains("Tambah").click();
    cy.contains("Waktu selesai harus lebih besar dari waktu mulai");
  });
});
