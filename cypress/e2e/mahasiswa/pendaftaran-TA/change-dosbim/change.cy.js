const loginAsStudent = (email) => {
  cy.viewport(1366, 768);
  cy.visit("http://localhost:3000/auth/login");
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type("password123");
  cy.get('button[type="submit"]').click();
  cy.contains("Progress Bimbingan");
};

const openRiwayatTA = () => {
  cy.contains("button", "Pendaftaran TA").click();
  cy.contains("button", "Riwayat").should("be.visible").click();
  cy.url().should("include", "/mahasiswa/tugas-akhir/riwayat");
};

describe("Cek Halaman Riwayat TA Saat Pendaftaran Ditolak", () => {
  it("Login", () => {
    loginAsStudent("student1@example.com");
    openRiwayatTA();
    cy.contains("Status Pendaftaran: Ditolak");
  });

  cy.containst("button", "Ganti Pembimbing").click();
  cy.contains("Ganti Pembimbing");
  cy.get("select").should("be.visible").and("not.be.disabled");
  cy.get("select").select("6");
  cy.get("select").should("have.value", "6");

  cy.contains("button","Simpan").click();
  cy.url().should("include", "/mahasiswa/tugas-akhir/riwayat");
  cy.contains('Status Pendaftaran: Menunggu Persetujuan');
});
