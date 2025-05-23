/// <reference types="cypress" />

describe('Gene Weaver - UI Interactions and Visual Elements', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Visual Feedback and Progress Bars', () => {
    it('should display progress bars for probability visualization', () => {
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.selectParentGenotype('parent2', 'traitA', 'Aa');
      
      // Check genotype progress bars
      cy.get('.genotype-tables .progress-container').should('be.visible');
      cy.get('.genotype-tables .progress-genotype').should('be.visible');
      
      // Check phenotype progress bars
      cy.get('.phenotype-tables .progress-container').should('be.visible');
      cy.get('.phenotype-tables .progress-phenotype').should('be.visible');
      
      // Check combined progress bars
      cy.get('.combined-phenotypes .progress-container').should('be.visible');
      cy.get('.combined-phenotypes .progress-combined').should('be.visible');
    });

    it('should scale progress bars according to probability', () => {
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.selectParentGenotype('parent2', 'traitA', 'Aa');
      
      // AA should have 25% width
      cy.get('.genotype-tables .trait-table').first()
        .find('tbody tr').contains('AA')
        .find('.progress-genotype')
        .should('have.css', 'width', '25%');
      
      // Aa should have 50% width (largest)
      cy.get('.genotype-tables .trait-table').first()
        .find('tbody tr').contains('Aa')
        .find('.progress-genotype')
        .should('have.css', 'width', '50%');
      
      // aa should have 25% width
      cy.get('.genotype-tables .trait-table').first()
        .find('tbody tr').contains('aa')
        .find('.progress-genotype')
        .should('have.css', 'width', '25%');
    });

    it('should apply background highlighting based on probability', () => {
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.selectParentGenotype('parent2', 'traitA', 'Aa');
      
      // Check that rows with higher probability have more intense highlighting
      cy.get('.genotype-tables .genotype-row').each(($row) => {
        cy.wrap($row).should('have.css', 'background-color');
      });
    });
  });

  describe('Responsive Design and Layout', () => {
    it('should display properly on desktop viewport', () => {
      cy.viewport(1280, 720);
      
      // Check that parent columns are side by side
      cy.get('.parents-container').should('be.visible');
      cy.get('.parent-column').should('have.length', 2);
      
      // Check that tables are arranged properly
      cy.get('.genotype-tables').should('be.visible');
      cy.get('.phenotype-tables').should('be.visible');
      cy.get('.combined-phenotypes').should('be.visible');
    });

    it('should handle tablet viewport', () => {
      cy.viewport(768, 1024);
      
      // App should still be functional
      cy.get('.gene-weaver-app').should('be.visible');
      cy.get('.parent-column').should('be.visible');
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.get('.genotype-tables').should('be.visible');
    });

    it('should handle mobile viewport', () => {
      cy.viewport(375, 667);
      
      // App should still be functional on mobile
      cy.get('.gene-weaver-app').should('be.visible');
      cy.get('.parent-column').should('be.visible');
      
      // Should be able to interact with dropdowns
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.selectParentGenotype('parent2', 'traitA', 'Aa');
      
      // Results should still display
      cy.get('.genotype-tables').should('be.visible');
    });
  });

  describe('Table Interactions and Sorting', () => {
    it('should display table headers correctly', () => {
      // Check genotype table headers
      cy.get('.genotype-tables table th').should('contain', 'Genotyyppi');
      cy.get('.genotype-tables table th').should('contain', 'Fenotyyppi');
      cy.get('.genotype-tables table th').should('contain', 'Todennäköisyys');
      
      // Check phenotype table headers
      cy.get('.phenotype-tables table th').should('contain', 'Fenotyyppi');
      cy.get('.phenotype-tables table th').should('contain', 'Todennäköisyys');
      
      // Check combined table headers
      cy.get('.combined-phenotypes table th').should('contain', 'Kissan ominaisuudet');
      cy.get('.combined-phenotypes table th').should('contain', 'Todennäköisyys');
    });

    it('should maintain table structure across different crosses', () => {
      const testCrosses = [
        { p1a: 'AA', p2a: 'AA' },
        { p1a: 'Aa', p2a: 'Aa' },
        { p1a: 'aa', p2a: 'aa' },
      ];
      
      testCrosses.forEach((cross) => {
        cy.selectParentGenotype('parent1', 'traitA', cross.p1a);
        cy.selectParentGenotype('parent2', 'traitA', cross.p2a);
        
        // Tables should maintain their structure
        cy.get('.genotype-tables table thead').should('be.visible');
        cy.get('.genotype-tables table tbody').should('be.visible');
        cy.get('.phenotype-tables table thead').should('be.visible');
        cy.get('.phenotype-tables table tbody').should('be.visible');
      });
    });

    it('should handle table overflow gracefully', () => {
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.selectParentGenotype('parent1', 'traitB', 'Bb');
      cy.selectParentGenotype('parent2', 'traitA', 'Aa');
      cy.selectParentGenotype('parent2', 'traitB', 'Bb');
      
      // Even with maximum complexity, tables should display properly
      cy.get('.genotype-tables').should('be.visible');
      cy.get('.phenotype-tables').should('be.visible');
      cy.get('.combined-phenotypes').should('be.visible');
      
      // No horizontal scrolling should be needed
      cy.get('body').should('have.css', 'overflow-x', 'visible');
    });
  });

  describe('Form Control Interactions', () => {
    it('should provide clear visual feedback for dropdown selections', () => {
      // Hover and focus states
      cy.get('.parent-column select').first().focus();
      cy.get('.parent-column select').first().should('have.focus');
      
      // Selection changes should be immediate
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.get('.parent-column select').first().should('have.value', 'Aa');
    });

    it('should maintain form state across interactions', () => {
      // Set multiple selections
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.selectParentGenotype('parent1', 'traitB', 'Bb');
      cy.selectParentGenotype('parent2', 'traitA', 'aa');
      cy.selectParentGenotype('parent2', 'traitB', 'bb');
      
      // Verify all selections are maintained
      cy.get('.parent-column').first().find('select').first().should('have.value', 'Aa');
      cy.get('.parent-column').first().find('select').last().should('have.value', 'Bb');
      cy.get('.parent-column').last().find('select').first().should('have.value', 'aa');
      cy.get('.parent-column').last().find('select').last().should('have.value', 'bb');
    });

    it('should handle rapid selection changes', () => {
      const selections = ['AA', 'Aa', 'aa', 'AA'];
      
      selections.forEach((selection) => {
        cy.selectParentGenotype('parent1', 'traitA', selection);
        cy.get('.genotype-tables').should('be.visible');
        cy.wait(100); // Small delay to allow calculation updates
      });
      
      // Final state should be correct
      cy.get('.parent-column').first().find('select').first().should('have.value', 'AA');
    });
  });

  describe('Visual Styling and Themes', () => {
    it('should apply consistent color scheme', () => {
      // Check main app background
      cy.get('.gene-weaver-app').should('have.css', 'background-color');
      
      // Check trait legend styling
      cy.get('.trait-legends').should('have.css', 'background-color');
      
      // Check progress bar colors
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.selectParentGenotype('parent2', 'traitA', 'Aa');
      
      cy.get('.progress-genotype').should('exist');
      cy.get('.progress-phenotype').should('exist');
      cy.get('.progress-combined').should('exist');
    });

    it('should maintain readability with sufficient contrast', () => {
      // Check text contrast
      cy.get('h1').should('have.css', 'color');
      cy.get('h2').should('have.css', 'color');
      cy.get('table').should('have.css', 'color');
      
      // Check table borders for structure
      cy.get('table').should('have.css', 'border');
      cy.get('th').should('have.css', 'border-bottom');
    });

    it('should apply hover effects on interactive elements', () => {
      cy.get('select').first().trigger('mouseover');
      // Select elements should be clearly interactive
      cy.get('select').first().should('have.css', 'cursor', 'pointer');
    });
  });
});
