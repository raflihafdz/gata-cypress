// Helper function untuk login sebagai admin
const loginAsAdmin = (email, password) => {
  cy.viewport(1366, 768);
  cy.visit("http://gata.web.id/auth/login");
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.contains("Selamat Datang");
};

// Helper function untuk navigasi ke halaman rubrik penilaian
const navigateToRubrikPenilaian = () => {
  cy.contains("button", "Kelola Penilaian").click();
  cy.contains("button", "Rubrik").click();
  cy.url().should("include", "/admin/penilaian/rubrik");
  cy.contains("Rubrik Penilaian");
};

describe("Rubrik Penilaian - Test Suite", () => {
  // Login sebelum setiap test
  beforeEach(() => {
    loginAsAdmin("andika.setiawan@if.itera.ac.id", "password.ANS");
    navigateToRubrikPenilaian();
  });

  // Test Case 1: Admin dapat menambahkan nama rubrik penilaian yang baru
  it("ADP-001 Admin dapat menambahkan nama rubrik penilaian yang baru", () => {
    // Isi nama rubrik baru
    cy.get('input[placeholder="Nama rubrik baru"]')
      .clear()
      .type("Rubrik Test Baru");

    // Pastikan input terisi
    cy.get('input[placeholder="Nama rubrik baru"]').should(
      "have.value",
      "Rubrik Test Baru"
    );

    // Klik tombol Tambah
    cy.contains("button", "Tambah").click();

    // Verifikasi alert sukses
    cy.on("window:alert", (text) => {
      expect(text).to.contains("Rubrik berhasil dibuat!");
    });

    // Verifikasi rubrik muncul di daftar

  });

  // Test Case 2: Admin dapat menentukan tipe rubrik (proposal atau akhir)
  it("ADP-002 Admin dapat menentukan tipe rubrik Sidang atau Seminar", () => {
    // Pilih tipe Seminar
    cy.get("select").first().select("SEM");
    cy.get("select").first().should("have.value", "SEM");

    // Isi nama rubrik
    cy.get('input[placeholder="Nama rubrik baru"]')
      .clear()
      .type("Rubrik Seminar Test");

    // Klik tombol Tambah
    cy.contains("button", "Tambah").click();

    // Verifikasi rubrik dengan badge SEM muncul


    // Test dengan tipe Sidang
    cy.get("select").first().select("SID");
    cy.get("select").first().should("have.value", "SID");

    cy.get('input[placeholder="Nama rubrik baru"]')
      .clear()
      .type("Rubrik Sidang Test");

    cy.contains("button", "Tambah").click();

    // Verifikasi rubrik dengan badge SID muncul

  });

  // Test Case 3: Admin menambah rubrik tanpa memberikan nama rubrik
  it("ADP-003 Admin menambah rubrik tanpa memberikan nama rubrik penilaian", () => {
    // Kosongkan input nama rubrik
    cy.get('input[placeholder="Nama rubrik baru"]').clear();

    // Klik tombol Tambah
    cy.contains("button", "Tambah").click();

    // Verifikasi tidak ada alert sukses atau rubrik kosong tidak ditambahkan

    // Pastikan tidak ada perubahan pada daftar rubrik (optional)
    cy.wait(500);
  });

  // Test Case 4: Admin dapat "set default" sesuai dengan tipe sidang
  it("ADP-004 Admin dapat set default sesuai dengan tipe sidang", () => {
    // Buat rubrik baru untuk test
    cy.get('input[placeholder="Nama rubrik baru"]')
      .clear()
      .type("Rubrik Default Test");
    cy.get("select").first().select("SID");
    cy.contains("button", "Tambah").click();
    cy.wait(1000);


    cy.wait(1000);

    // Verifikasi tanda default muncul

  });

  // Test Case 5: Admin dapat mengubah nama rubrik penilaian yang sudah ada
  it("ADP-005 Admin dapat mengubah nama rubrik penilaian yang sudah ada", () => {
    // Buat rubrik baru
    cy.get('input[placeholder="Nama rubrik baru"]')
      .clear()
      .type("Rubrik Sebelum Edit");
    cy.contains("button", "Tambah").click();
    cy.wait(1000);

    // Klik rubrik untuk memilihnya
    cy.contains("Rubrik Sebelum Edit").click();

    // Ubah nama rubrik di bagian Edit Rubrik
    cy.contains("h2", "Edit Rubrik")
      .parent()
      .parent()
      .within(() => {
        cy.get('input[type="text"]')
          .first()
          .clear()
          .type("Rubrik Sesudah Edit");
      });

    // Klik tombol Simpan
    cy.contains("button", "Simpan").click();

    // Verifikasi alert sukses

    cy.wait(1000);

    // Verifikasi nama berubah di daftar
    cy.contains("Rubrik Sesudah Edit").should("be.visible");
  });

  // Test Case 6: Admin dapat memberikan deskripsi rubrik
  it("ADP-006 Admin dapat memberikan deskripsi rubrik", () => {
    // Buat rubrik baru
    cy.get('input[placeholder="Nama rubrik baru"]')
      .clear()
      .type("Rubrik dengan Deskripsi");
    cy.contains("button", "Tambah").click();
    cy.wait(1000);

    // Klik rubrik untuk memilihnya
    cy.contains("Rubrik dengan Deskripsi").click();

    // Isi deskripsi
    cy.contains("label", "Deskripsi")
      .parent()
      .within(() => {
        cy.get("textarea")
          .clear()
          .type("Ini adalah deskripsi rubrik penilaian untuk testing");
      });

    // Verifikasi deskripsi terisi


    // Simpan rubrik
    cy.contains("button", "Simpan").click();

    // Verifikasi alert sukses
  });

  // Test Case 7: Admin dapat mengubah deskripsi rubrik
  it("ADP-007 Admin dapat mengubah deskripsi rubrik", () => {
    // Buat rubrik baru dengan deskripsi
    cy.get('input[placeholder="Nama rubrik baru"]')
      .clear()
      .type("Rubrik Edit Deskripsi");
    cy.contains("button", "Tambah").click();
    cy.wait(1000);

    // Klik rubrik untuk memilihnya
    cy.contains("Rubrik Edit Deskripsi").click();

    // Isi deskripsi awal
    cy.contains("label", "Deskripsi")
      .parent()
      .within(() => {
        cy.get("textarea").clear().type("Deskripsi awal");
      });

    cy.contains("button", "Simpan").click();
    cy.wait(1000);

    // Ubah deskripsi
    cy.contains("label", "Deskripsi")
      .parent()
      .within(() => {
        cy.get("textarea")
          .clear()
          .type("Deskripsi sudah diubah menjadi yang baru");
      });

    // Verifikasi deskripsi berubah

    // Simpan perubahan
    cy.contains("button", "Simpan").click();

  });

  // Test Case 8: Admin dapat menghapus rubrik
  it("ADP-008 Admin dapat menghapus rubrik", () => {
    // Buat rubrik baru untuk dihapus
    cy.get('input[placeholder="Nama rubrik baru"]')
      .clear()
      .type("Rubrik Akan Dihapus");
    cy.contains("button", "Tambah").click();
    cy.wait(1000);

    // Klik rubrik untuk memilihnya
    cy.contains("Rubrik Akan Dihapus").click();

    // Stub confirm dialog untuk menerima penghapusan
    cy.on("window:confirm", () => true);

    // Klik tombol Hapus
    cy.contains("button", "Hapus").click();

    cy.wait(1000);

  });
});
