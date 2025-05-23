# Gene Weaver Backlog & Testing Strategy

## User Stories & Tasks

### Frontend

- [x] UI for selecting parent genotypes (BB, Bb, bb)
- [x] Display offspring genotype probabilities visually
- [x] Display offspring phenotype probabilities visually
- [x] Interactive updates on genotype selection

### Backend

- [ ] REST API endpoint to calculate offspring genotype probabilities
- [ ] REST API endpoint to calculate offspring phenotype probabilities
- [ ] Implement Punnett Square logic

## Testing Requirements

### Unit Tests (Jest)

#### Frontend
- [x] Component rendering tests
- [x] Interaction tests (selecting genotypes, updating visuals)

#### Backend
- [ ] Punnett Square logic tests
- [ ] API endpoint tests (using Jest & Supertest)

### End-to-End Tests (Cypress)

- [x] User selects parent genotypes and sees correct offspring probabilities
- [x] UI updates correctly upon interaction
