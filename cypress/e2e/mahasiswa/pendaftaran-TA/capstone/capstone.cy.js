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
    cy.get('textarea[name="title"]').focus().blur(); // trigger validasi
  }

  cy.get('textarea[name="resume"]').clear().type(resume);
  cy.get('input[type="file"]').attachFile(filePath);

  // ⏩ Klik tombol sesuai urutan
  if (index < totalAnggota) {
    cy.contains("button", "Selanjutnya")
      .scrollIntoView()
      .click({ force: true });
  } else {
    cy.contains("button", "Daftar").scrollIntoView().click({ force: true });
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
    loginAsStudent("student5@example.com");
    openPendaftaranTA();
  });

  it("Negative - Tidak mengisi Judul TA", () => {
    selectTipeTA("capstone", "2");
    isiDataUmum();

    isiDataAnggota(1, "student5@example.com", "", resume1, filePath1);
    cy.contains("Judul wajib diisi").should("be.visible");
  });

});
