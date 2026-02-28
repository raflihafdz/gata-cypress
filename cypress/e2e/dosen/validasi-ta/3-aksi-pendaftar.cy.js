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

const selectStatusFilter = (status) => {
  cy.get('select[name="status"]').should("be.visible").select(status);
  cy.get('select[name="status"]').should("have.value", status);
  cy.wait(1000); // beri waktu untuk filter bekerja (opsional)
};

describe("Detail mahasiswa pendaftar", () => {
  it("Positive - View detail pendaftar tugas akhir", () => {
    loginAsLecturer("lecturer1@example.com");
    navigateToTAValidation();

    // Klik tombol detail berdasarkan icon SVG
    cy.get("button")
      .filter(":has(svg.lucide-circle-dot)")
      .first()
      .should("be.visible")
      .click();

    // Verifikasi tampilan detail muncul
    cy.contains("Detail Bimbingan Mahasiswa", { timeout: 10000 }).should(
      "be.visible"
    );
  });
});

describe("Setujui mahasiswa pendaftar", () => {
  it("Positive - View detail pendaftar tugas akhir", () => {
    loginAsLecturer("lecturer1@example.com");
    navigateToTAValidation();

    // Klik tombol detail berdasarkan icon SVG
    cy.get("button")
      .filter(":has(svg.lucide-circle-dot)")
      .first()
      .should("be.visible")
      .click();

    // Verifikasi tampilan detail muncul
    cy.contains("Detail Bimbingan Mahasiswa", { timeout: 10000 }).should(
      "be.visible"
    );

    cy.get("button", "Setujui").click();
    cy.contains("Apakah Anda yakin ingin melanjutkan ?");
    cy.get("button", "Ya");

    selectStatusFilter("Disetujui");
    cy.contains("Disetujui");
  });
});

describe("Tolak mahasiswa pendaftar", () => {
  it("Positive - Tolak pendaftar tugas akhir", () => {
    loginAsLecturer("lecturer1@example.com");
    navigateToTAValidation();

    // Klik tombol detail berdasarkan icon SVG
    cy.get("button")
      .filter(":has(svg.lucide-circle-dot)")
      .first()
      .should("be.visible")
      .click();

    // Verifikasi tampilan detail muncul
    cy.contains("Detail Bimbingan Mahasiswa", { timeout: 10000 }).should(
      "be.visible"
    );

    cy.get("button", "Tolak").click();
    cy.contains("Apakah Anda yakin ingin melanjutkan ?");
    cy.get("button", "Ya");

    selectStatusFilter("Tolak");
    cy.contains("Tolak");
  });
});
