import request from 'supertest';
import express from 'express';
import { calculateProbabilities } from '../../controllers/geneticsController';

// Create a test Express app for controller testing
const app = express();
app.use(express.json());
app.post('/api/genetics/calculate', calculateProbabilities);

describe('Genetics Controller', () => {
  // Test successful calculation
  test('POST /api/genetics/calculate should return correct probabilities', async () => {
    const response = await request(app)
      .post('/api/genetics/calculate')
      .send({
        parent1Genotype: 'Bb',
        parent2Genotype: 'Bb'
      });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('genotypeResults');
    expect(response.body).toHaveProperty('phenotypeResults');
    
    // Verify the expected 3:1 ratio (75% Black, 25% White)
    const blackPhenotype = response.body.phenotypeResults.find((p: any) => p.phenotype === 'Black');
    const whitePhenotype = response.body.phenotypeResults.find((p: any) => p.phenotype === 'White');
    
    expect(blackPhenotype.probability).toBe(0.75);
    expect(whitePhenotype.probability).toBe(0.25);
  });
  
  // Test missing genotype error
  test('POST /api/genetics/calculate should return 400 if genotypes are missing', async () => {
    const response = await request(app)
      .post('/api/genetics/calculate')
      .send({
        parent1Genotype: 'Bb'
        // Missing parent2Genotype
      });
    
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
  
  // Test invalid genotype format
  test('POST /api/genetics/calculate should return 400 if genotypes are invalid', async () => {
    const response = await request(app)
      .post('/api/genetics/calculate')
      .send({
        parent1Genotype: 'XY', // Invalid genotype
        parent2Genotype: 'Bb'
      });
    
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});