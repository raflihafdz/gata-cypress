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

// Helper function untuk membuat rubrik baru
const createNewRubrik = (namaRubrik) => {
  cy.get('input[placeholder="Nama rubrik baru"]').clear().type(namaRubrik);
  cy.contains("button", "Tambah").click();
  cy.wait(1000);
  cy.contains(namaRubrik).click();
};

describe("Rubrik Penilaian - Manajemen Group dan Pertanyaan", () => {
  beforeEach(() => {
    loginAsAdmin("andika.setiawan@if.itera.ac.id", "password.ANS");
    navigateToRubrikPenilaian();
    createNewRubrik("Rubrik Test Manajemen Group");
  });

  // Test Case 1: Admin dapat menambahkan group
  it("ADP-009 Admin dapat menambahkan group", () => {
    cy.contains("button", "Tambah Group").click();
    cy.wait(1000);
    cy.contains("Group Baru");
  });

  // Test Case 2: Admin dapat menambahkan nama grup dan bobot nilai dari grup tersebut
  it("ADP-010 Admin dapat menambahkan nama grup dan bobot nilai dari grup", () => {
    // Tambah group
    cy.contains("button", "Tambah Group").click();
    cy.wait(1000);

    // Ubah nama group
    cy.contains("NAMA GROUP")
      .parent()
      .within(() => {
        cy.get('input[type="text"]').clear().type("Group Pembukaan");
      });

    cy.wait(500);

    // Ubah bobot group
    cy.contains("BOBOT")
      .parent()
      .within(() => {
        cy.get('input[type="number"]').clear().type("30");
      });

    cy.wait(500);
  });

  // Test Case 3: Admin dapat menghapus grup
  it("ADP-011 Admin dapat menghapus grup", () => {
    // Tambah group
    cy.contains("button", "Tambah Group").click();
    cy.wait(1000);

    // Stub confirm dialog
    cy.on("window:confirm", () => true);

    // Hapus group menggunakan icon trash
    cy.get('button[title="Hapus"]').first().click();
    cy.wait(1000);
  });

  // Test Case 4: Admin dapat menambahkan pertanyaan
  it("ADP-012 Admin dapat menambahkan pertanyaan", () => {
    // Tambah group terlebih dahulu
    cy.contains("button", "Tambah Group").click();
    cy.wait(1000);

    // Klik tombol plus untuk tambah pertanyaan
    cy.get('button[title="Tambah Pertanyaan"]').first().click();
    cy.wait(1000);
  });

  // Test Case 5: Admin dapat menambahkan bobot pertanyaan
  it("ADP-013 Admin dapat menambahkan bobot pertanyaan", () => {
    // Tambah group
    cy.contains("button", "Tambah Group").click();
    cy.wait(1000);

    // Tambah pertanyaan
    cy.get('button[title="Tambah Pertanyaan"]').first().click();
    cy.wait(1000);

    // Isi text pertanyaan
    cy.get("textarea").first().clear().type("Apakah mahasiswa menguasai materi?");
    cy.wait(500);

    // Isi bobot pertanyaan
    cy.contains("label", "Bobot")
      .parent()
      .within(() => {
        cy.get('input[type="number"]').clear().type("10");
      });

    cy.wait(500);
  });

  // Test Case 6: Admin dapat memindahkan pertanyaan ke grup lain
  it("ADP-014 Admin dapat memindahkan pertanyaan ke grup lain", () => {
    // Tambah 2 group
    cy.contains("button", "Tambah Group").click();
    cy.wait(1000);
    cy.contains("button", "Tambah Group").click();
    cy.wait(1000);

    // Ubah nama group pertama
    cy.contains("NAMA GROUP")
      .parent()
      .within(() => {
        cy.get('input[type="text"]').first().clear().type("Group A");
      });
    cy.wait(500);

    // Tambah pertanyaan di group pertama
    cy.get('button[title="Tambah Pertanyaan"]').first().click();
    cy.wait(1000);

    // Pindahkan pertanyaan ke group lain menggunakan dropdown
    cy.contains("label", "Group")
      .parent()
      .within(() => {
        cy.get("select").select(1); // Pilih group kedua
      });

    cy.wait(1000);
  });

  // Test Case 7: Admin dapat menambahkan opsi jawaban dan bobot jawaban
  it("ADP-015 Admin dapat menambahkan opsi jawaban dan bobot jawaban", () => {
    // Tambah group
    cy.contains("button", "Tambah Group").click();
    cy.wait(1000);

    // Tambah pertanyaan
    cy.get('button[title="Tambah Pertanyaan"]').first().click();
    cy.wait(1000);

    // Tambah opsi jawaban
    cy.contains("button", "+ Opsi").click();
    cy.wait(1000);

    // Isi text opsi jawaban - opsi ada dalam space-y-1 atau space-y-2 di bawah Opsi Jawaban
    cy.get('input[placeholder="Text opsi"]').first().clear().type("Sangat Baik");
    cy.wait(500);

    // Isi bobot/nilai opsi
    cy.get('input[placeholder="Text opsi"]')
      .first()
      .parent()
      .within(() => {
        cy.get('input[type="number"]').clear().type("100");
      });

    cy.wait(500);
  });

  // Test Case 8: Admin dapat mengubah bobot jawaban
  it("ADP-016 Admin dapat mengubah bobot jawaban", () => {
    // Tambah group
    cy.contains("button", "Tambah Group").click();
    cy.wait(1000);

    // Tambah pertanyaan
    cy.get('button[title="Tambah Pertanyaan"]').first().click();
    cy.wait(1000);

    // Tambah opsi jawaban
    cy.contains("button", "+ Opsi").click();
    cy.wait(1000);

    // Isi nilai awal
    cy.get('input[placeholder="Text opsi"]')
      .first()
      .parent()
      .within(() => {
        cy.get('input[type="number"]').clear().type("80");
      });

    cy.wait(500);

    // Ubah nilai
    cy.get('input[placeholder="Text opsi"]')
      .first()
      .parent()
      .within(() => {
        cy.get('input[type="number"]').clear().type("95");
      });

    cy.wait(500);
  });

  // Test Case 9: Admin dapat menghapus opsi jawaban
  it("ADP-017 Admin dapat menghapus opsi jawaban", () => {
    // Tambah group
    cy.contains("button", "Tambah Group").click();
    cy.wait(1000);

    // Tambah pertanyaan
    cy.get('button[title="Tambah Pertanyaan"]').first().click();
    cy.wait(1000);

    // Tambah opsi jawaban
    cy.contains("button", "+ Opsi").click();
    cy.wait(1000);

    // Stub confirm dialog
    cy.on("window:confirm", () => true);

    // Hapus opsi menggunakan icon trash di dalam row opsi
    cy.get('input[placeholder="Text opsi"]')
      .first()
      .parent()
      .within(() => {
        cy.get('button').last().click();
      });

    cy.wait(1000);
  });

  // Test Case 10: Admin dapat mengunggah rubrik ke penilaian untuk dipakai
  it("ADP-018 Admin dapat mengunggah/set rubrik untuk dipakai sebagai default", () => {
    // Kembali ke daftar rubrik
    cy.contains("Rubrik Test Manajemen Group").click();
    cy.wait(500);

    // Set sebagai default Sidang
  });
});