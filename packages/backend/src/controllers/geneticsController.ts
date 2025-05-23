import { Request, Response } from 'express';
import { GeneticsCalculator, Genotype } from '../models/genetics';

/**
 * Calculate genotype and phenotype probabilities for offspring
 */
export const calculateProbabilities = (req: Request, res: Response): void => {
  try {
    const { parent1Genotype, parent2Genotype } = req.body;
    
    // Validate input
    if (!parent1Genotype || !parent2Genotype) {
      res.status(400).json({
        error: 'Both parent1Genotype and parent2Genotype are required'
      });
      return;
    }
    
    // Validate genotype format
    const validGenotypes: Genotype[] = ['BB', 'Bb', 'bB', 'bb'];
    if (!validGenotypes.includes(parent1Genotype) || !validGenotypes.includes(parent2Genotype)) {
      res.status(400).json({
        error: 'Invalid genotype format. Must be BB, Bb, bB, or bb'
      });
      return;
    }
    
    // Calculate probabilities using the Punnett Square model
    const results = GeneticsCalculator.calculateOffspringProbabilities(
      parent1Genotype as Genotype,
      parent2Genotype as Genotype
    );
    
    // Return both genotype and phenotype probabilities
    res.status(200).json(results);
  } catch (error: any) {
    res.status(500).json({
      error: 'An error occurred while calculating probabilities',
      message: error.message
    });
  }
};