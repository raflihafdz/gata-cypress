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

// -------------------------POSITIVE CASES ------------------------------
describe("Positive - Filled Form Pengajuan Tugas Akhir Only Choose Dosen Pembimbing 1", () => {
  it("Fill Form", () => {
    loginAsStudent("student6@example.com");
    openPendaftaranTA();

    const type = "regular";
    selectTipeTA(type);

    cy.get('select[name="status"]').select("baru").should("have.value", "baru");
    cy.get('select[name="supervisor1Id"]')
      .select("Lecturer 01")
      .should("have.value", "1");
    cy.get('select[name="source_topic"]')
      .select("dosen")
      .should("have.value", "dosen");

    cy.contains("button", "Selanjutnya").click();
    cy.contains("Judul Tugas Akhir");

    cy.get('input[name="email"]').type("student6@example.com");
    cy.get('[role="option"]').contains("student6@example.com").click();

    cy.get('textarea[name="title"]')
      .type("Judul Tugas Akhir Example")
      .should("have.value", "Judul Tugas Akhir Example");

    cy.get('textarea[name="resume"]').type(
      "Ini resumeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee student 6"
    );

    const filePath = "DAFTAR HADIR SEMPRO.pdf";
    cy.get('input[type="file"]').attachFile(filePath);
  });
});

describe("Positive - Filled Form Pengajuan Tugas Akhir Topic From Perusahaan", () => {
  it("Fill Form", () => {
    loginAsStudent("student6@example.com");
    openPendaftaranTA();

    const type = "regular";
    selectTipeTA(type);

    cy.get('select[name="status"]').select("baru").should("have.value", "baru");
    cy.get('select[name="supervisor1Id"]')
      .select("Lecturer 01")
      .should("have.value", "1");
    cy.get('select[name="source_topic"]')
      .select("perusahaan")
      .should("have.value", "perusahaan");

    cy.contains("button", "Selanjutnya").click();
    cy.contains("Judul Tugas Akhir");

    cy.get('input[name="email"]').type("student6@example.com");
    cy.get('[role="option"]').contains("student6@example.com").click();

    cy.get('textarea[name="title"]')
      .type("Judul Tugas Akhir Example Student6")
      .should("have.value", "Judul Tugas Akhir Example Student6");

    cy.get('textarea[name="resume"]').type(
      "Ini resumeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee student 6"
    );

    const filePath = "DAFTAR HADIR SEMPRO.pdf";
    cy.get('input[type="file"]').attachFile(filePath);
  });
});

describe("Positive - Filled Form Pengajuan Tugas Akhir Topic From Mandiri", () => {
  it("Fill Form", () => {
    loginAsStudent("student6@example.com");
    openPendaftaranTA();

    const type = "regular";
    selectTipeTA(type);

    cy.get('select[name="status"]').select("baru").should("have.value", "baru");
    cy.get('select[name="supervisor1Id"]')
      .select("Lecturer 01")
      .should("have.value", "1");
    cy.get('select[name="source_topic"]')
      .select("mandiri")
      .should("have.value", "mandiri");

    cy.contains("button", "Selanjutnya").click();
    cy.contains("Judul Tugas Akhir");

    cy.get('input[name="email"]').type("student6@example.com");
    cy.get('[role="option"]').contains("student6@example.com").click();

    cy.get('textarea[name="title"]')
      .type("Judul Tugas Akhir Example student 6")
      .should("have.value", "Judul Tugas Akhir Example student 6");

    cy.get('textarea[name="resume"]').type(
      "Ini resumeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee student 6"
    );

    const filePath = "DAFTAR HADIR SEMPRO.pdf";
    cy.get('input[type="file"]').attachFile(filePath);
  });
});

// // -------------------------- NEGATIVE CASES------------------------------

describe("Negative - Filled Form Pengajuan Tugas Akhir Only Choose Dosen Pembimbing 2", () => {
  it("Fill Form", () => {
    loginAsStudent("student7@example.com");
    openPendaftaranTA();

    const type = "regular";
    selectTipeTA(type);

    cy.get('select[name="status"]').select("baru").should("have.value", "baru");
    cy.get('select[name="supervisor2Id"]')
      .select("Lecturer 02")
      .should("have.value", "2");
    cy.get('select[name="source_topic"]')
      .select("dosen")
      .should("have.value", "dosen");

    cy.contains("button", "Selanjutnya").click();
    cy.contains("Dosen Pembimbing 1 wajib diisi");
  });
});

describe("Negative - Filled Form Pengajuan Tugas Akhir Not Choose Dosen Pembimbing", () => {
  it("Fill Form", () => {
    loginAsStudent("student7@example.com");
    openPendaftaranTA();

    const type = "regular";
    selectTipeTA(type);

    cy.get('select[name="status"]').select("baru").should("have.value", "baru");
    // Tidak memilih supervisor1Id dan supervisor2Id
    cy.get('select[name="source_topic"]')
      .select("dosen")
      .should("have.value", "dosen");

    cy.contains("button", "Selanjutnya").click();
    cy.contains("Dosen Pembimbing 1 wajib diisi");
  });
});

describe("Negative - Filled Form Pengajuan Tugas Akhir Not Choose Sumber Topik", () => {
  it("Fill Form", () => {
    loginAsStudent("student7@example.com");
    openPendaftaranTA();

    const type = "regular";
    selectTipeTA(type);

    cy.get('select[name="status"]').select("baru").should("have.value", "baru");
    cy.get('select[name="supervisor1Id"]')
      .select("Lecturer 01")
      .should("have.value", "1");

    cy.contains("button", "Selanjutnya").click();
    cy.contains("Sumber Topik wajib diisi");
  });
});

describe("Negative - Filled Form Pengajuan Tugas Akhir Not Choose Tipe Tugas Akhir", () => {
  it("Fill Form", () => {
    loginAsStudent("student7@example.com");
    openPendaftaranTA();

    cy.get('select[name="status"]').select("baru").should("have.value", "baru");
    cy.get('select[name="supervisor1Id"]')
      .select("Lecturer 01")
      .should("have.value", "1");
    cy.get('select[name="source_topic"]')
      .select("dosen")
      .should("have.value", "dosen");

    cy.contains("button", "Selanjutnya").click();
    cy.contains("Tipe Tugas Akhir wajib diisi");
  });
});

describe("Negative - Filled Form Pengajuan Tugas Akhir Not Fill Resume", () => {
  it("Menampilkan pesan 'Resume wajib diisi'", () => {
    loginAsStudent("student7@example.com");
    openPendaftaranTA();

    const type = "regular";
    selectTipeTA(type);

    cy.get('select[name="status"]').select("baru").should("have.value", "baru");
    cy.get('select[name="supervisor1Id"]')
      .select("Lecturer 01")
      .should("have.value", "1");
    cy.get('select[name="source_topic"]')
      .select("dosen")
      .should("have.value", "dosen");

    cy.contains("button", "Selanjutnya").click();
    cy.contains("PENGAJUAN TUGAS AKHIR");

    // Tidak isi resume
    cy.get('input[name="email"]').type("student6@example.com");
    cy.get('[role="option"]').contains("student6@example.com").click();

    cy.get('textarea[name="title"]')
      .type("Judul Tugas Akhir Example student 6")
      .should("have.value", "Judul Tugas Akhir Example student 6");

    // 👉 Pastikan handler resume ke-trigger (focus + blur)
    cy.get('textarea[name="resume"]').focus().blur();

    const filePath = "DAFTAR HADIR SEMPRO.pdf";
    cy.get('input[type="file"]').attachFile(filePath);

  });
});


describe("Negative - Filled Form Pengajuan Tugas Akhir With Same Dosen Pembimbing", () => {
  it("Fill Form", () => {
    loginAsStudent("student7@example.com");
    openPendaftaranTA();

    const type = "regular";
    selectTipeTA(type);

    cy.get('select[name="status"]').select("baru").should("have.value", "baru");
    cy.get('select[name="supervisor1Id"]')
      .select("Lecturer 01")
      .should("have.value", "1");
    cy.get('select[name="supervisor2Id"]')
      .select("Lecturer 01")
      .should("have.value", "1");
    cy.get('select[name="source_topic"]')
      .select("dosen")
      .should("have.value", "dosen");

    cy.contains("button", "Selanjutnya").click();
    cy.contains("Dosen Pembimbing tidak boleh sama");
  });
});

describe("Negative - Filled Form Pengajuan Tugas Akhir With Null Value", () => {
  it("Menampilkan semua pesan validasi wajib isi", () => {
    loginAsStudent("student7@example.com");
    openPendaftaranTA();
    // Tidak mengisi apa pun
    cy.contains("button", "Selanjutnya").click();
    cy.contains("Tipe Tugas Akhir wajib diisi");
    cy.contains("Jumlah Anggota wajib diisi");
    cy.contains("Status Tugas Akhir wajib diisi");
    cy.contains("Dosen Pembimbing 1 wajib diisi");
    cy.contains("Sumber Topik wajib diisi");
  });
});

//-------------------------Page 3 Pendaftaran Test-----------------------------

describe("Positive - Pengajuan Tugas Akhir With Correct Value", () => {
  it("Fill Form ", () => {
    cy.viewport(1366, 768);
    cy.visit("http://localhost:3000/auth/login");
    const email = cy.get('input[name="email"]');
    email.type("student5@example.com");

    const password = cy.get('input[name="password"]');
    password.type("password123");

    const button = cy.get('button[type="submit"]');
    button.click();
    cy.contains("Progress Bimbingan");

    // Step 1: Klik button Pendaftaran TA
    cy.contains("button", "Pendaftaran TA").click();

    // Step 2: Pastikan dropdown muncul dan ada button Daftar
    cy.contains("button", "Daftar").should("be.visible");

    // Step 3: Klik button Daftar
    cy.contains("button", "Daftar").click();

    cy.url().should("include", "/mahasiswa/tugas-akhir/daftar");
    cy.contains("PENGAJUAN TUGAS AKHIR");

    cy.get('select[name="type"]').select("regular");
    cy.get('select[name="type"]').should("have.value", "regular");

    // 2. Pastikan Jumlah Anggota = 1 dan disabled
    cy.get('select[name="jumlahAnggota"]').should("have.value", "1");
    cy.get('select[name="jumlahAnggota"]').should("be.disabled");

    cy.get('select[name="status"]').should("exist");
    cy.get('select[name="status"]').select("baru");
    cy.get('select[name="status"]').should("have.value", "baru");

    cy.get('select[name="supervisor1Id"]').select("Lecturer 01");
    cy.get('select[name="supervisor1Id"]').should("have.value", "1");

    cy.get('select[name="supervisor2Id"]').select("Lecturer 02");
    cy.get('select[name="supervisor2Id"]').should("have.value", "2");

    cy.get('select[name="source_topic"]').select("dosen");
    cy.get('select[name="source_topic"]').should("have.value", "dosen");

    cy.contains("button", "Selanjutnya").click();
    cy.contains("Judul Tugas Akhir");

    cy.get('input[name="email"]').type("student5@example.com");
    cy.get('[role="option"]').contains("student5@example.com").click();

    //input text area judulTA
    cy.get('textarea[name="title"]').type("Judul Tugas Akhir Example");
    cy.get('textarea[name="title"]').should(
      "have.value",
      "Judul Tugas Akhir Example"
    );

    cy.get('textarea[name="resume"]').type(
      "Ini resumeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
    );

    //upload file proposal
    const filePath = "DAFTAR HADIR SEMPRO.pdf";
    cy.get('input[type="file"]').attachFile(filePath);

    // cy.contains("button", "Daftar").click();
    // cy.wait(3000);
    // cy.url().should("include", "/mahasiswa/tugas-akhir/riwayat");
    // cy.contains("Resume Kebaharuan");
  });
});
