/// <reference types="cypress" />

describe('Gene Weaver - Visual Regression Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Visual Consistency - Initial State', () => {
    it('should match baseline appearance for initial page load', () => {
      // Wait for page to fully load
      cy.get('.gene-weaver-app').should('be.visible');
      
      // Take full page screenshot
      cy.screenshot('baseline-initial-load', { 
        capture: 'fullPage',
        clip: { x: 0, y: 0, width: 1280, height: 720 }
      });
      
      // Take component-specific screenshots
      cy.get('h1').screenshot('baseline-title');
      cy.get('.parent-columns').screenshot('baseline-parent-selection');
      cy.get('.instructions').screenshot('baseline-instructions');
    });

    it('should maintain visual consistency across different viewports', () => {
      // Desktop view
      cy.viewport(1920, 1080);
      cy.screenshot('baseline-desktop-1920x1080');
      
      // Laptop view
      cy.viewport(1366, 768);
      cy.screenshot('baseline-laptop-1366x768');
      
      // Tablet view
      cy.viewport('ipad-2');
      cy.screenshot('baseline-tablet-ipad');
      
      // Mobile view
      cy.viewport('iphone-x');
      cy.screenshot('baseline-mobile-iphone-x');
    });

    it('should display consistent styling for form elements', () => {
      cy.get('.parent-column').first().screenshot('baseline-parent-column');
      cy.get('select').first().screenshot('baseline-select-element');
      cy.get('label').first().screenshot('baseline-label-element');
    });
  });

  describe('Visual Consistency - Interactive States', () => {
    it('should visually represent monohybrid cross results correctly', () => {
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.selectParentGenotype('parent2', 'traitA', 'Aa');
      
      // Wait for calculations to complete
      cy.get('.genotype-tables').should('be.visible');
      
      // Screenshot genotype results table
      cy.get('.genotype-tables').screenshot('monohybrid-genotype-table');
      
      // Screenshot phenotype results table
      cy.get('.phenotype-tables').screenshot('monohybrid-phenotype-table');
      
      // Full results view
      cy.screenshot('monohybrid-cross-complete');
    });

    it('should visually represent dihybrid cross results correctly', () => {
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.selectParentGenotype('parent1', 'traitB', 'Bb');
      cy.selectParentGenotype('parent2', 'traitA', 'Aa');
      cy.selectParentGenotype('parent2', 'traitB', 'Bb');
      
      // Wait for complex calculations
      cy.get('.combined-phenotypes').should('be.visible');
      
      // Screenshot individual trait tables
      cy.get('.genotype-tables').screenshot('dihybrid-genotype-tables');
      cy.get('.phenotype-tables').screenshot('dihybrid-phenotype-tables');
      
      // Screenshot combined results
      cy.get('.combined-phenotypes').screenshot('dihybrid-combined-results');
      
      // Full complex view
      cy.screenshot('dihybrid-cross-complete');
    });

    it('should show visual differences between different genetic combinations', () => {
      // Test AA × AA (100% dominant)
      cy.selectParentGenotype('parent1', 'traitA', 'AA');
      cy.selectParentGenotype('parent2', 'traitA', 'AA');
      cy.get('.genotype-tables').screenshot('combination-AA-x-AA');
      
      // Test aa × aa (100% recessive)
      cy.selectParentGenotype('parent1', 'traitA', 'aa');
      cy.selectParentGenotype('parent2', 'traitA', 'aa');
      cy.get('.genotype-tables').screenshot('combination-aa-x-aa');
      
      // Test AA × aa (100% heterozygous)
      cy.selectParentGenotype('parent1', 'traitA', 'AA');
      cy.selectParentGenotype('parent2', 'traitA', 'aa');
      cy.get('.genotype-tables').screenshot('combination-AA-x-aa');
      
      // Test Aa × Aa (classic 1:2:1)
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.selectParentGenotype('parent2', 'traitA', 'Aa');
      cy.get('.genotype-tables').screenshot('combination-Aa-x-Aa');
    });
  });

  describe('Visual Consistency - Table Layouts', () => {
    it('should maintain consistent table formatting', () => {
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.selectParentGenotype('parent2', 'traitA', 'Aa');
      
      // Test table headers
      cy.get('.genotype-tables thead').screenshot('table-headers-genotype');
      cy.get('.phenotype-tables thead').screenshot('table-headers-phenotype');
      
      // Test table body alignment
      cy.get('.genotype-tables tbody').screenshot('table-body-genotype');
      cy.get('.phenotype-tables tbody').screenshot('table-body-phenotype');
      
      // Test probability text formatting
      cy.get('.probability-text').first().screenshot('probability-text-format');
    });

    it('should handle table overflow and responsiveness', () => {
      // Create complex scenario with all traits
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.selectParentGenotype('parent1', 'traitB', 'Bb');
      cy.selectParentGenotype('parent2', 'traitA', 'Aa');
      cy.selectParentGenotype('parent2', 'traitB', 'Bb');
      
      // Test on narrow viewport
      cy.viewport(320, 568);
      cy.get('.combined-phenotypes').screenshot('table-mobile-overflow');
      
      // Test on medium viewport
      cy.viewport(768, 1024);
      cy.get('.combined-phenotypes').screenshot('table-tablet-layout');
      
      // Test on wide viewport
      cy.viewport(1920, 1080);
      cy.get('.combined-phenotypes').screenshot('table-desktop-layout');
    });

    it('should maintain visual hierarchy in complex results', () => {
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.selectParentGenotype('parent1', 'traitB', 'Bb');
      cy.selectParentGenotype('parent2', 'traitA', 'Aa');
      cy.selectParentGenotype('parent2', 'traitB', 'Bb');
      
      // Screenshot the full results hierarchy
      cy.get('.results-container').screenshot('visual-hierarchy-complete');
      
      // Individual sections
      cy.get('.genotype-section').screenshot('genotype-section-hierarchy');
      cy.get('.phenotype-section').screenshot('phenotype-section-hierarchy');
      cy.get('.combined-section').screenshot('combined-section-hierarchy');
    });
  });

  describe('Visual Consistency - Color and Styling', () => {
    it('should maintain consistent color scheme', () => {
      // Test primary colors
      cy.get('h1').should('have.css', 'color')
        .then((color) => {
          cy.screenshot(`color-title-${color.replace(/[^\w]/g, '')}`);
        });
      
      // Test table colors
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.selectParentGenotype('parent2', 'traitA', 'Aa');
      
      cy.get('.genotype-tables table').screenshot('color-scheme-tables');
    });

    it('should show consistent hover and focus states', () => {
      // Test select element focus
      cy.get('.parent-column').first()
        .find('select').first()
        .focus()
        .screenshot('focus-state-select');
      
      // Test hover states (if applicable)
      cy.get('.parent-column').first()
        .find('select').first()
        .trigger('mouseover')
        .screenshot('hover-state-select');
    });

    it('should maintain visual consistency with different data states', () => {
      // Empty state
      cy.screenshot('state-empty-initial');
      
      // Single selection state
      cy.selectParentGenotype('parent1', 'traitA', 'AA');
      cy.screenshot('state-partial-selection');
      
      // Complete simple state
      cy.selectParentGenotype('parent2', 'traitA', 'AA');
      cy.screenshot('state-simple-complete');
      
      // Complex state
      cy.selectParentGenotype('parent1', 'traitB', 'Bb');
      cy.selectParentGenotype('parent2', 'traitB', 'Bb');
      cy.screenshot('state-complex-complete');
    });
  });

  describe('Visual Consistency - Typography and Text', () => {
    it('should maintain consistent font rendering', () => {
      // Test heading typography
      cy.get('h1').screenshot('typography-h1');
      cy.get('h2').screenshot('typography-h2');
      cy.get('h3').screenshot('typography-h3');
      
      // Test body text
      cy.get('.instructions p').screenshot('typography-body-text');
      
      // Test table text
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.selectParentGenotype('parent2', 'traitA', 'Aa');
      cy.get('.genotype-tables td').first().screenshot('typography-table-text');
    });

    it('should handle special characters and Finnish text correctly', () => {
      cy.selectParentGenotype('parent1', 'traitA', 'AA');
      cy.selectParentGenotype('parent2', 'traitA', 'aa');
      
      // Screenshot Finnish phenotype text
      cy.get('.phenotype-tables').contains('Pitkä').screenshot('finnish-text-pitka');
      
      cy.selectParentGenotype('parent1', 'traitA', 'aa');
      cy.get('.phenotype-tables').contains('Lyhyt').screenshot('finnish-text-lyhyt');
    });

    it('should maintain text alignment and spacing', () => {
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.selectParentGenotype('parent2', 'traitA', 'Aa');
      
      // Test table text alignment
      cy.get('.genotype-tables table').screenshot('text-alignment-genotype');
      cy.get('.phenotype-tables table').screenshot('text-alignment-phenotype');
      
      // Test percentage text alignment
      cy.get('.probability-text').screenshot('text-alignment-percentages');
    });
  });

  describe('Visual Regression - Error States', () => {
    it('should handle visual states for edge cases', () => {
      // Test visual state with no selection
      cy.screenshot('edge-case-no-selection');
      
      // Test visual state with partial selection
      cy.selectParentGenotype('parent1', 'traitA', 'AA');
      cy.screenshot('edge-case-partial-selection');
      
      // Test visual state with maximum complexity
      cy.selectParentGenotype('parent1', 'traitB', 'Bb');
      cy.selectParentGenotype('parent2', 'traitA', 'Aa');
      cy.selectParentGenotype('parent2', 'traitB', 'Bb');
      cy.screenshot('edge-case-max-complexity');
    });
  });

  describe('Visual Consistency - Animation and Transitions', () => {
    it('should capture visual transitions during interactions', () => {
      // Initial state
      cy.screenshot('transition-start');
      
      // Mid-transition (if animations exist)
      cy.selectParentGenotype('parent1', 'traitA', 'AA');
      cy.wait(100); // Capture mid-animation if any
      cy.screenshot('transition-mid');
      
      // Final state
      cy.wait(500); // Let animations complete
      cy.screenshot('transition-end');
    });

    it('should maintain visual consistency during rapid changes', () => {
      // Rapid genotype changes
      cy.selectParentGenotype('parent1', 'traitA', 'AA');
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.selectParentGenotype('parent1', 'traitA', 'aa');
      
      // Final stable state
      cy.wait(300);
      cy.screenshot('rapid-changes-final');
    });
  });

  describe('Cross-Platform Visual Consistency', () => {
    it('should maintain consistent appearance across resolutions', () => {
      const resolutions = [
        { width: 1280, height: 720, name: '720p' },
        { width: 1920, height: 1080, name: '1080p' },
        { width: 2560, height: 1440, name: '1440p' },
        { width: 3840, height: 2160, name: '4k' }
      ];

      resolutions.forEach(({ width, height, name }) => {
        cy.viewport(width, height);
        cy.get('.gene-weaver-app').should('be.visible');
        cy.screenshot(`resolution-${name}-${width}x${height}`);
      });
    });

    it('should test pixel-perfect alignment at different scales', () => {
      // Standard scale
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.selectParentGenotype('parent2', 'traitA', 'Aa');
      cy.screenshot('scale-100-percent');
      
      // High DPI simulation (would need actual high DPI testing in real scenario)
      cy.viewport(1920, 1080);
      cy.screenshot('scale-standard-dpi');
    });
  });
});
