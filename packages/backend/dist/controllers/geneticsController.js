"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateProbabilities = void 0;
const genetics_1 = require("../models/genetics");
/**
 * Calculate genotype and phenotype probabilities for offspring
 */
const calculateProbabilities = (req, res) => {
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
        const validGenotypes = ['BB', 'Bb', 'bB', 'bb'];
        if (!validGenotypes.includes(parent1Genotype) || !validGenotypes.includes(parent2Genotype)) {
            res.status(400).json({
                error: 'Invalid genotype format. Must be BB, Bb, bB, or bb'
            });
            return;
        }
        // Calculate probabilities using the Punnett Square model
        const results = genetics_1.GeneticsCalculator.calculateOffspringProbabilities(parent1Genotype, parent2Genotype);
        // Return both genotype and phenotype probabilities
        res.status(200).json(results);
    }
    catch (error) {
        res.status(500).json({
            error: 'An error occurred while calculating probabilities',
            message: error.message
        });
    }
};
exports.calculateProbabilities = calculateProbabilities;
