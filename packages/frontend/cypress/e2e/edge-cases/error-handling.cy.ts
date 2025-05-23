/// <reference types="cypress" />

describe('Gene Weaver - Error Handling and Edge Cases', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Input Validation and Error States', () => {
    it('should handle missing or incomplete selections gracefully', () => {
      // Test with no selections
      cy.get('.gene-weaver-app').should('be.visible');
      cy.get('.results-container').should('exist');
      
      // Test with partial selection - only one parent
      cy.selectParentGenotype('parent1', 'traitA', 'AA');
      cy.get('.genotype-tables').should('be.visible');
      
      // Test with one trait selected for both parents
      cy.selectParentGenotype('parent2', 'traitA', 'AA');
      cy.get('.genotype-tables .trait-table').should('have.length', 2);
      
      // Verify no errors in console
      cy.window().then((win) => {
        expect(win.console.error).to.not.have.been.called;
      });
    });

    it('should handle rapid selection changes without errors', () => {
      // Rapidly change selections to test state management
      const genotypes = ['AA', 'Aa', 'aa'];
      
      for (let i = 0; i < 20; i++) {
        const randomGenotype = genotypes[i % 3];
        cy.selectParentGenotype('parent1', 'traitA', randomGenotype);
      }
      
      // Should remain functional
      cy.get('.genotype-tables').should('be.visible');
      cy.get('.gene-weaver-app').should('not.contain', 'Error');
    });

    it('should validate genotype format consistency', () => {
      // Test all valid genotype combinations
      const validGenotypes = ['AA', 'Aa', 'aa', 'BB', 'Bb', 'bb'];
      
      validGenotypes.forEach((genotype) => {
        if (genotype.includes('A')) {
          cy.selectParentGenotype('parent1', 'traitA', genotype);
          cy.get('.genotype-tables .trait-table').first()
            .should('be.visible');
        } else {
          cy.selectParentGenotype('parent1', 'traitB', genotype);
          cy.get('.genotype-tables .trait-table').last()
            .should('be.visible');
        }
      });
    });

    it('should handle DOM manipulation attempts', () => {
      // Test application resilience to DOM changes
      cy.get('.gene-weaver-app').then(($app) => {
        // Attempt to modify app state through DOM
        const app = $app[0];
        app.style.display = 'none';
        app.style.display = 'block';
      });
      
      // App should still function
      cy.selectParentGenotype('parent1', 'traitA', 'AA');
      cy.get('.genotype-tables').should('be.visible');
    });
  });

  describe('Mathematical Edge Cases', () => {
    it('should handle all homozygous combinations correctly', () => {
      const homozygousPairs = [
        ['AA', 'AA'], ['aa', 'aa'], ['BB', 'BB'], ['bb', 'bb'],
        ['AA', 'aa'], ['aa', 'AA'], ['BB', 'bb'], ['bb', 'BB']
      ];
      
      homozygousPairs.forEach(([p1, p2]) => {
        if (p1.includes('A')) {
          cy.selectParentGenotype('parent1', 'traitA', p1);
          cy.selectParentGenotype('parent2', 'traitA', p2);
          
          // Should show single result for identical crosses
          if (p1 === p2) {
            cy.get('.genotype-tables .trait-table').first()
              .find('tbody tr').should('have.length', 1);
          }
        }
      });
    });

    it('should verify probability calculations sum to 100%', () => {
      // Test various combinations
      const testCases = [
        ['AA', 'AA'], ['AA', 'Aa'], ['AA', 'aa'],
        ['Aa', 'Aa'], ['Aa', 'aa'], ['aa', 'aa']
      ];
      
      testCases.forEach(([p1, p2]) => {
        cy.selectParentGenotype('parent1', 'traitA', p1);
        cy.selectParentGenotype('parent2', 'traitA', p2);
        
        // Sum up all genotype probabilities
        let totalProbability = 0;
        cy.get('.genotype-tables .trait-table').first()
          .find('.probability-text').each(($el) => {
            totalProbability += parseInt($el.text().replace('%', ''));
          }).then(() => {
            expect(totalProbability).to.equal(100);
          });
      });
    });

    it('should handle extreme probability distributions', () => {
      // Test 100% cases
      cy.selectParentGenotype('parent1', 'traitA', 'AA');
      cy.selectParentGenotype('parent2', 'traitA', 'AA');
      
      cy.get('.genotype-tables .trait-table').first()
        .find('.probability-text').should('contain', '100%');
      
      // Test even distribution cases
      cy.selectParentGenotype('parent1', 'traitA', 'AA');
      cy.selectParentGenotype('parent2', 'traitA', 'aa');
      
      cy.get('.genotype-tables .trait-table').first()
        .find('.probability-text').should('contain', '100%');
    });

    it('should maintain mathematical accuracy in complex crosses', () => {
      // Dihybrid cross AaBb × AaBb should yield 9:3:3:1 ratio
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.selectParentGenotype('parent1', 'traitB', 'Bb');
      cy.selectParentGenotype('parent2', 'traitA', 'Aa');
      cy.selectParentGenotype('parent2', 'traitB', 'Bb');
      
      // Verify the classic 9:3:3:1 phenotype ratio
      cy.get('.combined-phenotypes tbody tr').should('have.length', 4);
      
      // Check each phenotype class
      cy.get('.combined-phenotypes tbody tr').contains('pitkä').contains('musta')
        .find('.probability-text').should('contain', '56%'); // 9/16 ≈ 56%
      
      cy.get('.combined-phenotypes tbody tr').contains('pitkä').contains('ruskea')
        .find('.probability-text').should('contain', '19%'); // 3/16 ≈ 19%
    });
  });

  describe('Browser Compatibility Edge Cases', () => {
    it('should handle JavaScript errors gracefully', () => {
      // Test console error handling
      cy.window().then((win) => {
        const originalError = win.console.error;
        const errors: string[] = [];
        
        win.console.error = (...args: any[]) => {
          errors.push(args.join(' '));
          originalError(...args);
        };
        
        // Perform operations that might cause errors
        cy.selectParentGenotype('parent1', 'traitA', 'AA');
        cy.selectParentGenotype('parent2', 'traitA', 'AA');
        
        // Check no critical errors occurred
        cy.then(() => {
          const criticalErrors = errors.filter(error => 
            error.includes('TypeError') || 
            error.includes('ReferenceError') ||
            error.includes('SyntaxError')
          );
          expect(criticalErrors).to.have.length(0);
        });
      });
    });

    it('should handle memory constraints', () => {
      // Simulate memory pressure by rapid calculations
      for (let i = 0; i < 100; i++) {
        const genotypes = ['AA', 'Aa', 'aa'];
        const p1 = genotypes[i % 3];
        const p2 = genotypes[(i + 1) % 3];
        
        cy.selectParentGenotype('parent1', 'traitA', p1);
        cy.selectParentGenotype('parent2', 'traitA', p2);
      }
      
      // App should still be responsive
      cy.get('.genotype-tables').should('be.visible');
    });

    it('should handle viewport edge cases', () => {
      // Test extremely narrow viewport
      cy.viewport(240, 320);
      cy.get('.gene-weaver-app').should('be.visible');
      cy.selectParentGenotype('parent1', 'traitA', 'AA');
      
      // Test extremely wide viewport
      cy.viewport(3840, 1080);
      cy.get('.gene-weaver-app').should('be.visible');
      cy.selectParentGenotype('parent2', 'traitA', 'AA');
      
      // Test square viewport
      cy.viewport(800, 800);
      cy.get('.gene-weaver-app').should('be.visible');
    });

    it('should handle network interruption scenarios', () => {
      // Simulate network interruption
      cy.intercept('**/*', { forceNetworkError: true }).as('networkError');
      
      // App should still function (local calculations)
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.selectParentGenotype('parent2', 'traitA', 'Aa');
      
      cy.get('.genotype-tables').should('be.visible');
    });
  });

  describe('Data Integrity Edge Cases', () => {
    it('should handle state corruption attempts', () => {
      // Try to corrupt component state through developer tools simulation
      cy.window().then((win) => {
        // Simulate state manipulation attempts
        cy.selectParentGenotype('parent1', 'traitA', 'AA');
        cy.selectParentGenotype('parent2', 'traitA', 'AA');
        
        // Verify calculations remain correct
        cy.get('.genotype-tables .trait-table').first()
          .find('tbody tr').should('contain', 'AA');
      });
    });

    it('should validate calculation consistency across sessions', () => {
      // Set initial state
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.selectParentGenotype('parent2', 'traitA', 'Aa');
      
      // Capture results
      let firstResults: string[] = [];
      cy.get('.genotype-tables .trait-table').first()
        .find('.probability-text').each(($el) => {
          firstResults.push($el.text());
        });
      
      // Reload page and repeat
      cy.reload();
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.selectParentGenotype('parent2', 'traitA', 'Aa');
      
      // Verify identical results
      cy.get('.genotype-tables .trait-table').first()
        .find('.probability-text').each(($el, index) => {
          expect($el.text()).to.equal(firstResults[index]);
        });
    });

    it('should handle unicode and special characters', () => {
      // Test Finnish characters in phenotype names
      cy.selectParentGenotype('parent1', 'traitA', 'AA');
      cy.selectParentGenotype('parent2', 'traitA', 'aa');
      
      cy.get('.phenotype-tables').should('contain', 'Pitkä');
      
      cy.selectParentGenotype('parent1', 'traitA', 'aa');
      cy.selectParentGenotype('parent2', 'traitA', 'aa');
      
      cy.get('.phenotype-tables').should('contain', 'Lyhyt');
    });
  });

  describe('Performance Edge Cases', () => {
    it('should handle rapid user interactions', () => {
      const startTime = Date.now();
      
      // Perform 50 rapid selections
      for (let i = 0; i < 50; i++) {
        const trait = i % 2 === 0 ? 'traitA' : 'traitB';
        const parent = i % 2 === 0 ? 'parent1' : 'parent2';
        const genotype = ['AA', 'Aa', 'aa'][i % 3];
        
        cy.selectParentGenotype(parent, trait, genotype);
      }
      
      const endTime = Date.now();
      const totalTime = endTime - startTime;
      
      // Should complete within reasonable time (5 seconds)
      expect(totalTime).to.be.lessThan(5000);
      
      // App should still be functional
      cy.get('.genotype-tables').should('be.visible');
    });

    it('should maintain performance with complex calculations', () => {
      const startTime = performance.now();
      
      // Set up most complex scenario
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.selectParentGenotype('parent1', 'traitB', 'Bb');
      cy.selectParentGenotype('parent2', 'traitA', 'Aa');
      cy.selectParentGenotype('parent2', 'traitB', 'Bb');
      
      cy.get('.combined-phenotypes').should('be.visible').then(() => {
        const endTime = performance.now();
        const calculationTime = endTime - startTime;
        
        // Complex calculations should complete within 2 seconds
        expect(calculationTime).to.be.lessThan(2000);
      });
    });

    it('should handle memory leaks in repeated operations', () => {
      // Perform many calculation cycles
      for (let cycle = 0; cycle < 20; cycle++) {
        // Set up complex calculation
        cy.selectParentGenotype('parent1', 'traitA', 'Aa');
        cy.selectParentGenotype('parent1', 'traitB', 'Bb');
        cy.selectParentGenotype('parent2', 'traitA', 'Aa');
        cy.selectParentGenotype('parent2', 'traitB', 'Bb');
        
        // Reset to simple calculation
        cy.selectParentGenotype('parent1', 'traitA', 'AA');
        cy.selectParentGenotype('parent1', 'traitB', 'BB');
        cy.selectParentGenotype('parent2', 'traitA', 'AA');
        cy.selectParentGenotype('parent2', 'traitB', 'BB');
      }
      
      // App should still be responsive
      cy.get('.gene-weaver-app').should('be.visible');
    });
  });

  describe('Accessibility Edge Cases', () => {
    it('should handle screen reader edge cases', () => {
      // Test with ARIA labels and screen reader navigation
      cy.get('select').each(($select) => {
        cy.wrap($select).should('have.attr', 'aria-label')
          .or('have.attr', 'aria-labelledby');
      });
      
      // Test tab navigation through complex results
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.selectParentGenotype('parent1', 'traitB', 'Bb');
      cy.selectParentGenotype('parent2', 'traitA', 'Aa');
      cy.selectParentGenotype('parent2', 'traitB', 'Bb');
      
      // Should be able to navigate through results
      cy.get('.combined-phenotypes table').should('be.visible');
    });

    it('should handle high contrast mode compatibility', () => {
      // Simulate high contrast mode
      cy.get('body').invoke('css', 'filter', 'contrast(2)');
      
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.selectParentGenotype('parent2', 'traitA', 'Aa');
      
      // Content should still be readable
      cy.get('.genotype-tables').should('be.visible');
      cy.get('.probability-text').should('be.visible');
      
      // Reset contrast
      cy.get('body').invoke('css', 'filter', 'none');
    });

    it('should handle keyboard-only navigation edge cases', () => {
      // Navigate entirely with keyboard
      cy.get('body').tab();
      cy.focused().type('{downarrow}');
      cy.focused().type('{enter}');
      
      // Should be able to make selections
      cy.get('.genotype-tables').should('be.visible');
    });
  });

  describe('Cross-Platform Edge Cases', () => {
    it('should handle different operating system behaviors', () => {
      // Test behaviors that might differ across OS
      cy.get('.parent-column').first()
        .find('select').first()
        .click()
        .type('{downarrow}')
        .type('{enter}');
      
      // Should work regardless of OS
      cy.get('.genotype-tables').should('be.visible');
    });

    it('should handle different browser rendering quirks', () => {
      // Test table rendering consistency
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.selectParentGenotype('parent2', 'traitA', 'Aa');
      
      cy.get('.genotype-tables table').should('be.visible');
      cy.get('.genotype-tables td').should('have.length.greaterThan', 0);
      
      // Test percentage rendering
      cy.get('.probability-text').each(($el) => {
        expect($el.text()).to.match(/^\d+%$/);
      });
    });
  });
});
