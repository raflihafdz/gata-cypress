const loginAsAdmin = (email) => {
  cy.viewport(1366, 768);
  cy.visit("http://localhost:3000/auth/login");
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type("password123");
  cy.get('button[type="submit"]').click();
  cy.contains("Selamat Datang di GATA.");
};

describe("Login Admin", () => {
  it("Positive - Login sebagai admin", () => {
    loginAsAdmin("admin@example.com");
  });
});
