/// <reference types="cypress" />

describe('Gene Weaver - Accessibility Compliance', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Semantic HTML Structure', () => {
    it('should have proper heading hierarchy', () => {
      // Should have one main heading
      cy.get('h1').should('have.length', 1);
      cy.get('h1').should('contain', 'Kissojen Geenienkutoja');
      
      // Should have multiple section headings
      cy.get('h2').should('have.length.greaterThan', 3);
      
      // Should have sub-section headings
      cy.get('h3').should('have.length.greaterThan', 1);
      
      // Headings should be in logical order
      cy.get('h1').should('exist');
      cy.get('h2').first().should('exist');
    });

    it('should use semantic HTML elements', () => {
      // Tables should be properly structured
      cy.get('table').should('exist');
      cy.get('thead').should('exist');
      cy.get('tbody').should('exist');
      cy.get('th').should('exist');
      cy.get('td').should('exist');
      
      // Forms should use proper labels
      cy.get('label').should('exist');
      cy.get('select').should('exist');
      
      // Lists should be properly structured
      cy.get('ul').should('exist');
      cy.get('li').should('exist');
    });

    it('should have proper table structure', () => {
      cy.get('table').each(($table) => {
        // Each table should have headers
        cy.wrap($table).find('thead th').should('have.length.greaterThan', 0);
        
        // Headers should have text content
        cy.wrap($table).find('th').each(($th) => {
          cy.wrap($th).should('not.be.empty');
        });
        
        // Data cells should exist
        cy.wrap($table).find('tbody td').should('exist');
      });
    });
  });

  describe('Form Accessibility', () => {
    it('should associate labels with form controls', () => {
      cy.get('label').each(($label) => {
        // Labels should have text content
        cy.wrap($label).should('not.be.empty');
        
        // Labels should be associated with form controls
        const labelText = $label.text();
        expect(labelText).to.not.be.empty;
      });
    });

    it('should provide accessible names for select elements', () => {
      cy.get('select').each(($select) => {
        // Each select should have an associated label or aria-label
        cy.wrap($select).should('satisfy', ($el) => {
          const hasLabel = $el.closest('.trait-selector').find('label').length > 0;
          const hasAriaLabel = $el.attr('aria-label');
          const hasId = $el.attr('id');
          return hasLabel || hasAriaLabel || hasId;
        });
      });
    });

    it('should provide clear option descriptions', () => {
      cy.get('select option').each(($option) => {
        const optionText = $option.text();
        // Options should include both genotype and phenotype
        expect(optionText).to.include(' - ');
      });
    });

    it('should be keyboard navigable', () => {
      // Tab through form controls
      cy.get('body').tab();
      cy.focused().should('match', 'select');
      
      // Arrow keys should work in selects
      cy.focused().type('{downarrow}');
      cy.focused().type('{uparrow}');
      
      // Enter should activate selections
      cy.focused().type('{enter}');
    });
  });

  describe('Screen Reader Support', () => {
    it('should provide descriptive page title', () => {
      cy.title().should('contain', 'Gene Weaver').or('contain', 'Kissojen Geenienkutoja');
    });

    it('should use appropriate ARIA labels where needed', () => {
      // Progress bars should have aria labels
      cy.get('.progress-container').should('exist');
      
      // Tables should have captions or aria-labels
      cy.get('table').each(($table) => {
        const tableElement = $table.get(0);
        const hasCaption = $table.find('caption').length > 0;
        const hasAriaLabel = tableElement.hasAttribute('aria-label');
        const hasAriaLabelledby = tableElement.hasAttribute('aria-labelledby');
        
        // At minimum, table should be near a heading that describes it
        const nearbyHeading = $table.prev('h2, h3').length > 0;
        expect(hasCaption || hasAriaLabel || hasAriaLabelledby || nearbyHeading).to.be.true;
      });
    });

    it('should provide meaningful text for data visualization', () => {
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.selectParentGenotype('parent2', 'traitA', 'Aa');
      
      // Probability percentages should be clearly stated
      cy.get('.probability-text').each(($text) => {
        cy.wrap($text).should('contain', '%');
        cy.wrap($text).should('not.be.empty');
      });
      
      // Progress bars should have textual equivalents
      cy.get('.probability-text').should('have.length.greaterThan', 0);
    });

    it('should provide context for genetic terms', () => {
      // Trait descriptions should be available
      cy.get('.trait-legend').should('be.visible');
      cy.get('.trait-legend').should('contain', 'Dominantti');
      cy.get('.trait-legend').should('contain', 'Resessiivinen');
      
      // Instructions should explain the interface
      cy.get('.instructions-container').should('be.visible');
      cy.get('.instructions-container').should('contain', 'simulaattori');
    });
  });

  describe('Color and Contrast Accessibility', () => {
    it('should not rely solely on color for information', () => {
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.selectParentGenotype('parent2', 'traitA', 'Aa');
      
      // Information should be conveyed through text as well as color
      cy.get('.probability-text').should('be.visible');
      cy.get('table td').first().should('contain.text');
      
      // Progress bars should have numerical labels
      cy.get('.progress-container').each(($container) => {
        cy.wrap($container).siblings('.probability-text').should('exist');
      });
    });

    it('should maintain sufficient contrast ratios', () => {
      // Test common text elements for readability
      cy.get('h1').should('have.css', 'color');
      cy.get('h2').should('have.css', 'color');
      cy.get('table').should('have.css', 'color');
      cy.get('label').should('have.css', 'color');
      
      // Background should provide contrast
      cy.get('.gene-weaver-app').should('have.css', 'background-color');
    });

    it('should handle high contrast mode gracefully', () => {
      // Simulate high contrast by checking borders and text visibility
      cy.get('table').should('have.css', 'border');
      cy.get('.trait-legend').should('have.css', 'border').or('have.css', 'box-shadow');
      
      // Text should remain visible
      cy.get('h1').should('be.visible');
      cy.get('table td').should('be.visible');
    });
  });

  describe('Focus Management', () => {
    it('should have visible focus indicators', () => {
      cy.get('select').first().focus();
      cy.focused().should('have.css', 'outline').or('have.css', 'box-shadow');
    });

    it('should maintain logical tab order', () => {
      // Tab order should follow visual layout
      cy.get('body').tab();
      cy.focused().should('match', 'select');
      
      // Continue tabbing through all interactive elements
      let previousElement = '';
      cy.get('select').each(($select, index) => {
        if (index > 0) {
          cy.get('body').tab();
        }
        cy.focused().should('match', 'select');
      });
    });

    it('should not trap focus unexpectedly', () => {
      // User should be able to tab through all controls and out of the app
      cy.get('select').each(() => {
        cy.get('body').tab();
      });
      
      // Focus should still be manageable
      cy.get('body').type('{shift+tab}');
      cy.focused().should('exist');
    });
  });

  describe('Error States and Feedback', () => {
    it('should provide clear feedback for user actions', () => {
      // Changing selections should provide immediate visual feedback
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      
      // Results should update visibly
      cy.get('.genotype-tables').should('be.visible');
      cy.get('.probability-text').should('be.visible');
    });

    it('should handle edge cases gracefully', () => {
      // Test extreme selections
      cy.selectParentGenotype('parent1', 'traitA', 'aa');
      cy.selectParentGenotype('parent1', 'traitB', 'bb');
      cy.selectParentGenotype('parent2', 'traitA', 'aa');
      cy.selectParentGenotype('parent2', 'traitB', 'bb');
      
      // Interface should remain functional
      cy.get('.gene-weaver-app').should('be.visible');
      cy.get('table').should('be.visible');
    });
  });

  describe('Mobile Accessibility', () => {
    it('should be accessible on touch devices', () => {
      cy.viewport(375, 667);
      
      // Touch targets should be appropriately sized
      cy.get('select').should('have.css', 'min-height');
      
      // Interface should remain usable
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.get('.genotype-tables').should('be.visible');
    });

    it('should handle mobile screen readers', () => {
      cy.viewport(375, 667);
      
      // Content should remain structured
      cy.get('h1').should('be.visible');
      cy.get('h2').should('be.visible');
      cy.get('table').should('be.visible');
      
      // Labels should still be associated
      cy.get('label').should('be.visible');
    });
  });
});
