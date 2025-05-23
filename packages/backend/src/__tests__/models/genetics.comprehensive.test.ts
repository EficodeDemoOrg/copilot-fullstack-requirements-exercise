import { GeneticsCalculator, Genotype, GeneticsResults } from '../../models/genetics';

describe('GeneticsCalculator - Comprehensive Testing Suite', () => {
  
  describe('Edge Cases and Boundary Conditions', () => {
    
    test('Should handle all remaining cross combinations not covered in basic tests', () => {
      // Test BB × Bb
      const bbXBb = GeneticsCalculator.calculateOffspringProbabilities('BB', 'Bb');
      expect(bbXBb.genotypeResults).toHaveLength(2);
      expect(bbXBb.genotypeResults.find(r => r.genotype === 'BB')?.probability).toBe(0.5);
      expect(bbXBb.genotypeResults.find(r => r.genotype === 'Bb')?.probability).toBe(0.5);
      
      // Test Bb × bb  
      const BbXbb = GeneticsCalculator.calculateOffspringProbabilities('Bb', 'bb');
      expect(BbXbb.genotypeResults).toHaveLength(2);
      expect(BbXbb.genotypeResults.find(r => r.genotype === 'Bb')?.probability).toBe(0.5);
      expect(BbXbb.genotypeResults.find(r => r.genotype === 'bb')?.probability).toBe(0.5);
      
      // Test bb × BB (reverse of BB × bb)
      const bbXBB = GeneticsCalculator.calculateOffspringProbabilities('bb', 'BB');
      expect(bbXBB.genotypeResults).toHaveLength(1);
      expect(bbXBB.genotypeResults[0]).toEqual({
        genotype: 'Bb',
        probability: 1.0
      });
      
      // Test bb × Bb (reverse of Bb × bb)
      const bbXBb2 = GeneticsCalculator.calculateOffspringProbabilities('bb', 'Bb');
      expect(bbXBb2.genotypeResults).toHaveLength(2);
      expect(bbXBb2.genotypeResults.find(r => r.genotype === 'Bb')?.probability).toBe(0.5);
      expect(bbXBb2.genotypeResults.find(r => r.genotype === 'bb')?.probability).toBe(0.5);
    });
    
    test('Should handle bB normalization in all combinations', () => {
      // Test bB × bB 
      const result = GeneticsCalculator.calculateOffspringProbabilities('bB', 'bB');
      expect(result.genotypeResults).toHaveLength(3);
      expect(result.genotypeResults.find(r => r.genotype === 'BB')?.probability).toBe(0.25);
      expect(result.genotypeResults.find(r => r.genotype === 'Bb')?.probability).toBe(0.5);
      expect(result.genotypeResults.find(r => r.genotype === 'bb')?.probability).toBe(0.25);
      
      // Test bB × bb
      const bBXbb = GeneticsCalculator.calculateOffspringProbabilities('bB', 'bb');
      expect(bBXbb.genotypeResults).toHaveLength(2);
      expect(bBXbb.genotypeResults.find(r => r.genotype === 'Bb')?.probability).toBe(0.5);
      expect(bBXbb.genotypeResults.find(r => r.genotype === 'bb')?.probability).toBe(0.5);
    });
  });
  
  describe('Mathematical Precision and Data Integrity', () => {
    
    test('Probabilities should always sum to 1.0 for genotype results', () => {
      const testCases: [Genotype, Genotype][] = [
        ['BB', 'BB'], ['BB', 'Bb'], ['BB', 'bb'],
        ['Bb', 'BB'], ['Bb', 'Bb'], ['Bb', 'bb'], 
        ['bb', 'BB'], ['bb', 'Bb'], ['bb', 'bb'],
        ['bB', 'BB'], ['bB', 'Bb'], ['bB', 'bb'], ['bB', 'bB']
      ];
      
      testCases.forEach(([p1, p2]) => {
        const result = GeneticsCalculator.calculateOffspringProbabilities(p1, p2);
        const totalGenotypeProbability = result.genotypeResults.reduce((sum, r) => sum + r.probability, 0);
        expect(totalGenotypeProbability).toBeCloseTo(1.0, 10);
      });
    });
    
    test('Probabilities should always sum to 1.0 for phenotype results', () => {
      const testCases: [Genotype, Genotype][] = [
        ['BB', 'BB'], ['BB', 'Bb'], ['BB', 'bb'],
        ['Bb', 'BB'], ['Bb', 'Bb'], ['Bb', 'bb'], 
        ['bb', 'BB'], ['bb', 'Bb'], ['bb', 'bb'],
        ['bB', 'BB'], ['bB', 'Bb'], ['bB', 'bb'], ['bB', 'bB']
      ];
      
      testCases.forEach(([p1, p2]) => {
        const result = GeneticsCalculator.calculateOffspringProbabilities(p1, p2);
        const totalPhenotypeProbability = result.phenotypeResults.reduce((sum, r) => sum + r.probability, 0);
        expect(totalPhenotypeProbability).toBeCloseTo(1.0, 10);
      });
    });
    
    test('Should always return exactly 2 phenotype results', () => {
      const testCases: [Genotype, Genotype][] = [
        ['BB', 'BB'], ['BB', 'Bb'], ['BB', 'bb'],
        ['Bb', 'Bb'], ['bb', 'bb'], ['bB', 'bB']
      ];
      
      testCases.forEach(([p1, p2]) => {
        const result = GeneticsCalculator.calculateOffspringProbabilities(p1, p2);
        expect(result.phenotypeResults).toHaveLength(2);
        expect(result.phenotypeResults.map(r => r.phenotype).sort()).toEqual(['Black', 'White']);
      });
    });
    
    test('Genotype counts should be valid (between 1-3 unique genotypes)', () => {
      const testCases: [Genotype, Genotype][] = [
        ['BB', 'BB'], ['BB', 'Bb'], ['BB', 'bb'],
        ['Bb', 'Bb'], ['bb', 'bb'], ['bB', 'bB']
      ];
      
      testCases.forEach(([p1, p2]) => {
        const result = GeneticsCalculator.calculateOffspringProbabilities(p1, p2);
        expect(result.genotypeResults.length).toBeGreaterThanOrEqual(1);
        expect(result.genotypeResults.length).toBeLessThanOrEqual(3);
      });
    });
    
    test('Probability values should be within valid range [0,1]', () => {
      const testCases: [Genotype, Genotype][] = [
        ['BB', 'BB'], ['Bb', 'Bb'], ['bb', 'bb'], ['bB', 'bB']
      ];
      
      testCases.forEach(([p1, p2]) => {
        const result = GeneticsCalculator.calculateOffspringProbabilities(p1, p2);
        
        result.genotypeResults.forEach(r => {
          expect(r.probability).toBeGreaterThanOrEqual(0);
          expect(r.probability).toBeLessThanOrEqual(1);
        });
        
        result.phenotypeResults.forEach(r => {
          expect(r.probability).toBeGreaterThanOrEqual(0);
          expect(r.probability).toBeLessThanOrEqual(1);
        });
      });
    });
  });
  
  describe('Result Structure Validation', () => {
    
    test('Should return results with correct structure and types', () => {
      const result = GeneticsCalculator.calculateOffspringProbabilities('Bb', 'Bb');
      
      // Check main structure
      expect(result).toHaveProperty('genotypeResults');
      expect(result).toHaveProperty('phenotypeResults');
      expect(Array.isArray(result.genotypeResults)).toBe(true);
      expect(Array.isArray(result.phenotypeResults)).toBe(true);
      
      // Check genotype result structure
      result.genotypeResults.forEach(gr => {
        expect(gr).toHaveProperty('genotype');
        expect(gr).toHaveProperty('probability');
        expect(typeof gr.genotype).toBe('string');
        expect(typeof gr.probability).toBe('number');
        expect(['BB', 'Bb', 'bb']).toContain(gr.genotype);
      });
      
      // Check phenotype result structure  
      result.phenotypeResults.forEach(pr => {
        expect(pr).toHaveProperty('phenotype');
        expect(pr).toHaveProperty('probability');
        expect(typeof pr.phenotype).toBe('string');
        expect(typeof pr.probability).toBe('number');
        expect(['Black', 'White']).toContain(pr.phenotype);
      });
    });
    
    test('Should not have duplicate genotypes in results', () => {
      const testCases: [Genotype, Genotype][] = [
        ['BB', 'Bb'], ['Bb', 'Bb'], ['bb', 'Bb']
      ];
      
      testCases.forEach(([p1, p2]) => {
        const result = GeneticsCalculator.calculateOffspringProbabilities(p1, p2);
        const genotypes = result.genotypeResults.map(r => r.genotype);
        const uniqueGenotypes = [...new Set(genotypes)];
        expect(genotypes).toHaveLength(uniqueGenotypes.length);
      });
    });
    
    test('Should not have duplicate phenotypes in results', () => {
      const result = GeneticsCalculator.calculateOffspringProbabilities('Bb', 'Bb');
      const phenotypes = result.phenotypeResults.map(r => r.phenotype);
      const uniquePhenotypes = [...new Set(phenotypes)];
      expect(phenotypes).toHaveLength(uniquePhenotypes.length);
      expect(uniquePhenotypes.sort()).toEqual(['Black', 'White']);
    });
  });
  
  describe('Dominance Rules Validation', () => {
    
    test('BB and Bb should always map to Black phenotype', () => {
      const testCases: [Genotype, Genotype][] = [
        ['BB', 'BB'], ['BB', 'Bb'], ['Bb', 'BB'], ['Bb', 'Bb']
      ];
      
      testCases.forEach(([p1, p2]) => {
        const result = GeneticsCalculator.calculateOffspringProbabilities(p1, p2);
        const blackProbability = result.phenotypeResults.find(r => r.phenotype === 'Black')?.probability || 0;
        
        // Calculate expected black probability from genotypes
        const bbProb = result.genotypeResults.find(r => r.genotype === 'BB')?.probability || 0;
        const BbProb = result.genotypeResults.find(r => r.genotype === 'Bb')?.probability || 0;
        const expectedBlackProb = bbProb + BbProb;
        
        expect(blackProbability).toBeCloseTo(expectedBlackProb, 10);
      });
    });
    
    test('Only bb should map to White phenotype', () => {
      const testCases: [Genotype, Genotype][] = [
        ['bb', 'bb'], ['bb', 'Bb'], ['Bb', 'bb'], ['Bb', 'Bb']
      ];
      
      testCases.forEach(([p1, p2]) => {
        const result = GeneticsCalculator.calculateOffspringProbabilities(p1, p2);
        const whiteProbability = result.phenotypeResults.find(r => r.phenotype === 'White')?.probability || 0;
        
        // Calculate expected white probability from genotypes
        const bbProb = result.genotypeResults.find(r => r.genotype === 'bb')?.probability || 0;
        
        expect(whiteProbability).toBeCloseTo(bbProb, 10);
      });
    });
  });
  
  describe('Symmetry and Commutativity Tests', () => {
    
    test('Results should be identical regardless of parent order (commutativity)', () => {
      const testPairs: [Genotype, Genotype][] = [
        ['BB', 'Bb'], ['BB', 'bb'], ['Bb', 'bb'], ['BB', 'bB'], ['Bb', 'bB'], ['bb', 'bB']
      ];
      
      testPairs.forEach(([p1, p2]) => {
        const result1 = GeneticsCalculator.calculateOffspringProbabilities(p1, p2);
        const result2 = GeneticsCalculator.calculateOffspringProbabilities(p2, p1);
        
        // Sort results for comparison
        const sortedGenotypes1 = result1.genotypeResults.sort((a, b) => a.genotype.localeCompare(b.genotype));
        const sortedGenotypes2 = result2.genotypeResults.sort((a, b) => a.genotype.localeCompare(b.genotype));
        const sortedPhenotypes1 = result1.phenotypeResults.sort((a, b) => a.phenotype.localeCompare(b.phenotype));
        const sortedPhenotypes2 = result2.phenotypeResults.sort((a, b) => a.phenotype.localeCompare(b.phenotype));
        
        expect(sortedGenotypes1).toEqual(sortedGenotypes2);
        expect(sortedPhenotypes1).toEqual(sortedPhenotypes2);
      });
    });
  });
  
  describe('Performance and Consistency Tests', () => {
    
    test('Should produce consistent results across multiple runs', () => {
      const iterations = 100;
      const p1: Genotype = 'Bb';
      const p2: Genotype = 'Bb';
      
      const firstResult = GeneticsCalculator.calculateOffspringProbabilities(p1, p2);
      
      for (let i = 0; i < iterations; i++) {
        const currentResult = GeneticsCalculator.calculateOffspringProbabilities(p1, p2);
        expect(currentResult).toEqual(firstResult);
      }
    });
    
    test('Should handle rapid successive calculations efficiently', () => {
      const startTime = Date.now();
      const iterations = 1000;
      
      for (let i = 0; i < iterations; i++) {
        GeneticsCalculator.calculateOffspringProbabilities('Bb', 'Bb');
      }
      
      const endTime = Date.now();
      const totalTime = endTime - startTime;
      
      // Should complete 1000 calculations in under 1 second
      expect(totalTime).toBeLessThan(1000);
    });
  });
});
