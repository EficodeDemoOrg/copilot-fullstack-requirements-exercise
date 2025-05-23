/// <reference types="cypress" />

describe('Gene Weaver - Basic Functionality', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Page Structure and Initial State', () => {
    it('should display the main application title', () => {
      cy.get('h1').should('contain', 'Kissojen Geenienkutoja');
    });

    it('should display trait legends for both traits', () => {
      cy.get('.trait-legends').should('be.visible');
      cy.get('.trait-legend').should('have.length', 2);
      
      // Check trait A legend
      cy.get('.trait-legend').first()
        .should('contain', 'Hännän pituus')
        .should('contain', 'Alleelit A ja a')
        .should('contain', 'Dominantti (A): Pitkä')
        .should('contain', 'Resessiivinen (a): Lyhyt');
      
      // Check trait B legend
      cy.get('.trait-legend').last()
        .should('contain', 'Turkin väri')
        .should('contain', 'Alleelit B ja b')
        .should('contain', 'Dominantti (B): Musta')
        .should('contain', 'Resessiivinen (b): Ruskea');
    });

    it('should display parent selection controls', () => {
      cy.get('.parents-container').should('be.visible');
      cy.get('.parent-column').should('have.length', 2);
      
      // Check parent 1 controls
      cy.get('.parent-column').first()
        .should('contain', 'Vanhempi 1')
        .find('.trait-selector').should('have.length', 2);
      
      // Check parent 2 controls
      cy.get('.parent-column').last()
        .should('contain', 'Vanhempi 2')
        .find('.trait-selector').should('have.length', 2);
    });

    it('should display result tables', () => {
      cy.get('.genotype-tables').should('be.visible');
      cy.get('.phenotype-tables').should('be.visible');
      cy.get('.combined-phenotypes').should('be.visible');
      
      // Check genotype tables
      cy.get('.genotype-tables .trait-table').should('have.length', 2);
      
      // Check phenotype tables
      cy.get('.phenotype-tables .trait-table').should('have.length', 2);
      
      // Check combined phenotype table
      cy.get('.combined-phenotypes table').should('exist');
    });

    it('should have default genotype selections (AA and BB)', () => {
      cy.get('.parent-column').first()
        .find('select').first().should('have.value', 'AA');
      cy.get('.parent-column').first()
        .find('select').last().should('have.value', 'BB');
      
      cy.get('.parent-column').last()
        .find('select').first().should('have.value', 'AA');
      cy.get('.parent-column').last()
        .find('select').last().should('have.value', 'BB');
    });
  });

  describe('Genotype Selection Functionality', () => {
    it('should allow selecting different genotypes for trait A', () => {
      const traitAOptions = ['AA', 'Aa', 'aa'];
      
      traitAOptions.forEach((genotype) => {
        cy.selectParentGenotype('parent1', 'traitA', genotype);
        cy.get('.parent-column').first()
          .find('select').first()
          .should('have.value', genotype);
      });
    });

    it('should allow selecting different genotypes for trait B', () => {
      const traitBOptions = ['BB', 'Bb', 'bb'];
      
      traitBOptions.forEach((genotype) => {
        cy.selectParentGenotype('parent1', 'traitB', genotype);
        cy.get('.parent-column').first()
          .find('select').last()
          .should('have.value', genotype);
      });
    });

    it('should display phenotype descriptions in select options', () => {
      // Check trait A options
      cy.get('.parent-column').first()
        .find('select').first()
        .find('option').should('contain', 'AA - Pitkä')
        .and('contain', 'Aa - Pitkä')
        .and('contain', 'aa - Lyhyt');
      
      // Check trait B options
      cy.get('.parent-column').first()
        .find('select').last()
        .find('option').should('contain', 'BB - Musta')
        .and('contain', 'Bb - Musta')
        .and('contain', 'bb - Ruskea');
    });

    it('should update calculations when genotypes change', () => {
      // Set initial state
      cy.selectParentGenotype('parent1', 'traitA', 'AA');
      cy.selectParentGenotype('parent2', 'traitA', 'AA');
      
      // Verify 100% AA result
      cy.get('.genotype-tables').first()
        .find('tbody tr').first()
        .should('contain', 'AA')
        .find('.probability-text').should('contain', '100%');
      
      // Change to heterozygous cross
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.selectParentGenotype('parent2', 'traitA', 'Aa');
      
      // Verify updated results
      cy.get('.genotype-tables').first()
        .find('tbody tr').should('have.length.greaterThan', 1);
    });
  });

  describe('Instructions and Help Text', () => {
    it('should display comprehensive instructions', () => {
      cy.get('.instructions-container').should('be.visible')
        .should('contain', 'Kissojen genetiikan simulaattori')
        .should('contain', 'Mendelin periytymissääntöjen')
        .should('contain', 'Dominantti alleeli A tuottaa')
        .should('contain', 'Dominantti alleeli B tuottaa')
        .should('contain', 'Valitse molempien vanhempien genotyypit');
    });

    it('should provide clear trait explanations', () => {
      cy.get('.instructions-container')
        .should('contain', 'Hännän pituus (A/a)')
        .should('contain', 'Turkin väri (B/b)')
        .should('contain', 'pitkä hännän')
        .should('contain', 'lyhyt hännän')
        .should('contain', 'musta turkin')
        .should('contain', 'ruskea turkin');
    });
  });
});
