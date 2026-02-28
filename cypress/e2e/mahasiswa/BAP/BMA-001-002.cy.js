// Helper function untuk login sebagai mahasiswa
const loginAsStudent = (email, password) => {
  cy.viewport(1366, 768);
  cy.visit("https://gata.web.id/auth/login");
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.contains("Progress Bimbingan");
};

// Helper function untuk navigasi ke halaman Hasil Sidang
const navigateToHasilSidang = () => {
  cy.contains("button", "Hasil Sidang").click();
  cy.url().should("include", "/mahasiswa/hasil-sidang");
  cy.contains("Informasi Mahasiswa");
};

describe("Mahasiswa - Hasil Sidang dan BAP", () => {
  beforeEach(() => {
    // Login sebelum setiap test
    loginAsStudent("student6@example.com", "password123");
    navigateToHasilSidang();
  });

  // Test Case 1: Mahasiswa melihat notulen/komentar yang diberikan oleh dosen pembimbing dan penguji
  it("BMA-001 Mahasiswa melihat notulen yang diberikan oleh dosen pembimbing dan penguji", () => {
    // Tunggu data loading selesai
    cy.wait(2000);

    // Verifikasi bagian Komentar Dosen ada
    cy.contains("Komentar Dosen");

    // Verifikasi ada tombol kode dosen (contoh: PENG1, PENG2, PEMB1, dll)
    // Klik tombol kode dosen pertama yang muncul
    cy.get("button").contains(/PENG|PEMB/).first().click();

    cy.wait(500);

    // Verifikasi komentar ditampilkan
    // Cek apakah ada teks "KOMENTAR" di dalam box yang muncul
    cy.contains("KOMENTAR");

    // Klik tombol kode dosen lainnya jika ada
    cy.get("button")
      .contains(/PENG|PEMB/)
      .eq(1)
      .then(($btn) => {
        if ($btn.length > 0) {
          cy.wrap($btn).click();
          cy.wait(500);
          cy.contains("KOMENTAR");
        }
      });
  });

  // Test Case 2: Mahasiswa mengunduh BAP yang sudah difinalisasi oleh pembimbing 1
  it("BMA-002 Mahasiswa mengunduh BAP yang sudah difinalisasi", () => {
    // Tunggu data loading selesai
    cy.wait(2000);

    // Scroll ke bagian bawah untuk melihat tombol Download PDF
    cy.scrollTo("bottom");

    // Verifikasi teks unduhan BAP
    cy.contains("Unduh BAP kamu yang sudah tertanda tangan disini");

    // Stub window.open untuk mencegah pembukaan tab baru saat test
    cy.window().then((win) => {
      cy.stub(win, "open").as("windowOpen");
    });

    // Klik tombol Download PDF
    cy.contains("button", "Download PDF").click();

    // Verifikasi window.open dipanggil (BAP dibuka di tab baru)
    cy.get("@windowOpen").should("be.called");
  });
});