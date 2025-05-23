import express from 'express';
import { calculateProbabilities } from '../controllers/geneticsController';

const router = express.Router();

/**
 * @route POST /api/genetics/calculate
 * @desc Calculate offspring genotype and phenotype probabilities
 * @body {parent1Genotype, parent2Genotype}
 * @returns {genotypeResults, phenotypeResults}
 */
router.post('/calculate', calculateProbabilities);

export default router;