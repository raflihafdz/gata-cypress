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

describe("Bimbingan - Edit Waktu ", () => {
  it("KBA-010 Dosen mengubah jadwal yang sudah dirilis ke waktu yang sudah terpakai", () => {
    loginAsLecturer("andre.febrianto@if.itera.ac.id", "password.AFO");
    navigateToDashboardBimbingan();
    cy.contains("a", "Kelola Jadwal").click();
    cy.url().should("include", "/dosen/bimbingan/jadwal");
    cy.contains("Kelola Jadwal Ketersediaan");

    cy.contains('[data-slot="card"]', "09:00 - 10:00").as("card");
    cy.get("@card").should("be.visible");
    cy.get("@card").find('button[title="Edit"]').click();

    cy.contains("Edit Sesi");
    cy.get('input[type="time"][id="start_time"]').clear().type("09:00");
    cy.get('input[type="time"][id="end_time"]').clear().type("11:00");

    cy.get('input[id="location"]').type("Ruang 101");
    
    cy.contains("button", "Simpan Perubahan").click();

  });
});

