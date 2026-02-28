const loginAsLecturer = (email) => {
  cy.viewport(1366, 768);
  cy.visit("http://localhost:3000/auth/login");
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type("password123");
  cy.get('button[type="submit"]').click();
  cy.contains("Dashboard Dosen");
};

const loginAsLecturerpassword = (password) => {
  cy.viewport(1366, 768);
  cy.visit("http://localhost:3000/auth/login");
  cy.get('input[name="email"]').type("lecturer1@example.com");
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.contains("Dashboard Dosen");
};

const loginAsLecturernull = (email, password) => {
  cy.viewport(1366, 768);
  cy.visit("http://localhost:3000/auth/login");
  cy.get('input[name="email"]').type();
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.contains("Dashboard Dosen");
};


describe ('Login Dosen', () => {
  it ('should login as dosen successfully', () => {
    loginAsLecturer('lecturer1@example.com');
    cy.contains("Dashboard Dosen");
  });
});

describe ('Negative - Login dengan email yang salah', ()=>{
    it('Input email salah',()=>{
        loginAsLecturer('emaildosen@awdaw.com');
        cy.contains("Email tidak ditemukan");
    });
});

describe ('Negative - Login dengan password salah', ()=>{
    it('Password salah',()=>{
        loginAsLecturerpassword("123123123");
        cy.contains("Password salah");
    });
});

describe ('Negative - email tidak diisi',()=>{
    it("tidak mengisi email",()=>{
        loginAsLecturer(" ");
        cy.contains("Email wajib diisi");
    })
})

describe ('Negative - Null Value', ()   =>{
    it('tidak mengisi email dan password',()=>{
        loginAsLecturernull(" "," ");
        cy.contains("Email wajib diisi");
        cy.contains("Password wajib diisi");
    });
});
