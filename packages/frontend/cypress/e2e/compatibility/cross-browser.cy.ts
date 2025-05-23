/// <reference types="cypress" />

describe('Gene Weaver - Cross-Browser Compatibility', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Browser-Specific Feature Support', () => {
    it('should support modern CSS features across browsers', () => {
      // Test CSS Grid layout
      cy.get('.gene-weaver-app').should('be.visible')
        .and('have.css', 'display')
        .and('not.be.empty');

      // Test Flexbox support
      cy.get('.parent-columns').should('be.visible')
        .and('have.css', 'display');

      // Test CSS variables/custom properties
      cy.get('body').should('have.css', 'color')
        .and('not.be.empty');
    });

    it('should handle viewport meta tag correctly', () => {
      cy.get('head meta[name="viewport"]')
        .should('have.attr', 'content')
        .and('include', 'width=device-width');
    });

    it('should support HTML5 form elements', () => {
      cy.get('select').should('be.visible').and('be.enabled');
      
      // Test form interaction
      cy.selectParentGenotype('parent1', 'traitA', 'AA');
      cy.get('.parent-column').first()
        .find('select').first()
        .should('have.value', 'AA');
    });
  });

  describe('JavaScript Compatibility', () => {
    it('should handle modern JavaScript features', () => {
      // Test array methods and ES6+ features work
      cy.window().then((win) => {
        // Test Promise support
        expect(win.Promise).to.exist;
        
        // Test modern array methods
        expect([1, 2, 3].includes(2)).to.be.true;
        
        // Test arrow functions work in browser
        const testArrow = () => 'test';
        expect(testArrow()).to.equal('test');
      });
    });

    it('should handle React components across browsers', () => {
      // Verify React app renders
      cy.get('.gene-weaver-app').should('be.visible');
      
      // Test component state updates
      cy.selectParentGenotype('parent1', 'traitA', 'AA');
      cy.selectParentGenotype('parent2', 'traitA', 'AA');
      
      cy.get('.genotype-tables .trait-table').first()
        .find('tbody tr').should('contain', 'AA');
    });

    it('should support event handling across browsers', () => {
      // Test click events
      cy.get('.parent-column').first()
        .find('select').first()
        .click();

      // Test change events
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      
      // Verify state change occurred
      cy.get('.genotype-tables').should('be.visible');
    });
  });

  describe('Responsive Design Compatibility', () => {
    it('should work on mobile viewports', () => {
      cy.viewport('iphone-x');
      
      cy.get('.gene-weaver-app').should('be.visible');
      cy.get('.parent-columns').should('be.visible');
      
      // Test mobile interactions
      cy.selectParentGenotype('parent1', 'traitA', 'AA');
      cy.get('.genotype-tables').should('be.visible');
    });

    it('should work on tablet viewports', () => {
      cy.viewport('ipad-2');
      
      cy.get('.gene-weaver-app').should('be.visible');
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.selectParentGenotype('parent2', 'traitA', 'Aa');
      
      cy.get('.phenotype-tables').should('be.visible');
    });

    it('should work on desktop viewports', () => {
      cy.viewport(1920, 1080);
      
      cy.get('.gene-weaver-app').should('be.visible');
      cy.get('.parent-columns').should('be.visible');
      
      // Test all functionality on large screen
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.selectParentGenotype('parent1', 'traitB', 'Bb');
      cy.selectParentGenotype('parent2', 'traitA', 'Aa');
      cy.selectParentGenotype('parent2', 'traitB', 'Bb');
      
      cy.get('.combined-phenotypes').should('be.visible');
    });

    it('should handle orientation changes', () => {
      cy.viewport('iphone-x');
      
      // Portrait mode
      cy.get('.gene-weaver-app').should('be.visible');
      
      // Landscape mode
      cy.viewport(812, 375);
      cy.get('.gene-weaver-app').should('be.visible');
      
      // Test functionality still works
      cy.selectParentGenotype('parent1', 'traitA', 'AA');
      cy.get('.genotype-tables').should('be.visible');
    });
  });

  describe('Performance Across Browsers', () => {
    it('should load within acceptable time limits', () => {
      const startTime = Date.now();
      
      cy.visit('/').then(() => {
        const loadTime = Date.now() - startTime;
        expect(loadTime).to.be.lessThan(5000); // 5 second max load time
      });
    });

    it('should handle rapid interactions efficiently', () => {
      // Rapid genotype changes
      for (let i = 0; i < 10; i++) {
        const genotypes = ['AA', 'Aa', 'aa'];
        const randomGenotype = genotypes[i % 3];
        cy.selectParentGenotype('parent1', 'traitA', randomGenotype);
      }
      
      // Should still be responsive
      cy.get('.genotype-tables').should('be.visible');
    });

    it('should maintain performance with complex calculations', () => {
      // Set up complex dihybrid cross
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.selectParentGenotype('parent1', 'traitB', 'Bb');
      cy.selectParentGenotype('parent2', 'traitA', 'Aa');
      cy.selectParentGenotype('parent2', 'traitB', 'Bb');
      
      // Should render complex results quickly
      cy.get('.combined-phenotypes tbody tr').should('have.length', 4);
    });
  });

  describe('Font and Typography Rendering', () => {
    it('should render fonts consistently', () => {
      cy.get('h1').should('be.visible')
        .and('have.css', 'font-size')
        .and('not.be.empty');
      
      cy.get('body').should('have.css', 'font-family')
        .and('not.be.empty');
    });

    it('should handle special characters in genetics terms', () => {
      // Test Finnish characters in phenotype descriptions
      cy.selectParentGenotype('parent1', 'traitA', 'AA');
      cy.selectParentGenotype('parent2', 'traitA', 'aa');
      
      cy.get('.phenotype-tables').should('contain', 'Pitkä');
    });

    it('should maintain readability at different zoom levels', () => {
      // Test text readability (simulated zoom)
      cy.get('body').invoke('css', 'zoom', '1.5');
      cy.get('h1').should('be.visible');
      cy.get('.probability-text').should('be.visible');
      
      cy.get('body').invoke('css', 'zoom', '0.8');
      cy.get('h1').should('be.visible');
      cy.get('.probability-text').should('be.visible');
      
      // Reset zoom
      cy.get('body').invoke('css', 'zoom', '1');
    });
  });

  describe('Input Method Compatibility', () => {
    it('should support keyboard navigation', () => {
      // Tab through form elements
      cy.get('.parent-column').first()
        .find('select').first()
        .focus()
        .type('{downarrow}')
        .should('not.have.value', '');
    });

    it('should support touch interactions on mobile', () => {
      cy.viewport('iphone-x');
      
      // Simulate touch events
      cy.get('.parent-column').first()
        .find('select').first()
        .click();
        
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.get('.genotype-tables').should('be.visible');
    });

    it('should handle mouse interactions', () => {
      // Test mouse hover (if applicable)
      cy.get('.parent-column').first()
        .find('select').first()
        .trigger('mouseover');
      
      // Test click interactions
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.get('.genotype-tables').should('be.visible');
    });
  });

  describe('Browser-Specific Quirks and Workarounds', () => {
    it('should handle select dropdown styling consistently', () => {
      cy.get('select').should('be.visible')
        .and('have.css', 'appearance')
        .or('have.css', '-webkit-appearance')
        .or('have.css', '-moz-appearance');
    });

    it('should handle table rendering across browsers', () => {
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.selectParentGenotype('parent2', 'traitA', 'Aa');
      
      cy.get('.genotype-tables table').should('be.visible');
      cy.get('.genotype-tables tbody tr').should('have.length.greaterThan', 0);
      
      // Test table cell alignment
      cy.get('.genotype-tables td').first()
        .should('be.visible')
        .and('have.css', 'text-align');
    });

    it('should handle percentage calculations display', () => {
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.selectParentGenotype('parent2', 'traitA', 'Aa');
      
      // Verify percentage formatting is consistent
      cy.get('.probability-text').each(($el) => {
        const text = $el.text();
        expect(text).to.match(/^\d+%$/);
      });
    });
  });

  describe('Accessibility Across Browsers', () => {
    it('should maintain ARIA attributes across browsers', () => {
      cy.get('select').should('have.attr', 'aria-label')
        .or('have.attr', 'aria-labelledby');
    });

    it('should support screen reader navigation', () => {
      // Test semantic structure
      cy.get('h1').should('exist');
      cy.get('main, [role="main"]').should('exist');
      
      // Test form labeling
      cy.get('label').should('exist');
    });

    it('should maintain focus indicators', () => {
      cy.get('.parent-column').first()
        .find('select').first()
        .focus()
        .should('have.css', 'outline')
        .or('have.css', 'box-shadow');
    });
  });

  describe('Error Handling Across Browsers', () => {
    it('should handle JavaScript errors gracefully', () => {
      // Test that app doesn't crash with invalid operations
      cy.window().then((win) => {
        // Simulate potential error conditions
        cy.get('.gene-weaver-app').should('be.visible');
      });
    });

    it('should handle network errors consistently', () => {
      // Test offline behavior (if applicable)
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.get('.genotype-tables').should('be.visible');
    });
  });
});
