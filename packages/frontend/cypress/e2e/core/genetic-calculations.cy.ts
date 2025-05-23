/// <reference types="cypress" />

describe('Gene Weaver - Genetic Calculations', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Monohybrid Crosses (Single Trait)', () => {
    it('should correctly calculate AA × AA cross (100% AA)', () => {
      cy.selectParentGenotype('parent1', 'traitA', 'AA');
      cy.selectParentGenotype('parent2', 'traitA', 'AA');
      
      // Verify genotype results
      cy.get('.genotype-tables .trait-table').first()
        .find('tbody tr').should('have.length', 1)
        .and('contain', 'AA')
        .find('.probability-text').should('contain', '100%');
      
      // Verify phenotype results
      cy.get('.phenotype-tables .trait-table').first()
        .find('tbody tr').first()
        .should('contain', 'Pitkä')
        .find('.probability-text').should('contain', '100%');
    });

    it('should correctly calculate AA × aa cross (100% Aa)', () => {
      cy.selectParentGenotype('parent1', 'traitA', 'AA');
      cy.selectParentGenotype('parent2', 'traitA', 'aa');
      
      // Verify genotype results
      cy.get('.genotype-tables .trait-table').first()
        .find('tbody tr').should('have.length', 1)
        .and('contain', 'Aa')
        .find('.probability-text').should('contain', '100%');
      
      // Verify phenotype results  
      cy.get('.phenotype-tables .trait-table').first()
        .find('tbody tr').first()
        .should('contain', 'Pitkä')
        .find('.probability-text').should('contain', '100%');
    });

    it('should correctly calculate Aa × Aa cross (1:2:1 ratio)', () => {
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.selectParentGenotype('parent2', 'traitA', 'Aa');
      
      // Verify genotype results (should have 3 rows: AA, Aa, aa)
      cy.get('.genotype-tables .trait-table').first()
        .find('tbody tr').should('have.length', 3);
      
      // Check AA (25%)
      cy.get('.genotype-tables .trait-table').first()
        .find('tbody tr').contains('AA')
        .find('.probability-text').should('contain', '25%');
      
      // Check Aa (50%)
      cy.get('.genotype-tables .trait-table').first()
        .find('tbody tr').contains('Aa')
        .find('.probability-text').should('contain', '50%');
      
      // Check aa (25%)
      cy.get('.genotype-tables .trait-table').first()
        .find('tbody tr').contains('aa')
        .find('.probability-text').should('contain', '25%');
      
      // Verify phenotype results (3:1 ratio)
      cy.get('.phenotype-tables .trait-table').first()
        .find('tbody tr').contains('Pitkä')
        .find('.probability-text').should('contain', '75%');
      
      cy.get('.phenotype-tables .trait-table').first()
        .find('tbody tr').contains('Lyhyt')
        .find('.probability-text').should('contain', '25%');
    });

    it('should correctly calculate aa × aa cross (100% aa)', () => {
      cy.selectParentGenotype('parent1', 'traitA', 'aa');
      cy.selectParentGenotype('parent2', 'traitA', 'aa');
      
      // Verify genotype results
      cy.get('.genotype-tables .trait-table').first()
        .find('tbody tr').should('have.length', 1)
        .and('contain', 'aa')
        .find('.probability-text').should('contain', '100%');
      
      // Verify phenotype results
      cy.get('.phenotype-tables .trait-table').first()
        .find('tbody tr').first()
        .should('contain', 'Lyhyt')
        .find('.probability-text').should('contain', '100%');
    });
  });

  describe('Trait B Calculations', () => {
    it('should correctly calculate BB × BB cross', () => {
      cy.selectParentGenotype('parent1', 'traitB', 'BB');
      cy.selectParentGenotype('parent2', 'traitB', 'BB');
      
      // Verify genotype results
      cy.get('.genotype-tables .trait-table').last()
        .find('tbody tr').should('have.length', 1)
        .and('contain', 'BB')
        .find('.probability-text').should('contain', '100%');
      
      // Verify phenotype results
      cy.get('.phenotype-tables .trait-table').last()
        .find('tbody tr').first()
        .should('contain', 'Musta')
        .find('.probability-text').should('contain', '100%');
    });

    it('should correctly calculate Bb × Bb cross', () => {
      cy.selectParentGenotype('parent1', 'traitB', 'Bb');
      cy.selectParentGenotype('parent2', 'traitB', 'Bb');
      
      // Verify genotype results (1:2:1 ratio)
      cy.get('.genotype-tables .trait-table').last()
        .find('tbody tr').should('have.length', 3);
      
      // Verify phenotype results (3:1 ratio)
      cy.get('.phenotype-tables .trait-table').last()
        .find('tbody tr').contains('Musta')
        .find('.probability-text').should('contain', '75%');
      
      cy.get('.phenotype-tables .trait-table').last()
        .find('tbody tr').contains('Ruskea')
        .find('.probability-text').should('contain', '25%');
    });
  });

  describe('Dihybrid Crosses (Combined Traits)', () => {
    it('should correctly calculate AABB × AABB cross', () => {
      cy.selectParentGenotype('parent1', 'traitA', 'AA');
      cy.selectParentGenotype('parent1', 'traitB', 'BB');
      cy.selectParentGenotype('parent2', 'traitA', 'AA');
      cy.selectParentGenotype('parent2', 'traitB', 'BB');
      
      // Verify combined phenotype results (100% Pitkä, Musta)
      cy.get('.combined-phenotypes tbody tr').should('have.length', 4);
      cy.get('.combined-phenotypes tbody tr').first()
        .should('contain', 'pitkä')
        .should('contain', 'musta')
        .find('.probability-text').should('contain', '100%');
    });

    it('should correctly calculate AaBb × AaBb cross (9:3:3:1 ratio)', () => {
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.selectParentGenotype('parent1', 'traitB', 'Bb');
      cy.selectParentGenotype('parent2', 'traitA', 'Aa');
      cy.selectParentGenotype('parent2', 'traitB', 'Bb');
      
      // Verify combined phenotype results
      cy.get('.combined-phenotypes tbody tr').should('have.length', 4);
      
      // Check approximate ratios (allowing for rounding)
      cy.get('.combined-phenotypes tbody tr').contains('pitkä').contains('musta')
        .find('.probability-text').should('contain', '56%'); // 9/16 ≈ 56%
      
      cy.get('.combined-phenotypes tbody tr').contains('pitkä').contains('ruskea')
        .find('.probability-text').should('contain', '19%'); // 3/16 ≈ 19%
      
      cy.get('.combined-phenotypes tbody tr').contains('lyhyt').contains('musta')
        .find('.probability-text').should('contain', '19%'); // 3/16 ≈ 19%
      
      cy.get('.combined-phenotypes tbody tr').contains('lyhyt').contains('ruskea')
        .find('.probability-text').should('contain', '6%'); // 1/16 ≈ 6%
    });

    it('should correctly calculate AAbb × aaBB cross', () => {
      cy.selectParentGenotype('parent1', 'traitA', 'AA');
      cy.selectParentGenotype('parent1', 'traitB', 'bb');
      cy.selectParentGenotype('parent2', 'traitA', 'aa');
      cy.selectParentGenotype('parent2', 'traitB', 'BB');
      
      // All offspring should be AaBb (100% Pitkä, Musta)
      cy.get('.combined-phenotypes tbody tr').first()
        .should('contain', 'pitkä')
        .should('contain', 'musta')
        .find('.probability-text').should('contain', '100%');
    });
  });

  describe('Edge Cases and Symmetry', () => {
    it('should produce identical results for symmetric crosses', () => {
      // Test P1(Aa) × P2(AA) vs P1(AA) × P2(Aa)
      
      // First configuration
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.selectParentGenotype('parent2', 'traitA', 'AA');
      
      let firstResults: string[] = [];
      cy.get('.genotype-tables .trait-table').first()
        .find('.probability-text').each(($el) => {
          firstResults.push($el.text());
        });
      
      // Second configuration (swapped)
      cy.selectParentGenotype('parent1', 'traitA', 'AA');
      cy.selectParentGenotype('parent2', 'traitA', 'Aa');
      
      // Results should be identical
      cy.get('.genotype-tables .trait-table').first()
        .find('.probability-text').each(($el, index) => {
          expect($el.text()).to.equal(firstResults[index]);
        });
    });

    it('should handle all possible genotype combinations', () => {
      const genotypes = ['AA', 'Aa', 'aa'];
      
      genotypes.forEach((p1) => {
        genotypes.forEach((p2) => {
          cy.selectParentGenotype('parent1', 'traitA', p1);
          cy.selectParentGenotype('parent2', 'traitA', p2);
          
          // Verify tables are populated
          cy.get('.genotype-tables .trait-table').first()
            .find('tbody tr').should('have.length.greaterThan', 0);
          
          // Verify probabilities sum to 100%
          let totalProbability = 0;
          cy.get('.genotype-tables .trait-table').first()
            .find('.probability-text').each(($el) => {
              totalProbability += parseInt($el.text().replace('%', ''));
            }).then(() => {
              expect(totalProbability).to.equal(100);
            });
        });
      });
    });
  });
});
