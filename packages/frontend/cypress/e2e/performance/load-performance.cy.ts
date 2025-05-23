/// <reference types="cypress" />

describe('Gene Weaver - Performance Testing', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Page Load Performance', () => {
    it('should load the page within acceptable time limits', () => {
      cy.measurePerformance();
      
      // Page should be interactive quickly
      cy.get('h1').should('be.visible');
      cy.get('.parent-column select').should('be.visible');
      
      // Measure time to interactive
      cy.window().then((win) => {
        const navigationTiming = win.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const loadComplete = navigationTiming.loadEventEnd - navigationTiming.loadEventStart;
        expect(loadComplete).to.be.lessThan(2000); // Should complete loading in under 2 seconds
      });
    });

    it('should have minimal layout shifts during load', () => {
      // Check that major elements are positioned correctly from the start
      cy.get('.gene-weaver-app').should('be.visible');
      cy.get('.parents-container').should('be.visible');
      cy.get('.genotype-tables').should('be.visible');
      
      // Wait for any potential layout shifts
      cy.wait(1000);
      
      // Elements should still be in the same positions
      cy.get('.gene-weaver-app').should('be.visible');
      cy.get('.parents-container').should('be.visible');
    });

    it('should load CSS and styling efficiently', () => {
      // Check that styling is applied correctly
      cy.get('.gene-weaver-app').should('have.css', 'background-color');
      cy.get('h1').should('have.css', 'font-size');
      cy.get('table').should('have.css', 'border');
      
      // Check for FOUC (Flash of Unstyled Content)
      cy.get('.trait-legends').should('have.css', 'display', 'flex');
    });

    it('should handle resource loading efficiently', () => {
      cy.window().then((win) => {
        const resources = win.performance.getEntriesByType('resource');
        
        // Check for efficient resource loading
        resources.forEach((resource: any) => {
          // No resource should take excessively long
          expect(resource.duration).to.be.lessThan(5000);
          
          // Check for successful loading (no 404s, etc.)
          if (resource.responseStatus) {
            expect(resource.responseStatus).to.be.lessThan(400);
          }
        });
      });
    });
  });

  describe('Interaction Performance', () => {
    it('should respond quickly to genotype selection changes', () => {
      const startTime = Date.now();
      
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      
      // Results should update quickly
      cy.get('.genotype-tables .probability-text').should('be.visible').then(() => {
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        expect(responseTime).to.be.lessThan(500); // Should respond in under 500ms
      });
    });

    it('should handle rapid selection changes efficiently', () => {
      const selections = ['AA', 'Aa', 'aa', 'AA', 'Aa'];
      
      const startTime = Date.now();
      
      selections.forEach((selection, index) => {
        cy.selectParentGenotype('parent1', 'traitA', selection);
        if (index < selections.length - 1) {
          cy.wait(50); // Small delay between selections
        }
      });
      
      cy.get('.genotype-tables .probability-text').should('be.visible').then(() => {
        const endTime = Date.now();
        const totalTime = endTime - startTime;
        expect(totalTime).to.be.lessThan(2000); // All changes should complete in under 2 seconds
      });
    });

    it('should calculate complex crosses efficiently', () => {
      const startTime = Date.now();
      
      // Set up complex dihybrid cross
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.selectParentGenotype('parent1', 'traitB', 'Bb');
      cy.selectParentGenotype('parent2', 'traitA', 'Aa');
      cy.selectParentGenotype('parent2', 'traitB', 'Bb');
      
      // All results should be calculated and displayed
      cy.get('.combined-phenotypes .probability-text').should('be.visible').then(() => {
        const endTime = Date.now();
        const calculationTime = endTime - startTime;
        expect(calculationTime).to.be.lessThan(1000); // Complex calculations should complete in under 1 second
      });
    });

    it('should maintain performance across multiple interactions', () => {
      // Perform many interactions to test for memory leaks or performance degradation
      const testCases = [
        { p1a: 'AA', p1b: 'BB', p2a: 'AA', p2b: 'BB' },
        { p1a: 'Aa', p1b: 'Bb', p2a: 'Aa', p2b: 'Bb' },
        { p1a: 'aa', p1b: 'bb', p2a: 'AA', p2b: 'BB' },
        { p1a: 'AA', p1b: 'bb', p2a: 'aa', p2b: 'BB' },
        { p1a: 'Aa', p1b: 'BB', p2a: 'aa', p2b: 'Bb' },
      ];
      
      testCases.forEach((testCase) => {
        const iterationStart = Date.now();
        
        cy.selectParentGenotype('parent1', 'traitA', testCase.p1a);
        cy.selectParentGenotype('parent1', 'traitB', testCase.p1b);
        cy.selectParentGenotype('parent2', 'traitA', testCase.p2a);
        cy.selectParentGenotype('parent2', 'traitB', testCase.p2b);
        
        cy.get('.combined-phenotypes .probability-text').should('be.visible').then(() => {
          const iterationEnd = Date.now();
          const iterationTime = iterationEnd - iterationStart;
          expect(iterationTime).to.be.lessThan(1000); // Each iteration should complete quickly
        });
      });
    });
  });

  describe('Memory Usage and Resource Management', () => {
    it('should not cause memory leaks during extended use', () => {
      // Perform many operations to test for memory leaks
      for (let i = 0; i < 10; i++) {
        cy.selectParentGenotype('parent1', 'traitA', i % 2 === 0 ? 'AA' : 'Aa');
        cy.selectParentGenotype('parent2', 'traitA', i % 2 === 0 ? 'aa' : 'Aa');
        cy.wait(100);
      }
      
      // Check that the application is still responsive
      cy.get('.genotype-tables').should('be.visible');
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.get('.probability-text').should('be.visible');
    });

    it('should handle DOM updates efficiently', () => {
      // Count DOM elements before interactions
      cy.get('*').then(($elements) => {
        const initialCount = $elements.length;
        
        // Perform many selection changes
        cy.selectParentGenotype('parent1', 'traitA', 'Aa');
        cy.selectParentGenotype('parent2', 'traitA', 'Aa');
        cy.selectParentGenotype('parent1', 'traitB', 'Bb');
        cy.selectParentGenotype('parent2', 'traitB', 'Bb');
        
        // DOM element count should not grow excessively
        cy.get('*').then(($newElements) => {
          const finalCount = $newElements.length;
          expect(finalCount).to.be.lessThan(initialCount * 1.1); // Should not grow by more than 10%
        });
      });
    });

    it('should render large result sets efficiently', () => {
      // Set up the most complex scenario (Aa × Aa for both traits)
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.selectParentGenotype('parent1', 'traitB', 'Bb');
      cy.selectParentGenotype('parent2', 'traitA', 'Aa');
      cy.selectParentGenotype('parent2', 'traitB', 'Bb');
      
      const startTime = Date.now();
      
      // All result tables should render
      cy.get('.genotype-tables tbody tr').should('have.length.greaterThan', 0);
      cy.get('.phenotype-tables tbody tr').should('have.length.greaterThan', 0);
      cy.get('.combined-phenotypes tbody tr').should('have.length', 4);
      
      cy.get('.combined-phenotypes .probability-text').should('be.visible').then(() => {
        const renderTime = Date.now() - startTime;
        expect(renderTime).to.be.lessThan(1000); // Complex rendering should complete quickly
      });
    });
  });

  describe('Viewport and Scaling Performance', () => {
    it('should perform well on different screen sizes', () => {
      const viewports = [
        { width: 1920, height: 1080 },
        { width: 1280, height: 720 },
        { width: 768, height: 1024 },
        { width: 375, height: 667 },
      ];
      
      viewports.forEach((viewport) => {
        cy.viewport(viewport.width, viewport.height);
        
        const startTime = Date.now();
        
        cy.selectParentGenotype('parent1', 'traitA', 'Aa');
        cy.selectParentGenotype('parent2', 'traitA', 'Aa');
        
        cy.get('.genotype-tables').should('be.visible').then(() => {
          const responseTime = Date.now() - startTime;
          expect(responseTime).to.be.lessThan(1000); // Should be responsive on all screen sizes
        });
      });
    });

    it('should handle zoom levels efficiently', () => {
      // Test different zoom levels
      [0.5, 0.75, 1.0, 1.25, 1.5].forEach((zoom) => {
        cy.get('body').invoke('css', 'zoom', zoom.toString());
        
        // Interface should remain functional
        cy.get('.gene-weaver-app').should('be.visible');
        cy.selectParentGenotype('parent1', 'traitA', 'Aa');
        cy.get('.genotype-tables').should('be.visible');
      });
      
      // Reset zoom
      cy.get('body').invoke('css', 'zoom', '1');
    });
  });

  describe('Browser Performance Metrics', () => {
    it('should maintain good Lighthouse performance scores', () => {
      // Basic performance checks that align with Lighthouse metrics
      cy.window().then((win) => {
        const timing = win.performance.timing;
        
        // First Contentful Paint should be fast
        const fcp = timing.domContentLoadedEventEnd - timing.navigationStart;
        expect(fcp).to.be.lessThan(3000);
        
        // Time to Interactive should be reasonable
        const tti = timing.loadEventEnd - timing.navigationStart;
        expect(tti).to.be.lessThan(5000);
      });
    });

    it('should have minimal blocking resources', () => {
      cy.window().then((win) => {
        const resources = win.performance.getEntriesByType('resource');
        
        // Check for render-blocking resources
        resources.forEach((resource: any) => {
          if (resource.name.includes('.css') || resource.name.includes('.js')) {
            expect(resource.duration).to.be.lessThan(2000); // Critical resources should load quickly
          }
        });
      });
    });

    it('should efficiently handle paint and layout operations', () => {
      // Trigger operations that might cause layout thrashing
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.selectParentGenotype('parent1', 'traitB', 'Bb');
      cy.selectParentGenotype('parent2', 'traitA', 'Aa');
      cy.selectParentGenotype('parent2', 'traitB', 'Bb');
      
      // Check that the page remains responsive
      cy.get('.combined-phenotypes').scrollIntoView();
      cy.get('.genotype-tables').scrollIntoView();
      
      // Interface should remain smooth
      cy.get('.probability-text').should('be.visible');
    });
  });
});
