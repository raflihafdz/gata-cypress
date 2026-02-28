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


describe ("Bimbingan - Dashboard, Topik Yang Diajukan", () => {
  it("KBA-013-016 Dosen melihat topik, mahasiswa yang mengajukan, akses link draft", () => {
    loginAsLecturer("aidil.afriansyah@if.itera.ac.id", "password.AAF");
    navigateToDashboardBimbingan();

    //topik yang diajukan,mahasiswa yang mengajukan
    cy.contains('[data-slot="card"]', "asdasdas","student 01").as("card");
    cy.get("@card").should("be.visible");
    //akses link draft
    cy.contains("a", "zscasdawdawsd").click();

    // cy.get("@card").click();
    // cy.contains("Aksi Sesi Bimbingan");
  });

});
