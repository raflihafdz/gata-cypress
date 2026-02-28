const loginAsStudent = (email) => {
  cy.viewport(1366, 768);
  cy.visit("http://localhost:3000/auth/login");
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type("password123");
  cy.get('button[type="submit"]').click();
  cy.contains("Progress Bimbingan");
};

const openPendaftaranTA = () => {
  cy.contains("button", "Pendaftaran TA").click();
  cy.contains("button", "Daftar").should("be.visible").click();
  cy.url().should("include", "/mahasiswa/tugas-akhir/daftar");
  cy.contains("PENGAJUAN TUGAS AKHIR");
};

const selectTipeTA = (type = "capstone", anggota = "2") => {
  cy.get('select[name="type"]').select(type).should("have.value", type);

  if (type === "capstone") {
    cy.get('select[name="jumlahAnggota"]').should("not.be.disabled");
    cy.get('select[name="jumlahAnggota"]').select(anggota);
  } else {
    cy.get('select[name="jumlahAnggota"]').should("be.disabled");
  }
};

const isiDataUmum = () => {
  cy.get('select[name="status"]').select("dispensasi");
  cy.get('select[name="supervisor1Id"]').select("Lecturer 01");
  cy.get('select[name="supervisor2Id"]').select("Lecturer 02");
  cy.get('select[name="source_topic"]').select("dosen");
  cy.contains("button", "Selanjutnya").click();
};

const isiDataAnggota = (index, email, judul, resume, filePath) => {
  cy.contains(`Anggota ${index}`);
  cy.get('input[name="email"]').type(email);
  cy.get('[role="option"]').contains(email).click();
  cy.get('textarea[name="title"]').type(judul).should("have.value", judul);
  cy.get('textarea[name="resume"]').type(resume);
  cy.get('input[type="file"]').attachFile(filePath);
  cy.contains("button", "Selanjutnya").click();
  cy.wait(1500);
};

describe("Pengajuan Capstone Dispensasi", () => {
  const filePath1 = "DAFTAR HADIR SEMPRO.pdf";
  const filePath2 = "SURAT PERSETUJUAN.pdf";
  const filePath3 = "ABSENSI RAPAT.pdf";
  const filePath4 = "DISPENSASI.pdf";


  const resume1 = "Resume untuk anggota 1 yang berbeda.";
  const resume2 = "Resume anggota 2 dengan isi berbeda.";
  const resume3 = "Resume anggota 3 yang juga unik.";

  beforeEach(() => {
    loginAsStudent("student5@example.com");
    openPendaftaranTA();
  });

  it("Negative - Miss on Judul", () => {
    selectTipeTA("capstone", "2");
    isiDataUmum();

    // Anggota 1 - tanpa judul
    isiDataAnggota(1, "student5@example.com", "", resume1, filePath1, filePath4);
    cy.contains("Judul tidak boleh kosong").should("be.visible");
  });

  it("Positive - With 2 Members", () => {
    selectTipeTA("capstone", "2");
    isiDataUmum();

    isiDataAnggota(1, "student5@example.com", "Judul TA Anggota 1", resume1, filePath1, filePath4);
    isiDataAnggota(2, "student6@example.com", "Judul TA Anggota 2", resume2, filePath2, filePath4);
    cy.contains("button", "Daftar").click();

    cy.url().should("include", "/mahasiswa/tugas-akhir/riwayat");
    cy.contains("Resume Kebaharuan");
  });

  it("Positive - With 3 Members", () => {
    selectTipeTA("capstone", "3");
    isiDataUmum();

    isiDataAnggota(1, "student5@example.com", "Judul TA Anggota 1", resume1, filePath1, filePath4);
    isiDataAnggota(2, "student6@example.com", "Judul TA Anggota 2", resume2, filePath2, filePath4);
    isiDataAnggota(3, "student7@example.com", "Judul TA Anggota 3", resume3, filePath3, filePath4);
    cy.contains("button", "Daftar").click();

    cy.url().should("include", "/mahasiswa/tugas-akhir/riwayat");
    cy.contains("Resume Kebaharuan");
  });

  it("Positive - Data berbeda muncul sesuai di riwayat masing-masing akun", () => {
    // Step 1: Student 5 mengajukan capstone dengan 3 anggota
    selectTipeTA("capstone", "3");
    isiDataUmum();

    isiDataAnggota(1, "student5@example.com", "Judul TA A1", resume1, filePath1, filePath4);
    isiDataAnggota(2, "student6@example.com", "Judul TA A2", resume2, filePath2, filePath4);
    isiDataAnggota(3, "student7@example.com", "Judul TA A3", resume3, filePath3, filePath4);
    cy.contains("button", "Daftar").click();

    cy.url().should("include", "/mahasiswa/tugas-akhir/riwayat");
    cy.contains("Judul TA A1");

    // Step 2: Verifikasi di akun anggota lain
    const anggota = [
      { email: "student6@example.com", judul: "Judul TA A2", resume: resume2 },
      { email: "student7@example.com", judul: "Judul TA A3", resume: resume3 },
    ];

    anggota.forEach((a) => {
      cy.visit("http://localhost:3000/auth/logout");
      loginAsStudent(a.email);
      cy.contains("button", "Pendaftaran TA").should("exist");
      cy.contains("Riwayat Pendaftaran").click();
      cy.contains(a.judul).should("exist");
      cy.contains(a.resume.split(" ")[0]).should("exist"); // cek potongan teks resume
    });
  });
});