/// <reference types="cypress" />

// Custom command to select parent genotype
Cypress.Commands.add('selectParentGenotype', (parent: 'parent1' | 'parent2', trait: 'traitA' | 'traitB', genotype: string) => {
  const parentIndex = parent === 'parent1' ? 0 : 1;
  const traitIndex = trait === 'traitA' ? 0 : 1;
  
  cy.get('.parent-column').eq(parentIndex)
    .find('.trait-selector').eq(traitIndex)
    .find('select')
    .select(genotype);
});

// Custom command to verify probability table results
Cypress.Commands.add('verifyProbabilityTable', (tableType: 'genotype' | 'phenotype' | 'combined', expectedResults: any[]) => {
  let tableSelector: string;
  
  switch (tableType) {
    case 'genotype':
      tableSelector = '.genotype-tables table';
      break;
    case 'phenotype':
      tableSelector = '.phenotype-tables table';
      break;
    case 'combined':
      tableSelector = '.combined-phenotypes table';
      break;
  }
  
  expectedResults.forEach((result, index) => {
    cy.get(tableSelector).first()
      .find('tbody tr').eq(index)
      .within(() => {
        if (tableType === 'combined') {
          cy.get('td').first().should('contain', result.description || result.phenotype);
        } else {
          cy.get('td').first().should('contain', result.genotype || result.phenotype);
        }
        cy.get('.probability-text').should('contain', `${Math.round(result.probability * 100)}%`);
      });
  });
});

// Custom command to verify complete genetic calculation
Cypress.Commands.add('verifyGeneticCalculation', (parent1: any, parent2: any, expectedResults: any) => {
  // Set parent genotypes
  cy.selectParentGenotype('parent1', 'traitA', parent1.traitA);
  cy.selectParentGenotype('parent1', 'traitB', parent1.traitB);
  cy.selectParentGenotype('parent2', 'traitA', parent2.traitA);
  cy.selectParentGenotype('parent2', 'traitB', parent2.traitB);
  
  // Verify results appear
  cy.get('.genotype-tables').should('be.visible');
  cy.get('.phenotype-tables').should('be.visible');
  cy.get('.combined-phenotypes').should('be.visible');
  
  // Verify specific probability calculations
  if (expectedResults.genotype) {
    cy.verifyProbabilityTable('genotype', expectedResults.genotype);
  }
  if (expectedResults.phenotype) {
    cy.verifyProbabilityTable('phenotype', expectedResults.phenotype);
  }
  if (expectedResults.combined) {
    cy.verifyProbabilityTable('combined', expectedResults.combined);
  }
});

// Custom command for accessibility testing
Cypress.Commands.add('checkA11y', () => {
  // Basic accessibility checks
  cy.get('h1').should('exist');
  cy.get('h2').should('exist');
  
  // Check for form labels
  cy.get('label').should('have.length.greaterThan', 0);
  cy.get('select').each(($select) => {
    cy.wrap($select).should('have.attr', 'aria-label').or('have.id');
  });
  
  // Check for table headers
  cy.get('table').each(($table) => {
    cy.wrap($table).find('th').should('have.length.greaterThan', 0);
  });
  
  // Check color contrast and readability
  cy.get('.probability-text').should('have.css', 'color');
  cy.get('table').should('have.css', 'border');
});

// Custom command for performance measurement
Cypress.Commands.add('measurePerformance', () => {
  cy.window().then((win) => {
    const loadTime = win.performance.timing.loadEventEnd - win.performance.timing.navigationStart;
    expect(loadTime).to.be.lessThan(5000); // Page should load in under 5 seconds
    
    // Log performance metrics
    cy.task('log', `Page load time: ${loadTime}ms`);
  });
});

// Prevent TypeScript from reading file as legacy script
export {}
