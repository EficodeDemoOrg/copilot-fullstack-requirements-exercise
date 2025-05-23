# Backend API for Genetics Calculator

This backend service provides REST API endpoints for calculating genotype and phenotype probabilities using Punnett Square logic.

## Setup

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

```bash
npm install
```

## Running the Application

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm start
```

## API Endpoints

### Calculate Offspring Probabilities

Calculate genotype and phenotype probabilities for offspring based on parent genotypes.

**Endpoint:** `POST /api/genetics/calculate`

**Request Body:**

```json
{
  "parent1Genotype": "BB", // Must be one of: "BB", "Bb", "bB", "bb"
  "parent2Genotype": "Bb"  // Must be one of: "BB", "Bb", "bB", "bb"
}
```

**Response:**

```json
{
  "genotypeResults": [
    {
      "genotype": "BB",
      "probability": 0.5
    },
    {
      "genotype": "Bb",
      "probability": 0.5
    }
  ],
  "phenotypeResults": [
    {
      "phenotype": "Black",
      "probability": 1.0
    },
    {
      "phenotype": "White",
      "probability": 0.0
    }
  ]
}
```

## Testing

Run tests with:

```bash
npm test
```

## Implementation Details

The backend implements Punnett Square logic for calculating:

1. Offspring genotype probabilities (BB, Bb, bb)
2. Offspring phenotype probabilities (Black, White)

Assumptions:
- B is dominant (Black coat color)
- b is recessive (White coat color)
- BB and Bb genotypes produce Black phenotype
- bb genotype produces White phenotype