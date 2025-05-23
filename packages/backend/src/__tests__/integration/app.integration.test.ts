import request from 'supertest';
import app from '../../index';

describe('Integration Tests - Full Application', () => {
  
  describe('Server Integration', () => {
    
    test('Health endpoint should be available', async () => {
      const response = await request(app).get('/health');
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ status: 'ok' });
    });
    
    test('Should handle full request-response cycle through the app', async () => {
      const response = await request(app)
        .post('/api/genetics/calculate')
        .send({
          parent1Genotype: 'Bb',
          parent2Genotype: 'Bb'
        });
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('genotypeResults');
      expect(response.body).toHaveProperty('phenotypeResults');
    });
    
    test('Should handle CORS headers properly', async () => {
      const response = await request(app)
        .post('/api/genetics/calculate')
        .send({
          parent1Genotype: 'Bb',
          parent2Genotype: 'Bb'
        });
      
      expect(response.status).toBe(200);
      expect(response.headers['access-control-allow-origin']).toBeDefined();
    });
    
    test('Should handle invalid routes gracefully', async () => {
      const response = await request(app)
        .post('/api/invalid/route')
        .send({
          parent1Genotype: 'Bb',
          parent2Genotype: 'Bb'
        });
      
      expect(response.status).toBe(404);
    });
    
    test('Should handle invalid HTTP methods on valid routes', async () => {
      const response = await request(app)
        .get('/api/genetics/calculate')
        .send({
          parent1Genotype: 'Bb',
          parent2Genotype: 'Bb'
        });
      
      expect(response.status).toBe(404);
    });
  });
  
  describe('Data Flow Integration', () => {
    
    test('Should maintain data consistency through the entire stack', async () => {
      // Test multiple requests to ensure consistent behavior
      const testCases = [
        { p1: 'BB', p2: 'BB', expectedBB: 1.0, expectedBb: 0.0, expectedbb: 0.0 },
        { p1: 'BB', p2: 'bb', expectedBB: 0.0, expectedBb: 1.0, expectedbb: 0.0 },
        { p1: 'Bb', p2: 'Bb', expectedBB: 0.25, expectedBb: 0.5, expectedbb: 0.25 },
        { p1: 'bb', p2: 'bb', expectedBB: 0.0, expectedBb: 0.0, expectedbb: 1.0 }
      ];
      
      for (const testCase of testCases) {
        const response = await request(app)
          .post('/api/genetics/calculate')
          .send({
            parent1Genotype: testCase.p1,
            parent2Genotype: testCase.p2
          });
        
        expect(response.status).toBe(200);
        
        const BBResult = response.body.genotypeResults.find((r: any) => r.genotype === 'BB');
        const BbResult = response.body.genotypeResults.find((r: any) => r.genotype === 'Bb');
        const bbResult = response.body.genotypeResults.find((r: any) => r.genotype === 'bb');
        
        expect(BBResult?.probability || 0).toBeCloseTo(testCase.expectedBB, 10);
        expect(BbResult?.probability || 0).toBeCloseTo(testCase.expectedBb, 10);
        expect(bbResult?.probability || 0).toBeCloseTo(testCase.expectedbb, 10);
      }
    });
    
    test('Should handle stress testing with rapid successive requests', async () => {
      const rapidRequests = Array.from({ length: 50 }, (_, i) => 
        request(app)
          .post('/api/genetics/calculate')
          .send({
            parent1Genotype: 'Bb',
            parent2Genotype: 'Bb'
          })
      );
      
      const responses = await Promise.all(rapidRequests);
      
      responses.forEach((response, index) => {
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('genotypeResults');
        expect(response.body).toHaveProperty('phenotypeResults');
        
        // Verify consistency across all responses
        const blackResult = response.body.phenotypeResults.find((r: any) => r.phenotype === 'Black');
        const whiteResult = response.body.phenotypeResults.find((r: any) => r.phenotype === 'White');
        
        expect(blackResult.probability).toBe(0.75);
        expect(whiteResult.probability).toBe(0.25);
      });
    });
  });
  
  describe('Error Handling Integration', () => {
    
    test('Should handle middleware errors gracefully', async () => {
      // Test with completely malformed request
      const response = await request(app)
        .post('/api/genetics/calculate')
        .set('Content-Type', 'application/json')
        .send('invalid json');
      
      expect(response.status).toBe(400);
    });
    
    test('Should handle different content types', async () => {
      // Test with JSON content-type
      const jsonResponse = await request(app)
        .post('/api/genetics/calculate')
        .send({
          parent1Genotype: 'Bb',
          parent2Genotype: 'Bb'
        });
      
      expect(jsonResponse.status).toBe(200);
      expect(jsonResponse.body).toHaveProperty('genotypeResults');
      expect(jsonResponse.body).toHaveProperty('phenotypeResults');
      
      // Test with form-encoded content-type
      const formResponse = await request(app)
        .post('/api/genetics/calculate')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send('parent1Genotype=Bb&parent2Genotype=Bb');
      
      expect(formResponse.status).toBe(200);
      expect(formResponse.body).toHaveProperty('genotypeResults');
      expect(formResponse.body).toHaveProperty('phenotypeResults');
    });
  });
  
  describe('Performance Integration Tests', () => {
    
    test('Should handle concurrent load effectively', async () => {
      const concurrentRequests = 20;
      const startTime = Date.now();
      
      const promises = Array.from({ length: concurrentRequests }, () =>
        request(app)
          .post('/api/genetics/calculate')
          .send({
            parent1Genotype: 'Bb',
            parent2Genotype: 'Bb'
          })
      );
      
      const responses = await Promise.all(promises);
      const endTime = Date.now();
      const totalTime = endTime - startTime;
      
      // All requests should succeed
      responses.forEach(response => {
        expect(response.status).toBe(200);
      });
      
      // Should complete all requests within reasonable time
      expect(totalTime).toBeLessThan(2000); // 2 seconds for 20 concurrent requests
    });
  });
});

describe('API Contract Compliance Tests', () => {
  
  describe('Response Schema Validation', () => {
    
    test('Should always return consistent response schema', async () => {
      const response = await request(app)
        .post('/api/genetics/calculate')
        .send({
          parent1Genotype: 'Bb',
          parent2Genotype: 'Bb'
        });
      
      expect(response.status).toBe(200);
      
      // Validate response structure matches expected API contract
      expect(response.body).toMatchObject({
        genotypeResults: expect.arrayContaining([
          expect.objectContaining({
            genotype: expect.stringMatching(/^(BB|Bb|bb)$/),
            probability: expect.any(Number)
          })
        ]),
        phenotypeResults: expect.arrayContaining([
          expect.objectContaining({
            phenotype: expect.stringMatching(/^(Black|White)$/),
            probability: expect.any(Number)
          })
        ])
      });
    });
    
    test('Should never return undefined or null in results', async () => {
      const response = await request(app)
        .post('/api/genetics/calculate')
        .send({
          parent1Genotype: 'Bb',
          parent2Genotype: 'Bb'
        });
      
      expect(response.status).toBe(200);
      
      // Check that no values are undefined or null
      response.body.genotypeResults.forEach((result: any) => {
        expect(result.genotype).toBeDefined();
        expect(result.genotype).not.toBeNull();
        expect(result.probability).toBeDefined();
        expect(result.probability).not.toBeNull();
      });
      
      response.body.phenotypeResults.forEach((result: any) => {
        expect(result.phenotype).toBeDefined();
        expect(result.phenotype).not.toBeNull();
        expect(result.probability).toBeDefined();
        expect(result.probability).not.toBeNull();
      });
    });
  });
  
  describe('Error Response Schema Validation', () => {
    
    test('Should return consistent error schema for validation errors', async () => {
      const response = await request(app)
        .post('/api/genetics/calculate')
        .send({
          parent1Genotype: 'INVALID',
          parent2Genotype: 'Bb'
        });
      
      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({
        error: expect.any(String)
      });
      expect(response.body.error.length).toBeGreaterThan(0);
    });
    
    test('Should return consistent error schema for missing fields', async () => {
      const response = await request(app)
        .post('/api/genetics/calculate')
        .send({
          parent1Genotype: 'Bb'
          // Missing parent2Genotype
        });
      
      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({
        error: expect.any(String)
      });
      expect(response.body.error).toContain('required');
    });
  });
});
