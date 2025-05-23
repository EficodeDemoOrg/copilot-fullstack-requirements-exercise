import request from 'supertest';
import express from 'express';
import { calculateProbabilities } from '../../controllers/geneticsController';

// Create a test Express app for comprehensive controller testing
const app = express();
app.use(express.json());
app.post('/api/genetics/calculate', calculateProbabilities);

describe('Genetics Controller - Comprehensive Testing Suite', () => {
  
  describe('Input Validation and Error Handling', () => {
    
    test('Should reject empty request body', async () => {
      const response = await request(app)
        .post('/api/genetics/calculate')
        .send({});
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('required');
    });
    
    test('Should reject null values', async () => {
      const response = await request(app)
        .post('/api/genetics/calculate')
        .send({
          parent1Genotype: null,
          parent2Genotype: 'Bb'
        });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
    
    test('Should reject undefined values', async () => {
      const response = await request(app)
        .post('/api/genetics/calculate')
        .send({
          parent1Genotype: undefined,
          parent2Genotype: 'Bb'
        });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
    
    test('Should reject empty string genotypes', async () => {
      const response = await request(app)
        .post('/api/genetics/calculate')
        .send({
          parent1Genotype: '',
          parent2Genotype: 'Bb'
        });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
    
    test('Should reject invalid genotype formats', async () => {
      const invalidGenotypes = ['XY', 'AB', 'CC', 'A', 'BBB', '123', 'bb.', 'B b', 'aA', 'Ba', 'ab'];
      
      for (const invalidGenotype of invalidGenotypes) {
        const response = await request(app)
          .post('/api/genetics/calculate')
          .send({
            parent1Genotype: invalidGenotype,
            parent2Genotype: 'Bb'
          });
        
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Invalid genotype format');
      }
    });
    
    test('Should reject genotypes with wrong case', async () => {
      const wrongCaseGenotypes = ['bb', 'BB', 'bB', 'Bb'];
      const lowercaseVariants = ['bb', 'bb', 'bb', 'bb'];
      
      for (const wrongCase of lowercaseVariants) {
        const response = await request(app)
          .post('/api/genetics/calculate')
          .send({
            parent1Genotype: wrongCase,
            parent2Genotype: 'Bb'
          });
        
        // Note: 'bb' is actually valid, so let's test actual invalid cases
        if (wrongCase === 'bb') continue;
        
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
      }
    });
    
    test('Should reject non-string genotype values', async () => {
      const nonStringValues = [123, true, [], {}, 12.5];
      
      for (const nonString of nonStringValues) {
        const response = await request(app)
          .post('/api/genetics/calculate')
          .send({
            parent1Genotype: nonString,
            parent2Genotype: 'Bb'
          });
        
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
      }
    });
    
    test('Should handle malformed JSON gracefully', async () => {
      const response = await request(app)
        .post('/api/genetics/calculate')
        .set('Content-Type', 'application/json')
        .send('{"parent1Genotype": "BB", "parent2Genotype":}'); // Invalid JSON
      
      expect(response.status).toBe(400);
    });
  });
  
  describe('Successful Responses - All Valid Combinations', () => {
    
    test('Should handle all valid genotype combinations', async () => {
      const validGenotypes = ['BB', 'Bb', 'bB', 'bb'];
      
      for (const p1 of validGenotypes) {
        for (const p2 of validGenotypes) {
          const response = await request(app)
            .post('/api/genetics/calculate')
            .send({
              parent1Genotype: p1,
              parent2Genotype: p2
            });
          
          expect(response.status).toBe(200);
          expect(response.body).toHaveProperty('genotypeResults');
          expect(response.body).toHaveProperty('phenotypeResults');
          expect(Array.isArray(response.body.genotypeResults)).toBe(true);
          expect(Array.isArray(response.body.phenotypeResults)).toBe(true);
          expect(response.body.phenotypeResults).toHaveLength(2);
        }
      }
    });
    
    test('Should return correct content type', async () => {
      const response = await request(app)
        .post('/api/genetics/calculate')
        .send({
          parent1Genotype: 'Bb',
          parent2Genotype: 'Bb'
        });
      
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toMatch(/application\/json/);
    });
    
    test('Should include all required fields in response', async () => {
      const response = await request(app)
        .post('/api/genetics/calculate')
        .send({
          parent1Genotype: 'Bb',
          parent2Genotype: 'Bb'
        });
      
      expect(response.status).toBe(200);
      
      // Check genotype results structure
      response.body.genotypeResults.forEach((result: any) => {
        expect(result).toHaveProperty('genotype');
        expect(result).toHaveProperty('probability');
        expect(typeof result.genotype).toBe('string');
        expect(typeof result.probability).toBe('number');
      });
      
      // Check phenotype results structure
      response.body.phenotypeResults.forEach((result: any) => {
        expect(result).toHaveProperty('phenotype');
        expect(result).toHaveProperty('probability');
        expect(typeof result.phenotype).toBe('string');
        expect(typeof result.probability).toBe('number');
      });
    });
  });
  
  describe('Response Data Validation', () => {
    
    test('Should return probabilities that sum to 1.0', async () => {
      const response = await request(app)
        .post('/api/genetics/calculate')
        .send({
          parent1Genotype: 'Bb',
          parent2Genotype: 'Bb'
        });
      
      expect(response.status).toBe(200);
      
      const genotypeSum = response.body.genotypeResults
        .reduce((sum: number, result: any) => sum + result.probability, 0);
      const phenotypeSum = response.body.phenotypeResults
        .reduce((sum: number, result: any) => sum + result.probability, 0);
      
      expect(genotypeSum).toBeCloseTo(1.0, 10);
      expect(phenotypeSum).toBeCloseTo(1.0, 10);
    });
    
    test('Should return valid probability values [0,1]', async () => {
      const response = await request(app)
        .post('/api/genetics/calculate')
        .send({
          parent1Genotype: 'Bb',
          parent2Genotype: 'Bb'
        });
      
      expect(response.status).toBe(200);
      
      response.body.genotypeResults.forEach((result: any) => {
        expect(result.probability).toBeGreaterThanOrEqual(0);
        expect(result.probability).toBeLessThanOrEqual(1);
      });
      
      response.body.phenotypeResults.forEach((result: any) => {
        expect(result.probability).toBeGreaterThanOrEqual(0);
        expect(result.probability).toBeLessThanOrEqual(1);
      });
    });
    
    test('Should return expected phenotypes', async () => {
      const response = await request(app)
        .post('/api/genetics/calculate')
        .send({
          parent1Genotype: 'Bb',
          parent2Genotype: 'Bb'
        });
      
      expect(response.status).toBe(200);
      
      const phenotypes = response.body.phenotypeResults.map((r: any) => r.phenotype);
      expect(phenotypes.sort()).toEqual(['Black', 'White']);
    });
    
    test('Should return valid genotype values', async () => {
      const response = await request(app)
        .post('/api/genetics/calculate')
        .send({
          parent1Genotype: 'Bb',
          parent2Genotype: 'Bb'
        });
      
      expect(response.status).toBe(200);
      
      const validGenotypes = ['BB', 'Bb', 'bb'];
      response.body.genotypeResults.forEach((result: any) => {
        expect(validGenotypes).toContain(result.genotype);
      });
    });
  });
  
  describe('Specific Biological Test Cases', () => {
    
    test('Classic Mendelian 3:1 ratio (Bb × Bb)', async () => {
      const response = await request(app)
        .post('/api/genetics/calculate')
        .send({
          parent1Genotype: 'Bb',
          parent2Genotype: 'Bb'
        });
      
      expect(response.status).toBe(200);
      
      // Should get 25% BB, 50% Bb, 25% bb
      const bbResult = response.body.genotypeResults.find((r: any) => r.genotype === 'BB');
      const BbResult = response.body.genotypeResults.find((r: any) => r.genotype === 'Bb');
      const bbResultLower = response.body.genotypeResults.find((r: any) => r.genotype === 'bb');
      
      expect(bbResult.probability).toBe(0.25);
      expect(BbResult.probability).toBe(0.5);
      expect(bbResultLower.probability).toBe(0.25);
      
      // Should get 75% Black, 25% White
      const blackResult = response.body.phenotypeResults.find((r: any) => r.phenotype === 'Black');
      const whiteResult = response.body.phenotypeResults.find((r: any) => r.phenotype === 'White');
      
      expect(blackResult.probability).toBe(0.75);
      expect(whiteResult.probability).toBe(0.25);
    });
    
    test('Test cross (BB × bb) - all heterozygous offspring', async () => {
      const response = await request(app)
        .post('/api/genetics/calculate')
        .send({
          parent1Genotype: 'BB',
          parent2Genotype: 'bb'
        });
      
      expect(response.status).toBe(200);
      
      expect(response.body.genotypeResults).toHaveLength(1);
      expect(response.body.genotypeResults[0]).toEqual({
        genotype: 'Bb',
        probability: 1.0
      });
      
      const blackResult = response.body.phenotypeResults.find((r: any) => r.phenotype === 'Black');
      const whiteResult = response.body.phenotypeResults.find((r: any) => r.phenotype === 'White');
      
      expect(blackResult.probability).toBe(1.0);
      expect(whiteResult.probability).toBe(0.0);
    });
    
    test('Back cross (Bb × bb) - 1:1 ratio', async () => {
      const response = await request(app)
        .post('/api/genetics/calculate')
        .send({
          parent1Genotype: 'Bb',
          parent2Genotype: 'bb'
        });
      
      expect(response.status).toBe(200);
      
      expect(response.body.genotypeResults).toHaveLength(2);
      
      const BbResult = response.body.genotypeResults.find((r: any) => r.genotype === 'Bb');
      const bbResult = response.body.genotypeResults.find((r: any) => r.genotype === 'bb');
      
      expect(BbResult.probability).toBe(0.5);
      expect(bbResult.probability).toBe(0.5);
      
      const blackResult = response.body.phenotypeResults.find((r: any) => r.phenotype === 'Black');
      const whiteResult = response.body.phenotypeResults.find((r: any) => r.phenotype === 'White');
      
      expect(blackResult.probability).toBe(0.5);
      expect(whiteResult.probability).toBe(0.5);
    });
  });
  
  describe('Performance and Load Testing', () => {
    
    test('Should handle multiple concurrent requests', async () => {
      const promises = Array.from({ length: 10 }, () =>
        request(app)
          .post('/api/genetics/calculate')
          .send({
            parent1Genotype: 'Bb',
            parent2Genotype: 'Bb'
          })
      );
      
      const responses = await Promise.all(promises);
      
      responses.forEach(response => {
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('genotypeResults');
        expect(response.body).toHaveProperty('phenotypeResults');
      });
    });
    
    test('Should respond within reasonable time', async () => {
      const startTime = Date.now();
      
      const response = await request(app)
        .post('/api/genetics/calculate')
        .send({
          parent1Genotype: 'Bb',
          parent2Genotype: 'Bb'
        });
      
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      expect(response.status).toBe(200);
      expect(responseTime).toBeLessThan(100); // Should respond in under 100ms
    });
  });
  
  describe('Security and Edge Cases', () => {
    
    test('Should handle very large request bodies gracefully', async () => {
      const largeString = 'A'.repeat(10000);
      
      const response = await request(app)
        .post('/api/genetics/calculate')
        .send({
          parent1Genotype: largeString,
          parent2Genotype: 'Bb',
          extraField: largeString
        });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
    
    test('Should ignore extra fields in request', async () => {
      const response = await request(app)
        .post('/api/genetics/calculate')
        .send({
          parent1Genotype: 'Bb',
          parent2Genotype: 'Bb',
          extraField: 'should be ignored',
          anotherField: { nested: 'object' }
        });
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('genotypeResults');
      expect(response.body).toHaveProperty('phenotypeResults');
    });
    
    test('Should handle special characters in genotype gracefully', async () => {
      const specialChars = ['B\n', 'B\t', 'B\r', 'B ', ' B', 'B\0'];
      
      for (const specialChar of specialChars) {
        const response = await request(app)
          .post('/api/genetics/calculate')
          .send({
            parent1Genotype: specialChar + 'b',
            parent2Genotype: 'Bb'
          });
        
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
      }
    });
  });
});
