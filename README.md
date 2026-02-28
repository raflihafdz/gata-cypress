# GATA Cypress - Automated Testing Suite

Project ini adalah suite otomasi testing menggunakan **Cypress** untuk sistem **GATA (Graduation Authority Technical Application)**. Mencakup test cases untuk mahasiswa, dosen, dan admin.

## 📋 Daftar Isi

- [Prerequisites](#prerequisites)
- [Instalasi](#instalasi)
- [Struktur Project](#struktur-project)
- [Cara Menjalankan Tests](#cara-menjalankan-tests)
- [Daftar Test Cases](#daftar-test-cases)
- [Kontribusi](#kontribusi)

---

## Prerequisites

Sebelum memulai, pastikan Anda sudah memiliki:

- **Node.js** versi 18+ ([Download di sini](https://nodejs.org/))
- **npm** atau **yarn** (biasanya sudah terinstall dengan Node.js)
- **Git** untuk clone repository
- Browser Chrome atau Chromium (untuk menjalankan tests)

---

## Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/raflihafdz/gata-cypress.git
cd gata-cypress
```

### 2. Install Dependencies

```bash
npm install
```

Atau jika menggunakan yarn:

```bash
yarn install
```

Perintah ini akan menginstall:
- **Cypress** - Framework testing
- **Cypress File Upload** - Plugin untuk upload file
- **Webpack Preprocessor** - Untuk preprocessing

### 3. Verifikasi Instalasi

```bash
npx cypress --version
```

---

## Struktur Project

```
gata-cypress/
├── cypress/
│   ├── e2e/                           # Test specification files
│   │   ├── admin/                     # Test untuk Admin
│   │   │   ├── auth/
│   │   │   ├── pendaftaran-ta/
│   │   │   └── penilaian/
│   │   ├── dosen/                     # Test untuk Dosen
│   │   │   ├── auth/
│   │   │   ├── bimbingan/
│   │   │   ├── penilaian/
│   │   │   ├── validasi-ta/
│   │   │   └── validasi-pengajuan-sidang/
│   │   └── mahasiswa/                 # Test untuk Mahasiswa
│   │       ├── auth/
│   │       ├── bimbingan/
│   │       ├── BAP/
│   │       ├── pendaftaran-TA/
│   │       └── pendaftaran-sidang/
│   ├── fixtures/                      # Test data (JSON, PDF, Documents)
│   ├── support/                       # Custom commands dan helpers
│   │   ├── commands.js                # Custom commands umum
│   │   ├── auth-commands.js           # Commands untuk authentication
│   │   ├── student-commands.js        # Commands untuk mahasiswa
│   │   └── e2e.js                     # Support file untuk e2e
│   ├── downloads/                     # Folder untuk downloaded files
│   ├── screenshots/                   # Screenshots saat test gagal
│   └── videos/                        # Video recordings (jika diaktifkan)
├── cypress.config.js                  # Konfigurasi Cypress
├── package.json                       # Dependencies dan scripts
├── test-scripts.json                  # Dokumentasi test scripts
├── .gitignore                         # Git ignore rules
└── README.md                          # File ini
```

---

## Cara Menjalankan Tests

### 1. Mode Interactive (Cypress UI)

Buka Cypress Test Runner dengan UI:

```bash
npx cypress open
```

Ini akan membuka Cypress UI di mana Anda bisa:
- Memilih test file individual
- Melihat real-time execution
- Debug tests dengan DevTools
- Melihat screenshots dan videos

### 2. Mode Headless (Command Line)

Jalankan semua tests di background:

```bash
npx cypress run
```

### 3. Jalankan Specific Test File

```bash
# Login mahasiswa test
npx cypress run --spec "cypress/e2e/mahasiswa/auth/login-mahasiswa.cy.js"

# Atau dengan UI
npx cypress open --spec "cypress/e2e/mahasiswa/auth/login-mahasiswa.cy.js"
```

### 4. Jalankan Tests Berdasarkan Browser

```bash
# Chrome
npx cypress run --browser chrome

# Firefox (jika terinstall)
npx cypress run --browser firefox

# Edge (jika terinstall)
npx cypress run --browser edge
```

### 5. Jalankan dengan Video Recording

```bash
npx cypress run --record
```

---

## Daftar Test Cases

### 📚 Admin Tests
- **Login Admin** (`admin/auth/login-admin.cy.js`)
- **View Daftar TA** (`admin/pendaftaran-ta/1-view-daftar-ta.cy.js`)
- **Open Periode** (`admin/pendaftaran-ta/open-periode.cy.js`)
- **Penilaian ADP** (`admin/penilaian/ADP-001-008.cy.js`, `ADP-009-018.cy.js`)

### 👨‍🏫 Dosen Tests
- **Login Dosen** (`dosen/auth/login-dosen.cy.js`)
- **Bimbingan Tests** (`dosen/bimbingan/KBA-001.cy.js` - `KBA-020.cy.js`)
- **Penilaian Dosen** (`dosen/penilaian/DPA-001-002.cy.js`, `DPA-003-007.cy.js`)
- **Validasi TA** (`dosen/validasi-ta/1-get-pendaftar.cy.js` - `4-tambah-slot.cy.js`)
- **Validasi Pengajuan Sidang** (`dosen/validasi-pengajuan-sidang/`)

### 👨‍🎓 Mahasiswa Tests
- **Login Mahasiswa** (`mahasiswa/auth/login-mahasiswa.cy.js`)
- **Register** (`mahasiswa/auth/register/01-form-elements.cy.js` - `04-duplicate-validation.cy.js`)
- **Forget & Reset Password** (`mahasiswa/auth/forgetPW-mahasiswa.cy.js`, `resetPW-mahasiswa.cy.js`)
- **Bimbingan** (`mahasiswa/bimbingan/pengajuan/`)
- **Pendaftaran TA** (`mahasiswa/pendaftaran-TA/`)
- **Pendaftaran Sidang** (`mahasiswa/pendaftaran-sidang/DSA-001-010.cy.js`)
- **BAP** (`mahasiswa/BAP/BMA-001-002.cy.js`)

---

## Konfigurasi

### File: `cypress.config.js`

Konfigurasi penting:
- **Viewport**: 1366x768 (standar laptop)
- **Timeout**: 8 detik untuk command & request
- **Page Load Timeout**: 30 detik
- **Retry**: 2x untuk CI mode, 0x untuk dev mode
- **Screenshot on Failure**: Otomatis capture screenshot saat test gagal

Untuk mengubah konfigurasi, edit file `cypress.config.js`:

```javascript
module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://your-app-url.com',
    viewportWidth: 1366,
    viewportHeight: 768,
    // ... konfigurasi lainnya
  }
});
```

---

## Custom Commands

Project ini memiliki custom commands yang bisa Anda gunakan:

### Authentication Commands (`support/auth-commands.js`)

```javascript
// Login as student
cy.loginAsStudent(username, password);

// Login as lecturer
cy.loginAsLecturer(username, password);

// Login as admin
cy.loginAsAdmin(username, password);
```

### General Commands (`support/commands.js`)

```javascript
// Upload file
cy.uploadFile('path/to/file');

// Wait dan click
cy.waitAndClick(selector);

// Assert visibility
cy.checkVisible(selector);
```

### Student Commands (`support/student-commands.js`)

Berisi command khusus untuk flow mahasiswa.

---

## Tips & Best Practices

### 1. Debugging Tests

```bash
# Debug mode
npx cypress run --debug
```

Atau gunakan Cypress UI dengan pause/step-through:
- Klik tombol pause di Cypress UI
- Use DevTools untuk inspect elements

### 2. Menambah Test Baru

Buat file baru dengan format: `[MODULE-ID].cy.js`

```javascript
describe('Feature Name', () => {
  beforeEach(() => {
    cy.loginAsStudent('username', 'password');
    cy.visit('/dashboard');
  });

  it('should do something', () => {
    cy.get('button').click();
    cy.contains('Success').should('be.visible');
  });
});
```

### 3. Gunakan Fixtures

Untuk test data, gunakan file di `cypress/fixtures/`:

```javascript
cy.fixture('example.json').then((data) => {
  cy.wrap(data).as('testData');
});
```

### 4. Screenshot & Video

- Screenshots otomatis saat test gagal di folder `cypress/screenshots/`
- Untuk CI/CD, aktifkan video recording di config

---

## Troubleshooting

### Error: "Command not found: cypress"

**Solusi:**
```bash
npm install
npx cypress install
```

### Tests timeout atau slow

**Solusi:**
1. Periksa koneksi internet
2. Pastikan aplikasi GATA tidak down
3. Increase timeout di `cypress.config.js`:
```javascript
defaultCommandTimeout: 10000, // 10 detik
pageLoadTimeout: 40000, // 40 detik
```

### Screenshot/Video tidak tersimpan

**Solusi:**
- Pastikan folder `cypress/screenshots/` dan `cypress/videos/` exists
- Jika tidak ada, buat manual atau jalankan `npm install` ulang

### Login gagal

**Solusi:**
- Verify credentials benar
- Check aplikasi GATA online
- Pastikan tidak ada captcha di login page
- Clear browser cache: `npx cypress run --no-cache`

---

## CI/CD Integration

### GitHub Actions

Buat file `.github/workflows/cypress.yml`:

```yaml
name: Cypress Tests

on: [push, pull_request]

jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npx cypress run
      - uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: cypress-screenshots
          path: cypress/screenshots
```

---

## Kontribusi

Untuk menambah atau modify tests:

1. **Buat branch baru**:
   ```bash
   git checkout -b feature/test-baru
   ```

2. **Buat atau edit test file** di folder `cypress/e2e/`

3. **Test secara lokal**:
   ```bash
   npx cypress open
   ```

4. **Commit dan push**:
   ```bash
   git add .
   git commit -m "Add: test untuk fitur X"
   git push origin feature/test-baru
   ```

5. **Buat Pull Request** di GitHub

---

## Dokumentasi Lebih Lanjut

- [Cypress Documentation](https://docs.cypress.io/)
- [Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [API Reference](https://docs.cypress.io/api/table-of-contents)

---

## License

ISC License - Lihat file LICENSE untuk detail

---

## Author

**Raps** - Cypress Automation

---

**Last Updated**: 28 February 2026

Jika ada pertanyaan atau issue, silahkan buat issue di GitHub repository ini! 😊
