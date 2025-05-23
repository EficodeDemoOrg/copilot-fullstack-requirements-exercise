export type Genotype = 'BB' | 'Bb' | 'bB' | 'bb';
export type Phenotype = 'Black' | 'White';

interface GenotypeResult {
  genotype: Genotype;
  probability: number;
}

interface PhenotypeResult {
  phenotype: Phenotype;
  probability: number;
}

export interface GeneticsResults {
  genotypeResults: GenotypeResult[];
  phenotypeResults: PhenotypeResult[];
}

/**
 * Calculates genotype and phenotype probabilities using Punnett Square logic
 */
export class GeneticsCalculator {
  /**
   * Calculate the probability of offspring genotypes based on parent genotypes
   * @param parent1Genotype - First parent's genotype ('BB', 'Bb', 'bB', or 'bb')
   * @param parent2Genotype - Second parent's genotype ('BB', 'Bb', 'bB', or 'bb')
   * @returns Object with genotype results and phenotype results
   */
  static calculateOffspringProbabilities(
    parent1Genotype: Genotype,
    parent2Genotype: Genotype
  ): GeneticsResults {
    // Normalize Bb and bB to be the same (both are heterozygous)
    const normalizedParent1 = this.normalizeGenotype(parent1Genotype);
    const normalizedParent2 = this.normalizeGenotype(parent2Genotype);
    
    // Get alleles from parent genotypes
    const parent1Alleles = normalizedParent1.split('');
    const parent2Alleles = normalizedParent2.split('');
    
    // Calculate genotype distribution using Punnett square logic
    const genotypeCount: Record<string, number> = {};
    const totalCombinations = parent1Alleles.length * parent2Alleles.length;
    
    // Create Punnett square by combining all possible alleles
    for (const allele1 of parent1Alleles) {
      for (const allele2 of parent2Alleles) {
        // Sort alleles to normalize the genotype (e.g., 'bB' becomes 'Bb')
        const offspringGenotype = this.normalizeGenotype(
          [allele1, allele2].sort().join('') as Genotype
        );
        genotypeCount[offspringGenotype] = (genotypeCount[offspringGenotype] || 0) + 1;
      }
    }
    
    // Calculate genotype probabilities
    const genotypeResults: GenotypeResult[] = Object.keys(genotypeCount).map((genotype) => ({
      genotype: genotype as Genotype,
      probability: genotypeCount[genotype] / totalCombinations
    }));
    
    // Calculate phenotype probabilities
    const phenotypeResults: PhenotypeResult[] = this.calculatePhenotypeProbabilities(genotypeResults);
    
    return { genotypeResults, phenotypeResults };
  }
  
  /**
   * Normalize genotype to ensure consistent format (Bb instead of bB)
   */
  private static normalizeGenotype(genotype: Genotype): Genotype {
    if (genotype === 'bB') {
      return 'Bb';
    }
    return genotype;
  }
  
  /**
   * Calculate phenotype probabilities from genotype probabilities
   */
  private static calculatePhenotypeProbabilities(
    genotypeResults: GenotypeResult[]
  ): PhenotypeResult[] {
    const phenotypeProbabilities: Record<Phenotype, number> = {
      Black: 0,
      White: 0
    };
    
    // Map genotypes to phenotypes according to dominance rules
    // BB and Bb produce Black phenotype, bb produces White phenotype
    for (const result of genotypeResults) {
      if (result.genotype === 'BB' || result.genotype === 'Bb') {
        phenotypeProbabilities.Black += result.probability;
      } else if (result.genotype === 'bb') {
        phenotypeProbabilities.White += result.probability;
      }
    }
    
    // Convert to array format
    return Object.entries(phenotypeProbabilities).map(([phenotype, probability]) => ({
      phenotype: phenotype as Phenotype,
      probability
    }));
  }
}