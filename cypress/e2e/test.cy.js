describe("react-anchor-navigation test cases", { baseUrl: null }, () => {
  it("Should redirect to the correct anchor based on URL's hash", () => {
    cy.visit("/examples/basic.html#part-3");
    cy.get("[data-cy=anchor_link_part-1] a").should(
      "not.have.class",
      "selected"
    );
    cy.get("[data-cy=anchor_link_part-3] a").should("have.class", "selected");
  });

  it("Should check that scrolling updates the hash", () => {
    cy.visit("/examples/basic.html");
    cy.url().should("include", "#part-1");
    cy.get("[data-cy=anchor_link_part-1] a").should("have.class", "selected");

    cy.scrollTo("0%", "30%");
    cy.url().should("include", "#part-2");
    cy.get("[data-cy=anchor_link_part-1] a").should(
      "not.have.class",
      "selected"
    );
    cy.get("[data-cy=anchor_link_part-2] a").should("have.class", "selected");

    cy.scrollTo("0%", "60%");
    cy.url().should("include", "#part-3");
    cy.get("[data-cy=anchor_link_part-3] a").should("have.class", "selected");

    cy.scrollTo("0%", "90%");
    cy.url().should("include", "#part-4");
    cy.get("[data-cy=anchor_link_part-4] a").should("have.class", "selected");
  });
});
