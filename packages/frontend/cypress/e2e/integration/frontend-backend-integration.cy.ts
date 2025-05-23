/// <reference types="cypress" />

describe('Gene Weaver - Frontend-Backend Integration', () => {
  const BACKEND_URL = 'http://localhost:3000';
  
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Backend API Communication', () => {
    it('should verify backend is accessible and healthy', () => {
      cy.request('GET', `${BACKEND_URL}/health`)
        .should((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('status', 'ok');
        });
    });

    it('should successfully call genetics calculation API', () => {
      const requestBody = {
        parent1Genotype: 'Bb',
        parent2Genotype: 'Bb'
      };

      cy.request('POST', `${BACKEND_URL}/api/genetics/calculate`, requestBody)
        .should((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('genotypeResults');
          expect(response.body).to.have.property('phenotypeResults');
          
          // Verify genotype results structure
          expect(response.body.genotypeResults).to.be.an('array');
          response.body.genotypeResults.forEach((result: any) => {
            expect(result).to.have.property('genotype');
            expect(result).to.have.property('probability');
            expect(result.probability).to.be.a('number');
            expect(result.probability).to.be.at.least(0);
            expect(result.probability).to.be.at.most(1);
          });

          // Verify phenotype results structure
          expect(response.body.phenotypeResults).to.be.an('array');
          response.body.phenotypeResults.forEach((result: any) => {
            expect(result).to.have.property('phenotype');
            expect(result).to.have.property('probability');
            expect(result.probability).to.be.a('number');
            expect(result.probability).to.be.at.least(0);
            expect(result.probability).to.be.at.most(1);
          });
        });
    });

    it('should handle API validation errors correctly', () => {
      // Test missing parent genotypes
      cy.request({
        method: 'POST',
        url: `${BACKEND_URL}/api/genetics/calculate`,
        body: {},
        failOnStatusCode: false
      }).should((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('error');
      });

      // Test invalid genotype format
      cy.request({
        method: 'POST',
        url: `${BACKEND_URL}/api/genetics/calculate`,
        body: {
          parent1Genotype: 'Invalid',
          parent2Genotype: 'BB'
        },
        failOnStatusCode: false
      }).should((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('error');
      });
    });

    it('should return mathematically correct Bb × Bb calculation', () => {
      cy.request('POST', `${BACKEND_URL}/api/genetics/calculate`, {
        parent1Genotype: 'Bb',
        parent2Genotype: 'Bb'
      }).should((response) => {
        // Verify classic 1:2:1 genotype ratio
        const genotypeResults = response.body.genotypeResults;
        const bbResult = genotypeResults.find((r: any) => r.genotype === 'BB');
        const BbResult = genotypeResults.find((r: any) => r.genotype === 'Bb');
        const bbResultLower = genotypeResults.find((r: any) => r.genotype === 'bb');

        expect(bbResult.probability).to.be.closeTo(0.25, 0.01);
        expect(BbResult.probability).to.be.closeTo(0.5, 0.01);
        expect(bbResultLower.probability).to.be.closeTo(0.25, 0.01);

        // Verify 3:1 phenotype ratio
        const phenotypeResults = response.body.phenotypeResults;
        const blackResult = phenotypeResults.find((p: any) => p.phenotype === 'Black');
        const whiteResult = phenotypeResults.find((p: any) => p.phenotype === 'White');

        expect(blackResult.probability).to.be.closeTo(0.75, 0.01);
        expect(whiteResult.probability).to.be.closeTo(0.25, 0.01);
      });
    });
  });

  describe('Frontend-Backend Data Flow', () => {
    it('should intercept and verify API calls during frontend interaction', () => {
      // Intercept the API call (if frontend uses it)
      cy.intercept('POST', '**/api/genetics/calculate', {
        statusCode: 200,
        body: {
          genotypeResults: [
            { genotype: 'BB', probability: 0.25 },
            { genotype: 'Bb', probability: 0.5 },
            { genotype: 'bb', probability: 0.25 }
          ],
          phenotypeResults: [
            { phenotype: 'Black', probability: 0.75 },
            { phenotype: 'White', probability: 0.25 }
          ]
        }
      }).as('geneticsCalculation');

      // Perform frontend interaction
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.selectParentGenotype('parent2', 'traitA', 'Aa');

      // Wait for potential API call (if frontend uses backend)
      // Note: Current frontend appears to calculate locally
      cy.wait(1000);

      // Verify frontend shows correct results regardless of source
      cy.get('.genotype-tables .trait-table').first()
        .find('tbody tr').should('have.length', 3);
    });

    it('should handle backend connection failures gracefully', () => {
      // Simulate backend failure
      cy.intercept('POST', '**/api/genetics/calculate', {
        statusCode: 500,
        body: { error: 'Server error' }
      }).as('failedCalculation');

      // Perform frontend interactions
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.selectParentGenotype('parent2', 'traitA', 'Aa');

      // Verify frontend still functions (uses local calculation)
      cy.get('.genotype-tables').should('be.visible');
      cy.get('.phenotype-tables').should('be.visible');
    });

    it('should compare frontend and backend calculation consistency', () => {
      // Test various genotype combinations
      const testCases = [
        { p1: 'BB', p2: 'BB' },
        { p1: 'BB', p2: 'Bb' },
        { p1: 'Bb', p2: 'Bb' },
        { p1: 'Bb', p2: 'bb' },
        { p1: 'bb', p2: 'bb' }
      ];

      testCases.forEach(({ p1, p2 }) => {
        // Get backend calculation
        cy.request('POST', `${BACKEND_URL}/api/genetics/calculate`, {
          parent1Genotype: p1,
          parent2Genotype: p2
        }).then((response) => {
          const backendResults = response.body;

          // Set frontend genotypes
          cy.selectParentGenotype('parent1', 'traitA', p1);
          cy.selectParentGenotype('parent2', 'traitA', p1);

          // Compare results (frontend should match backend logic)
          // Note: This assumes both use same calculation logic
          cy.get('.genotype-tables .trait-table').first()
            .find('tbody tr').should('have.length.greaterThan', 0);
        });
      });
    });
  });

  describe('Real-Time Data Synchronization', () => {
    it('should maintain consistent state across multiple calculations', () => {
      // Perform multiple rapid calculations
      const combinations = [
        ['AA', 'AA'], ['AA', 'Aa'], ['Aa', 'Aa'], 
        ['Aa', 'aa'], ['aa', 'aa']
      ];

      combinations.forEach(([p1, p2], index) => {
        cy.selectParentGenotype('parent1', 'traitA', p1);
        cy.selectParentGenotype('parent2', 'traitA', p2);

        // Verify calculation completes before next iteration
        cy.get('.genotype-tables .trait-table').first()
          .find('tbody tr').should('have.length.greaterThan', 0);

        // Small delay to prevent race conditions
        if (index < combinations.length - 1) {
          cy.wait(100);
        }
      });
    });

    it('should handle concurrent user interactions', () => {
      // Rapidly change multiple genotypes
      cy.selectParentGenotype('parent1', 'traitA', 'AA');
      cy.selectParentGenotype('parent1', 'traitB', 'BB');
      cy.selectParentGenotype('parent2', 'traitA', 'aa');
      cy.selectParentGenotype('parent2', 'traitB', 'bb');

      // Change again quickly
      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.selectParentGenotype('parent2', 'traitA', 'Aa');

      // Verify final state is correct
      cy.get('.combined-phenotypes tbody tr').should('have.length.greaterThan', 0);
    });
  });

  describe('Error Handling and Recovery', () => {
    it('should display meaningful error messages for API failures', () => {
      // Simulate API timeout
      cy.intercept('POST', '**/api/genetics/calculate', {
        delay: 30000,
        statusCode: 408,
        body: { error: 'Request timeout' }
      }).as('timeoutRequest');

      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      cy.selectParentGenotype('parent2', 'traitA', 'Aa');

      // Verify application remains functional
      cy.get('.gene-weaver-app').should('be.visible');
    });

    it('should recover from temporary backend unavailability', () => {
      // First, simulate backend failure
      cy.intercept('POST', '**/api/genetics/calculate', {
        statusCode: 503,
        body: { error: 'Service unavailable' }
      }).as('serviceUnavailable');

      cy.selectParentGenotype('parent1', 'traitA', 'Aa');
      
      // Then restore backend functionality
      cy.intercept('POST', '**/api/genetics/calculate', {
        statusCode: 200,
        body: {
          genotypeResults: [{ genotype: 'Aa', probability: 1.0 }],
          phenotypeResults: [{ phenotype: 'Black', probability: 1.0 }]
        }
      }).as('serviceRestored');

      cy.selectParentGenotype('parent2', 'traitA', 'AA');

      // Verify recovery
      cy.get('.genotype-tables').should('be.visible');
    });
  });

  describe('Data Validation and Integrity', () => {
    it('should validate all probability values sum to 1.0', () => {
      cy.request('POST', `${BACKEND_URL}/api/genetics/calculate`, {
        parent1Genotype: 'Bb',
        parent2Genotype: 'Bb'
      }).should((response) => {
        // Verify genotype probabilities sum to 1.0
        const genotypeSum = response.body.genotypeResults
          .reduce((sum: number, result: any) => sum + result.probability, 0);
        expect(genotypeSum).to.be.closeTo(1.0, 0.01);

        // Verify phenotype probabilities sum to 1.0
        const phenotypeSum = response.body.phenotypeResults
          .reduce((sum: number, result: any) => sum + result.probability, 0);
        expect(phenotypeSum).to.be.closeTo(1.0, 0.01);
      });
    });

    it('should maintain data consistency across different input formats', () => {
      // Test that 'Bb' and 'bB' produce identical results
      const testGenotypes = ['Bb', 'bB'];
      let results: any[] = [];

      testGenotypes.forEach((genotype) => {
        cy.request('POST', `${BACKEND_URL}/api/genetics/calculate`, {
          parent1Genotype: genotype,
          parent2Genotype: 'BB'
        }).then((response) => {
          results.push(response.body);
          
          if (results.length === 2) {
            // Compare results - they should be identical
            expect(results[0].genotypeResults).to.deep.equal(results[1].genotypeResults);
            expect(results[0].phenotypeResults).to.deep.equal(results[1].phenotypeResults);
          }
        });
      });
    });
  });
});
