"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const geneticsController_1 = require("../controllers/geneticsController");
const router = express_1.default.Router();
/**
 * @route POST /api/genetics/calculate
 * @desc Calculate offspring genotype and phenotype probabilities
 * @body {parent1Genotype, parent2Genotype}
 * @returns {genotypeResults, phenotypeResults}
 */
router.post('/calculate', geneticsController_1.calculateProbabilities);
exports.default = router;
