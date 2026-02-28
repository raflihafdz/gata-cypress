const loginAsAdmin = (email) => {
  cy.viewport(1366, 768);
  cy.visit("http://localhost:3000/auth/login");
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type("password123");
  cy.get('button[type="submit"]').click();
  cy.contains("Selamat Datang di GATA.");
};

const navigateToTAPeriodRegistration = () => {
  cy.contains("button", "Pendaftaran TA").click();
  cy.contains("button", "Periode").should("be.visible").click();
  cy.url().should("include", "/admin/tugas-akhir/periode");
  cy.contains("Tanggal Buka");
};

describe("Null Value Test", () => {
  it("Negative - Buka periode pendaftaran tugas akhir dengan null value", () => {
    loginAsAdmin("admin@example.com");
    navigateToTAPeriodRegistration();
    cy.contains("button", "Publish").click();
    cy.contains("Tanggal mulai wajib diisi").should("be.visible");
  });
});

describe("Invalid Date Test 1", () => {
  it("Negative - Buka periode pendaftaran tugas akhir dengan tanggal mulai saja", () => {
    loginAsAdmin("admin@example.com");
    navigateToTAPeriodRegistration();
    cy.get('input[name="start_date"]').type("2025-11-02");
    cy.contains("button", "Publish").click();
    cy.contains("Tanggal selesai wajib diisi").should("be.visible");
  });
});

describe("Invalid Data Test 2", () => {
  it("Negative - Buka periode pendaftaran tugas akhir dengan tanggal akhir saja", () => {
    loginAsAdmin("admin@example.com");
    navigateToTAPeriodRegistration();
    cy.get('input[name="end_date"]').type("2025-11-02");
    cy.contains("button", "Publish").click();
    cy.contains("Tanggal mulai wajib diisi").should("be.visible");
  });
});

describe("Buka periode pendaftaran tugas akhir", () => {
  it("Positive - Buka periode pendaftaran tugas akhir", () => {
    loginAsAdmin("admin@example.com");
    navigateToTAPeriodRegistration();
    cy.get('input[name="start_date"]').type("2025-11-02");
    cy.get('input[name="end_date"]').type("2025-11-04");
    cy.get('textarea[name="description"]').type(
      "Pendaftaran tugas akhir periode November 2025"
    );
    cy.contains("button", "Publish").click();
    cy.wait(5000);
    cy.reload()
    cy.contains("Periode Pendaftaran Tugas Akhir Masih Berlangsung").should("be.visible");
  });
});
