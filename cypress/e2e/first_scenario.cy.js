/// <reference types="cypress" />
import { BASE_URL } from '../../app/constants/constants';

describe('Mocking Employees', () => {
  it('Should populate employees data in table', () => {
    cy.intercept('GET', `${BASE_URL}/employees`, {
      fixture: 'employees.json',
    }).as('employees');
    cy.visit('http://localhost:8080/');

    cy.wait('@employees').then((intercept) => {
      const { employees } = intercept.response.body;
      cy.get('.c-users-list')
        .children()
        .should('have.length', employees.length + 1); // Adding 1 for table head
    });
  });
});

describe('Team Performance Link Assertions', () => {
  it('Should exist, and the link should be => http://localhost:8080/team-performance', () => {
    cy.visit('http://localhost:8080/');
    cy.get('a')
      .eq(1)
      .should('have.text', 'Team performance chart page')
      .and('have.attr', 'href', '/team-performance');
  });
});
