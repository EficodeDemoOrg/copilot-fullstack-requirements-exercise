import { GeneticsCalculator, Genotype } from '../../models/genetics';

describe('Genetics Model - Edge Cases and Stress Testing', () => {
  
  describe('Advanced Genetic Scenarios', () => {
    
    test('Should handle all possible Punnett square outcomes correctly', () => {
      // Test a comprehensive matrix of all possible crosses
      const allGenotypes: Genotype[] = ['BB', 'Bb', 'bB', 'bb'];
      const expectedOutcomes: Record<string, any> = {
        'BB-BB': { BB: 1.0, Bb: 0.0, bb: 0.0 },
        'BB-Bb': { BB: 0.5, Bb: 0.5, bb: 0.0 },
        'BB-bB': { BB: 0.5, Bb: 0.5, bb: 0.0 },
        'BB-bb': { BB: 0.0, Bb: 1.0, bb: 0.0 },
        'Bb-BB': { BB: 0.5, Bb: 0.5, bb: 0.0 },
        'Bb-Bb': { BB: 0.25, Bb: 0.5, bb: 0.25 },
        'Bb-bB': { BB: 0.25, Bb: 0.5, bb: 0.25 },
        'Bb-bb': { BB: 0.0, Bb: 0.5, bb: 0.5 },
        'bB-BB': { BB: 0.5, Bb: 0.5, bb: 0.0 },
        'bB-Bb': { BB: 0.25, Bb: 0.5, bb: 0.25 },
        'bB-bB': { BB: 0.25, Bb: 0.5, bb: 0.25 },
        'bB-bb': { BB: 0.0, Bb: 0.5, bb: 0.5 },
        'bb-BB': { BB: 0.0, Bb: 1.0, bb: 0.0 },
        'bb-Bb': { BB: 0.0, Bb: 0.5, bb: 0.5 },
        'bb-bB': { BB: 0.0, Bb: 0.5, bb: 0.5 },
        'bb-bb': { BB: 0.0, Bb: 0.0, bb: 1.0 }
      };
      
      for (const p1 of allGenotypes) {
        for (const p2 of allGenotypes) {
          const result = GeneticsCalculator.calculateOffspringProbabilities(p1, p2);
          const key = `${p1}-${p2}`;
          const expected = expectedOutcomes[key];
          
          const actualBB = result.genotypeResults.find(r => r.genotype === 'BB')?.probability || 0;
          const actualBb = result.genotypeResults.find(r => r.genotype === 'Bb')?.probability || 0;
          const actualbb = result.genotypeResults.find(r => r.genotype === 'bb')?.probability || 0;
          
          expect(actualBB).toBeCloseTo(expected.BB, 10);
          expect(actualBb).toBeCloseTo(expected.Bb, 10);
          expect(actualbb).toBeCloseTo(expected.bb, 10);
        }
      }
    });
    
    test('Should validate Hardy-Weinberg principle compliance', () => {
      // For heterozygous crosses, the offspring should follow expected ratios
      const result = GeneticsCalculator.calculateOffspringProbabilities('Bb', 'Bb');
      
      // Hardy-Weinberg for F2 generation: p² + 2pq + q² = 1
      // Where p = frequency of B allele (0.5), q = frequency of b allele (0.5)
      // Expected: BB (p²) = 0.25, Bb (2pq) = 0.5, bb (q²) = 0.25
      
      const BBProb = result.genotypeResults.find(r => r.genotype === 'BB')?.probability || 0;
      const BbProb = result.genotypeResults.find(r => r.genotype === 'Bb')?.probability || 0;
      const bbProb = result.genotypeResults.find(r => r.genotype === 'bb')?.probability || 0;
      
      expect(BBProb).toBe(0.25);
      expect(BbProb).toBe(0.5);
      expect(bbProb).toBe(0.25);
      
      // Verify the equation p² + 2pq + q² = 1
      expect(BBProb + BbProb + bbProb).toBeCloseTo(1.0, 10);
    });
    
    test('Should maintain allele frequency conservation', () => {
      // In any cross, total allele frequencies should be conserved
      const testCrosses: [Genotype, Genotype][] = [
        ['BB', 'bb'], ['Bb', 'bb'], ['BB', 'Bb'], ['Bb', 'Bb']
      ];
      
      testCrosses.forEach(([p1, p2]) => {
        const result = GeneticsCalculator.calculateOffspringProbabilities(p1, p2);
        
        // Calculate B and b allele frequencies in offspring
        const BBProb = result.genotypeResults.find(r => r.genotype === 'BB')?.probability || 0;
        const BbProb = result.genotypeResults.find(r => r.genotype === 'Bb')?.probability || 0;
        const bbProb = result.genotypeResults.find(r => r.genotype === 'bb')?.probability || 0;
        
        // B allele frequency = (2*BB + Bb) / 2
        const bAlleleFreq = (2 * BBProb + BbProb) / 2;
        // b allele frequency = (2*bb + Bb) / 2  
        const bAlleleFreqLower = (2 * bbProb + BbProb) / 2;
        
        // Total should equal 1
        expect(bAlleleFreq + bAlleleFreqLower).toBeCloseTo(1.0, 10);
      });
    });
  });
  
  describe('Numerical Precision and Stability', () => {
    
    test('Should maintain precision with repeated calculations', () => {
      const iterations = 1000;
      const p1: Genotype = 'Bb';
      const p2: Genotype = 'Bb';
      
      const firstResult = GeneticsCalculator.calculateOffspringProbabilities(p1, p2);
      
      for (let i = 0; i < iterations; i++) {
        const currentResult = GeneticsCalculator.calculateOffspringProbabilities(p1, p2);
        
        // Compare each result with first result
        expect(currentResult.genotypeResults).toHaveLength(firstResult.genotypeResults.length);
        expect(currentResult.phenotypeResults).toHaveLength(firstResult.phenotypeResults.length);
        
        currentResult.genotypeResults.forEach(current => {
          const original = firstResult.genotypeResults.find(r => r.genotype === current.genotype);
          expect(current.probability).toBeCloseTo(original!.probability, 15);
        });
        
        currentResult.phenotypeResults.forEach(current => {
          const original = firstResult.phenotypeResults.find(r => r.phenotype === current.phenotype);
          expect(current.probability).toBeCloseTo(original!.probability, 15);
        });
      }
    });
    
    test('Should handle floating point precision correctly', () => {
      // Test cases that might cause floating point precision issues
      const result = GeneticsCalculator.calculateOffspringProbabilities('Bb', 'Bb');
      
      // Check that fractions are represented exactly
      const BBProb = result.genotypeResults.find(r => r.genotype === 'BB')?.probability;
      const BbProb = result.genotypeResults.find(r => r.genotype === 'Bb')?.probability;
      const bbProb = result.genotypeResults.find(r => r.genotype === 'bb')?.probability;
      
      // These should be exact fractions
      expect(BBProb).toBe(0.25);
      expect(BbProb).toBe(0.5);
      expect(bbProb).toBe(0.25);
      
      // Sum should be exactly 1.0
      expect(BBProb! + BbProb! + bbProb!).toBe(1.0);
    });
    
    test('Should provide consistent decimal precision across all results', () => {
      const testCases: [Genotype, Genotype][] = [
        ['BB', 'BB'], ['BB', 'Bb'], ['BB', 'bb'],
        ['Bb', 'Bb'], ['bb', 'bb'], ['bB', 'bB']
      ];
      
      testCases.forEach(([p1, p2]) => {
        const result = GeneticsCalculator.calculateOffspringProbabilities(p1, p2);
        
        // Check that all probabilities have reasonable decimal precision
        result.genotypeResults.forEach(r => {
          expect(Number.isFinite(r.probability)).toBe(true);
          expect(r.probability.toString().split('.')[1]?.length || 0).toBeLessThanOrEqual(16);
        });
        
        result.phenotypeResults.forEach(r => {
          expect(Number.isFinite(r.probability)).toBe(true);
          expect(r.probability.toString().split('.')[1]?.length || 0).toBeLessThanOrEqual(16);
        });
      });
    });
  });
  
  describe('Memory and Performance Validation', () => {
    
    test('Should not create memory leaks with repeated calculations', () => {
      const initialMemory = process.memoryUsage().heapUsed;
      const iterations = 10000;
      
      for (let i = 0; i < iterations; i++) {
        GeneticsCalculator.calculateOffspringProbabilities('Bb', 'Bb');
      }
      
      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }
      
      const finalMemory = process.memoryUsage().heapUsed;
      const memoryIncrease = finalMemory - initialMemory;
      
      // Memory increase should be minimal (less than 10MB)
      expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024);
    });
    
    test('Should scale linearly with input complexity', () => {
      const startTime = Date.now();
      const iterations = 1000;
      
      // Test simple case
      for (let i = 0; i < iterations; i++) {
        GeneticsCalculator.calculateOffspringProbabilities('BB', 'BB');
      }
      
      const simpleTime = Date.now() - startTime;
      
      const complexStartTime = Date.now();
      
      // Test complex case
      for (let i = 0; i < iterations; i++) {
        GeneticsCalculator.calculateOffspringProbabilities('Bb', 'Bb');
      }
      
      const complexTime = Date.now() - complexStartTime;
      
      // Complex calculations shouldn't be significantly slower than simple ones
      // for this simple genetic model
      expect(complexTime).toBeLessThan(simpleTime * 2);
    });
  });
  
  describe('Robustness and Invariant Testing', () => {
    
    test('Should maintain biological invariants under all conditions', () => {
      const allGenotypes: Genotype[] = ['BB', 'Bb', 'bB', 'bb'];
      
      for (const p1 of allGenotypes) {
        for (const p2 of allGenotypes) {
          const result = GeneticsCalculator.calculateOffspringProbabilities(p1, p2);
          
          // Invariant 1: Black phenotype = BB + Bb probabilities
          const BBProb = result.genotypeResults.find(r => r.genotype === 'BB')?.probability || 0;
          const BbProb = result.genotypeResults.find(r => r.genotype === 'Bb')?.probability || 0;
          const blackPhenotypeProb = result.phenotypeResults.find(r => r.phenotype === 'Black')?.probability || 0;
          
          expect(blackPhenotypeProb).toBeCloseTo(BBProb + BbProb, 10);
          
          // Invariant 2: White phenotype = bb probability
          const bbProb = result.genotypeResults.find(r => r.genotype === 'bb')?.probability || 0;
          const whitePhenotypeProb = result.phenotypeResults.find(r => r.phenotype === 'White')?.probability || 0;
          
          expect(whitePhenotypeProb).toBeCloseTo(bbProb, 10);
          
          // Invariant 3: Total genotype probabilities = 1
          const totalGenotypeProb = result.genotypeResults.reduce((sum, r) => sum + r.probability, 0);
          expect(totalGenotypeProb).toBeCloseTo(1.0, 10);
          
          // Invariant 4: Total phenotype probabilities = 1
          const totalPhenotypeProb = result.phenotypeResults.reduce((sum, r) => sum + r.probability, 0);
          expect(totalPhenotypeProb).toBeCloseTo(1.0, 10);
        }
      }
    });
    
    test('Should handle edge cases in genotype normalization', () => {
      // Test that bB is always normalized to Bb
      const testCases: [Genotype, Genotype][] = [
        ['bB', 'BB'], ['BB', 'bB'], ['bB', 'Bb'], ['Bb', 'bB'],
        ['bB', 'bb'], ['bb', 'bB'], ['bB', 'bB']
      ];
      
      testCases.forEach(([p1, p2]) => {
        const result = GeneticsCalculator.calculateOffspringProbabilities(p1, p2);
        
        // Ensure no 'bB' genotype appears in results (should be normalized to 'Bb')
        const hasBbGenotype = result.genotypeResults.some(r => r.genotype === 'bB' as any);
        expect(hasBbGenotype).toBe(false);
        
        // Ensure only valid genotypes appear
        result.genotypeResults.forEach(r => {
          expect(['BB', 'Bb', 'bb']).toContain(r.genotype);
        });
      });
    });
  });
  
  describe('Regression Testing', () => {
    
    test('Should maintain backwards compatibility with expected results', () => {
      // These are known good results that should never change
      const knownGoodResults = [
        {
          input: ['BB', 'BB'] as [Genotype, Genotype],
          expectedGenotypes: { BB: 1.0, Bb: 0.0, bb: 0.0 },
          expectedPhenotypes: { Black: 1.0, White: 0.0 }
        },
        {
          input: ['Bb', 'Bb'] as [Genotype, Genotype],
          expectedGenotypes: { BB: 0.25, Bb: 0.5, bb: 0.25 },
          expectedPhenotypes: { Black: 0.75, White: 0.25 }
        },
        {
          input: ['bb', 'bb'] as [Genotype, Genotype],
          expectedGenotypes: { BB: 0.0, Bb: 0.0, bb: 1.0 },
          expectedPhenotypes: { Black: 0.0, White: 1.0 }
        }
      ];
      
      knownGoodResults.forEach(({ input, expectedGenotypes, expectedPhenotypes }) => {
        const result = GeneticsCalculator.calculateOffspringProbabilities(input[0], input[1]);
        
        // Check genotype probabilities
        Object.entries(expectedGenotypes).forEach(([genotype, expectedProb]) => {
          const actualProb = result.genotypeResults.find(r => r.genotype === genotype)?.probability || 0;
          expect(actualProb).toBeCloseTo(expectedProb, 10);
        });
        
        // Check phenotype probabilities
        Object.entries(expectedPhenotypes).forEach(([phenotype, expectedProb]) => {
          const actualProb = result.phenotypeResults.find(r => r.phenotype === phenotype)?.probability || 0;
          expect(actualProb).toBeCloseTo(expectedProb, 10);
        });
      });
    });
  });
});
