/// <reference types="cypress" />
import { BASE_URL } from '../../app/constants/constants';

describe('Load More Button', () => {
  it('Should have a correct number of records if load more is clicked', () => {
    cy.intercept('GET', `${BASE_URL}/employees`, {
      fixture: 'employees.json',
    }).as('firstPatch');
    cy.visit('http://localhost:8080/');

    cy.wait('@firstPatch').then((intercept) => {
      const { employees: firstPatch } = intercept.response.body;
      cy.intercept('GET', `${BASE_URL}/employees?page=2`).as('secondPatch');
      cy.get('button').eq(1).click();
      cy.wait('@secondPatch').then((secondPatchInterceptor) => {
        const { employees: secondPatch } = secondPatchInterceptor.response.body;
        cy.get('.c-users-list')
          .children()
          .should('have.length', firstPatch.length + secondPatch.length + 1); // Adding 1 for table head
      });
    });
  });
});
