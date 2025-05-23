// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Define custom command type definitions
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select parent genotype
       * @example cy.selectParentGenotype('parent1', 'traitA', 'AA')
       */
      selectParentGenotype(parent: 'parent1' | 'parent2', trait: 'traitA' | 'traitB', genotype: string): Chainable<Element>
      
      /**
       * Custom command to verify probability table
       * @example cy.verifyProbabilityTable('genotype', expectedResults)
       */
      verifyProbabilityTable(tableType: 'genotype' | 'phenotype' | 'combined', expectedResults: any[]): Chainable<Element>
      
      /**
       * Custom command to verify genetic calculation results
       * @example cy.verifyGeneticCalculation(parent1, parent2, expectedResults)
       */
      verifyGeneticCalculation(parent1: any, parent2: any, expectedResults: any): Chainable<Element>
      
      /**
       * Custom command to test accessibility
       * @example cy.checkA11y()
       */
      checkA11y(): Chainable<Element>
      
      /**
       * Custom command to measure performance
       * @example cy.measurePerformance()
       */
      measurePerformance(): Chainable<any>
    }
  }
}

// Prevent TypeScript from reading file as legacy script
export {}
