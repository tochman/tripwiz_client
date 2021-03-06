describe("User can submit destination", () => {
  beforeEach(() => {
    cy.server();
    cy.visit("/");
  });

  it("successfully", () => {
    let destination = "Rome";
    cy.route({
      method: "GET",
      url: "https://maps.googleapis.com/maps/api/geocode/json?**",
      response: "fixture:inputDest.json",
      params: {
        address: destination,
        key: process.env.REACT_APP_GOOGLE_APIKEY
      }
    });

    cy.get("#place-form").within(() => {
      cy.get("#place").type("Rome");
      cy.get("#submit").click();
    });
    cy.get("#root").should("contain", "Destination successfully selected");

    cy.get("#days").click();
    cy.get("#days > .visible > :nth-child(3)").click();
    cy.get("#days").should("contain", "3");

    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/**",
      response: "fixtures:inputDest.json"
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/**",
      response: "fixtures:inputDest.json"
    });

    cy.get("#create-trip").click();
    cy.wait(1000);
    cy.get("#root").should("contain", "Focus of trip");
  });

  it("unsuccessfully when no location is found", () => {
    let destination = "sdfsdfsdf";
    cy.route({
      method: "GET",
      url: "https://maps.googleapis.com/maps/api/geocode/json?**",
      response: "fixture:inputDest0Results.json",
      params: {
        address: destination,
        key: process.env.REACT_APP_GOOGLE_APIKEY
      }
    });

    cy.get("#place-form").within(() => {
      cy.get("#place").type("sdfsdfsdf");
      cy.get("#submit").click();
    });
    cy.get("#root").should("contain", "Can't go there. Zero Results");
  });

  it("unsuccessfully when no days are added", () => {
    let destination = "Rome";
    cy.route({
      method: "GET",
      url: "https://maps.googleapis.com/maps/api/geocode/json?**",
      response: "fixture:inputDest.json",
      params: {
        address: destination,
        key: process.env.REACT_APP_GOOGLE_APIKEY
      }
    });

    cy.get("#place-form").within(() => {
      cy.get("#place").type("Rome");
      cy.get("#submit").click();
    });
    cy.get("#root").should("contain", "Destination successfully selected");

    cy.get("#create-trip").click();
    cy.wait(1000);
    cy.get("#root").should(
      "contain",
      "You must choose how many days you will travel"
    );
  });
});
