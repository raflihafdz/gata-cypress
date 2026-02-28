const loginAsLecturer = (email) => {
  cy.viewport(1366, 768);
  cy.visit("http://localhost:3000/auth/login");
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type("password123");
  cy.get('button[type="submit"]').click();
  cy.contains("Dashboard Dosen");
};

const navigateToTAValidation = () => {
  cy.contains("button", "Tugas Akhir").click();
  cy.contains("button", "Validasi").should("be.visible").click();
  cy.url().should("include", "/dosen/validasi");
};

describe("Menambah Slot Pembimbingan pada Kuota Pembimbing 1", () => {
  it("Login sebagai dosen dan menambah slot pembimbingan", () => {
    loginAsLecturer("lecturer2@example.com");
    navigateToTAValidation();

    cy.contains("Ringkasan Kuota Pembimbing").should("be.visible");

    cy.get("span.bg-blue-100.text-blue-700")
      .invoke("text")
      .then((text) => {
        const slotAwal = parseInt(text.match(/\d+/)[0]);
        cy.log(`Slot awal: ${slotAwal}`);
        cy.contains("button", "Tambah Slot").click({ force: true });
        cy.contains("Tambah Slot Pembimbing 1").should("be.visible");
        cy.get('input[placeholder="Masukkan jumlah slot"]').type("5");
        cy.pause();
        cy.get("span.bg-blue-100.text-blue-700")
          .invoke("text")
          .then((updatedText) => {
            const slotAkhir = parseInt(updatedText.match(/\d+/)[0]);
            expect(slotAkhir).to.eq(slotAwal + 5);
          });
      });
  });
});
