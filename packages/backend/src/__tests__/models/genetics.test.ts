import { GeneticsCalculator, Genotype } from '../../models/genetics';

describe('GeneticsCalculator', () => {
  // Test case for homozygous dominant × homozygous dominant (BB × BB)
  test('BB × BB should result in 100% BB genotype and 100% Black phenotype', () => {
    const parent1: Genotype = 'BB';
    const parent2: Genotype = 'BB';
    
    const result = GeneticsCalculator.calculateOffspringProbabilities(parent1, parent2);
    
    expect(result.genotypeResults).toHaveLength(1);
    expect(result.genotypeResults[0]).toEqual({
      genotype: 'BB',
      probability: 1.0
    });
    
    expect(result.phenotypeResults).toHaveLength(2);
    expect(result.phenotypeResults.find(p => p.phenotype === 'Black')?.probability).toBe(1.0);
    expect(result.phenotypeResults.find(p => p.phenotype === 'White')?.probability).toBe(0.0);
  });
  
  // Test case for homozygous dominant × homozygous recessive (BB × bb)
  test('BB × bb should result in 100% Bb genotype and 100% Black phenotype', () => {
    const parent1: Genotype = 'BB';
    const parent2: Genotype = 'bb';
    
    const result = GeneticsCalculator.calculateOffspringProbabilities(parent1, parent2);
    
    expect(result.genotypeResults).toHaveLength(1);
    expect(result.genotypeResults[0]).toEqual({
      genotype: 'Bb',
      probability: 1.0
    });
    
    expect(result.phenotypeResults).toHaveLength(2);
    expect(result.phenotypeResults.find(p => p.phenotype === 'Black')?.probability).toBe(1.0);
    expect(result.phenotypeResults.find(p => p.phenotype === 'White')?.probability).toBe(0.0);
  });
  
  // Test case for heterozygous × heterozygous (Bb × Bb)
  test('Bb × Bb should result in 25% BB, 50% Bb, 25% bb genotypes and 75% Black, 25% White phenotypes', () => {
    const parent1: Genotype = 'Bb';
    const parent2: Genotype = 'Bb';
    
    const result = GeneticsCalculator.calculateOffspringProbabilities(parent1, parent2);
    
    expect(result.genotypeResults).toHaveLength(3);
    
    const bbResult = result.genotypeResults.find(r => r.genotype === 'BB');
    const BbResult = result.genotypeResults.find(r => r.genotype === 'Bb');
    const bbResultLower = result.genotypeResults.find(r => r.genotype === 'bb');
    
    expect(bbResult?.probability).toBe(0.25);
    expect(BbResult?.probability).toBe(0.5);
    expect(bbResultLower?.probability).toBe(0.25);
    
    expect(result.phenotypeResults).toHaveLength(2);
    expect(result.phenotypeResults.find(p => p.phenotype === 'Black')?.probability).toBe(0.75);
    expect(result.phenotypeResults.find(p => p.phenotype === 'White')?.probability).toBe(0.25);
  });
  
  // Test case for homozygous recessive × homozygous recessive (bb × bb)
  test('bb × bb should result in 100% bb genotype and 100% White phenotype', () => {
    const parent1: Genotype = 'bb';
    const parent2: Genotype = 'bb';
    
    const result = GeneticsCalculator.calculateOffspringProbabilities(parent1, parent2);
    
    expect(result.genotypeResults).toHaveLength(1);
    expect(result.genotypeResults[0]).toEqual({
      genotype: 'bb',
      probability: 1.0
    });
    
    expect(result.phenotypeResults).toHaveLength(2);
    expect(result.phenotypeResults.find(p => p.phenotype === 'Black')?.probability).toBe(0.0);
    expect(result.phenotypeResults.find(p => p.phenotype === 'White')?.probability).toBe(1.0);
  });
  
  // Test case for bB format (should be normalized to Bb)
  test('bB should be normalized to Bb', () => {
    const parent1: Genotype = 'bB';
    const parent2: Genotype = 'BB';
    
    const result = GeneticsCalculator.calculateOffspringProbabilities(parent1, parent2);
    
    // Results should be the same as Bb × BB
    expect(result.genotypeResults).toHaveLength(2);
    
    const bbResult = result.genotypeResults.find(r => r.genotype === 'BB');
    const BbResult = result.genotypeResults.find(r => r.genotype === 'Bb');
    
    expect(bbResult?.probability).toBe(0.5);
    expect(BbResult?.probability).toBe(0.5);
    
    expect(result.phenotypeResults).toHaveLength(2);
    expect(result.phenotypeResults.find(p => p.phenotype === 'Black')?.probability).toBe(1.0);
    expect(result.phenotypeResults.find(p => p.phenotype === 'White')?.probability).toBe(0.0);
  });
});