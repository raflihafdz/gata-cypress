const loginAsStudent = (email) => {
  cy.viewport(1366, 768);
  cy.visit("http://localhost:3000/auth/login");
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type("password123");
  cy.get('button[type="submit"]').click();
  cy.contains("Progress Bimbingan");
};

// Fungsi reusable untuk buka halaman pendaftaran
const openPendaftaranTA = () => {
  cy.contains("button", "Pendaftaran TA").click();
  cy.contains("button", "Daftar").should("be.visible").click();
  cy.url().should("include", "/mahasiswa/tugas-akhir/daftar");
  cy.contains("PENGAJUAN TUGAS AKHIR");
};

// Fungsi reusable untuk validasi tipe TA reguler
const selectTipeTA = (type) => {
  cy.get('select[name="type"]').select(type).should("have.value", type);
  if (type === "regular") {
    cy.get('select[name="jumlahAnggota"]')
      .should("have.value", "1")
      .and("be.disabled");
  }
};

// Fungsi reusable untuk menunggu redirect setelah submit
const tungguRedirect = (url) => {
  cy.url({ timeout: 10000 }).should("include", url);
};

// === POSITIVE CASE ===
describe("Positive - Filled Form Pengajuan Tugas Akhir Dispensasi", () => {
  it("Fill Form", () => {
    loginAsStudent("student10@example.com");
    openPendaftaranTA();

    const type = "regular";
    selectTipeTA(type);

    cy.get('select[name="status"]').select("dispensasi").should("have.value", "dispensasi");
    cy.get('select[name="supervisor1Id"]')
      .select("Lecturer 01")
      .should("have.value", "1");
    cy.get('select[name="source_topic"]').select("dosen").should("have.value", "dosen");

    cy.contains("button", "Selanjutnya").click();
    cy.contains("Judul Tugas Akhir");

    cy.get('input[name="email"]').type("student10@example.com");
    cy.get('[role="option"]').contains("student10@example.com").click();

    cy.get('textarea[name="title"]')
      .type("Judul Tugas Akhir Example")
      .should("have.value", "Judul Tugas Akhir Example");

    cy.get('textarea[name="resume"]').type(
      "Ini resumeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee student 10"
    );

    const filePathSempro = "DAFTAR HADIR SEMPRO.pdf";
    cy.get('input[type="file"]').attachFile(filePathSempro);

    const filePathDispen = "DAFTAR HADIR SEMPRO.pdf";
    cy.get('input[name="dispen_path"]').attachFile(filePathDispen);

    cy.get('button[type="submit"]').click();

    // Tunggu submit selesai dan redirect muncul
    cy.wait("@submitTA", { timeout: 10000 })
      .its("response.statusCode")
      .should("eq", 201);

    tungguRedirect("/mahasiswa/tugas-akhir/riwayat");
  });
});

// === NEGATIVE CASE ===
// describe("Negative - Filled Form Pengajuan Tugas Akhir Without Upload File Dispen", () => {
//   it("Fill Form", () => {
//     loginAsStudent("student11@example.com");
//     openPendaftaranTA();

//     const type = "regular";
//     selectTipeTA(type);

//     cy.get('select[name="status"]').select("baru").should("have.value", "baru");
//     cy.get('select[name="supervisor1Id"]')
//       .select("Lecturer 01")
//       .should("have.value", "1");
//     cy.get('select[name="source_topic"]').select("dosen").should("have.value", "dosen");

//     cy.contains("button", "Selanjutnya").click();
//     cy.contains("Judul Tugas Akhir");

//     cy.get('input[name="email"]').type("student11@example.com");
//     cy.get('[role="option"]').contains("student11@example.com").click();

//     cy.get('textarea[name="title"]')
//       .type("Judul Tugas Akhir Example")
//       .should("have.value", "Judul Tugas Akhir Example");

//     cy.get('textarea[name="resume"]').type(
//       "Ini resumeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee student 11"
//     );

//     const filePathSempro = "DAFTAR HADIR SEMPRO.pdf";
//     cy.get('input[type="file"]').attachFile(filePathSempro);

//     // Tidak upload file dispen → klik submit langsung
//     cy.intercept("POST", "/api/tugas-akhir/pendaftaran").as("submitTA");
//     cy.get('button[type="submit"]').click();

//     // Validasi error muncul
//     cy.contains("File dispensasi wajib diunggah").should("be.visible");
//   });
// });
