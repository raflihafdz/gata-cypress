const loginAsAdmin = (email) => {
  cy.viewport(1366, 768);
  cy.visit("http://localhost:3000/auth/login");
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type("password123");
  cy.get('button[type="submit"]').click();
  cy.contains("Selamat Datang di GATA.");
};

const navigateToPengajuan = () => {
  cy.contains("button", "Pendaftaran TA").click();
  cy.contains("button", "Pengajuan").should("be.visible").click();
  cy.url().should("include", "/admin/tugas-akhir/pengajuan");
  cy.contains("Daftar Pendaftar Tugas Akhir");
};

describe("View daftar pendaftar tugas akhir", () => {
  it("Positive - View daftar pendaftar tugas akhir", () => {
    loginAsAdmin("admin@example.com");
    navigateToPengajuan();
  });
});

describe("Detail pendaftar tugas akhir", () => {
  it("Positive - View detail pendaftar tugas akhir", () => {
    loginAsAdmin("admin@example.com");
    navigateToPengajuan();

    cy.get('tbody tr').first().click();
    cy.contains("Detail Pengajuan");
  });
});

