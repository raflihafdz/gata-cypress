const loginAsStudent = (email) => {
  cy.viewport(1366, 768);
  cy.visit("http://localhost:3000/auth/login");
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type("password123");
  cy.get('button[type="submit"]').click();
  cy.contains("Progress Bimbingan"); // indikasi login berhasil
};

const openPendaftaranTA = () => {
  cy.contains("button", "Pendaftaran TA").click();
  cy.contains("button", "Daftar").should("be.visible").click();
  cy.url().should("include", "/mahasiswa/tugas-akhir/daftar");
  cy.contains("PENGAJUAN TUGAS AKHIR");
};

let totalAnggota = 0;

const selectTipeTA = (type = "capstone", anggota = "2") => {
  cy.get('select[name="type"]').select(type).should("have.value", type);

  if (type === "capstone") {
    cy.get('select[name="jumlahAnggota"]').should("not.be.disabled");
    cy.get('select[name="jumlahAnggota"]').select(anggota);
    totalAnggota = parseInt(anggota); // simpan total anggota
  } else {
    cy.get('select[name="jumlahAnggota"]').should("be.disabled");
    totalAnggota = 1;
  }
};

const isiDataUmum = () => {
  cy.get('select[name="status"]').select("baru");
  cy.get('select[name="supervisor1Id"]').select("Lecturer 01");
  cy.get('select[name="supervisor2Id"]').select("Lecturer 02");
  cy.get('select[name="source_topic"]').select("dosen");
  cy.contains("button", "Selanjutnya").click();
};

// Helper tunggu redirect
const tungguRedirect = (url) => {
  cy.url({ timeout: 15000 }).should("include", url);
};

const isiDataAnggota = (index, email, judul, resume, filePath) => {
  cy.contains("PENGAJUAN TUGAS AKHIR").scrollIntoView().should("exist");
  cy.log(`Mengisi data anggota ${index}: ${email}`);

  cy.get('input[name="email"]').clear().type(email);
  cy.get('[role="option"]').contains(email).click();

  if (judul) {
    cy.get('textarea[name="title"]')
      .clear()
      .type(judul)
      .should("have.value", judul);
  } else {
    cy.get('textarea[name="title"]').focus().blur(); 
  }

  cy.get('textarea[name="resume"]').clear().type(resume);
  cy.get('input[type="file"]').attachFile(filePath);

  cy.intercept("POST", "**/tugas-akhir/**").as("submitTA");

  if (index < totalAnggota) {
    cy.contains("button", "Selanjutnya")
      .scrollIntoView()
      .click({ force: true });
  } else {
    cy.get('button[type="submit"]').click();

    // Tunggu submit selesai dan redirect muncul
    cy.wait("@submitTA", { timeout: 10000 })
      .its("response.statusCode")
      .should("eq", 201);
    tungguRedirect("/mahasiswa/tugas-akhir/riwayat");
  }

  cy.wait(1200);
};

describe("Pendaftaran Capstone", () => {
  const filePath1 = "DAFTAR HADIR SEMPRO.pdf";
  const filePath2 = "DISPENSASI.pdf";
  const filePath3 = "DISPENSASI.pdf";

  const resume1 = "Resume anggota 1 untuk pengujian data unik.";
  const resume2 = "Resume anggota 2 yang berbeda konten.";
  const resume3 = "Resume anggota 3 dengan isi tersendiri.";

  beforeEach(() => {
    loginAsStudent("student13@example.com");
    openPendaftaranTA();
  });

  it("Positive - Data berbeda muncul sesuai di riwayat masing-masing akun", () => {
    selectTipeTA("capstone", "3");
    isiDataUmum();

    isiDataAnggota(
      1,
      "student13@example.com",
      "Judul TA A1",
      resume1,
      filePath1
    );
    isiDataAnggota(
      2,
      "student14@example.com",
      "Judul TA A2",
      resume2,
      filePath2
    );
    isiDataAnggota(
      3,
      "student15@example.com",
      "Judul TA A3",
      resume3,
      filePath3
    );

    // ✅ Verifikasi halaman riwayat muncul
    cy.contains("Judul TA A1", { timeout: 10000 }).should("exist");

    const anggota = [
      { email: "student14@example.com", judul: "Judul TA A2", resume: resume2 },
      { email: "student15@example.com", judul: "Judul TA A3", resume: resume3 },
    ];

  });
});
