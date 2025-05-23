# Gene Weaver E2E Test Execution Guide

## 🚀 Quick Start Commands

### Prerequisites Check
```bash
# Verify you're in the correct directory
pwd
# Should show: /Users/rasmuspaltschik/Projects/Valtori/fullstack-group-exercise

# Check Node.js version
node --version
# Should be v18+ for best compatibility
```

### 1. Fix Support File Issue (CRITICAL - Do This First!)
```bash
cd packages/frontend

# Remove duplicate JavaScript files (keep TypeScript versions)
rm cypress/support/e2e.js
rm cypress/support/commands.js

# Verify only TypeScript files remain
ls -la cypress/support/
# Should show: commands.ts, e2e.ts
```

### 2. Start Development Servers

#### Terminal 1: Frontend Server
```bash
cd packages/frontend
npm run dev
# Wait for: "Local: http://localhost:5173/"
```

#### Terminal 2: Backend Server
```bash
cd packages/backend
npm run dev
# Wait for: "Server running on port 3000"
```

### 3. Execute Cypress Tests

#### Option A: Headless Mode (Full Suite)
```bash
cd packages/frontend
npm run cypress:run
```

#### Option B: Interactive Mode (Debugging)
```bash
cd packages/frontend
npm run cypress:open
```

---

## 🧪 Test Execution Strategies

### Strategy 1: Full Test Suite (Recommended for CI/CD)
```bash
# Run all tests in headless mode
npm run cypress:run

# With specific browser
npm run cypress:run -- --browser chrome
npm run cypress:run -- --browser firefox
npm run cypress:run -- --browser edge
```

### Strategy 2: Category-Based Testing
```bash
# Run only core functionality tests
npx cypress run --spec "cypress/e2e/core/**/*.cy.ts"

# Run only accessibility tests
npx cypress run --spec "cypress/e2e/accessibility/**/*.cy.ts"

# Run only performance tests
npx cypress run --spec "cypress/e2e/performance/**/*.cy.ts"

# Run only integration tests
npx cypress run --spec "cypress/e2e/integration/**/*.cy.ts"
```

### Strategy 3: Individual Test Files
```bash
# Run specific test file
npx cypress run --spec "cypress/e2e/core/genetic-calculations.cy.ts"

# Run with specific viewport
npx cypress run --spec "cypress/e2e/core/ui-interactions.cy.ts" --config viewportWidth=1920,viewportHeight=1080
```

---

## 🔍 Debugging Failed Tests

### Step 1: Check Screenshots and Videos
```bash
# View test artifacts
ls -la cypress/screenshots/
ls -la cypress/videos/

# Open screenshots in Finder (macOS)
open cypress/screenshots/

# Open videos in Finder (macOS)
open cypress/videos/
```

### Step 2: Run Individual Failed Tests in Interactive Mode
```bash
# Open Cypress in interactive mode
npm run cypress:open

# Then manually select and run failed test files
```

### Step 3: Check Console Outputs
```bash
# Frontend server logs (Terminal 1)
# Backend server logs (Terminal 2)
# Cypress test logs (Terminal 3)
```

### Step 4: Common Fixes for Failing Tests

#### Element Not Found Errors
```typescript
// If selectors are not working, update in test files:
// Old: cy.get('.some-class')
// New: cy.get('[data-testid="some-element"]')
```

#### Timing Issues
```typescript
// Add explicit waits in test files:
cy.get('.element').should('be.visible')
cy.wait(500) // Add small delays if needed
```

#### API Connection Issues
```bash
# Verify backend is accessible
curl http://localhost:3000/health
curl -X POST http://localhost:3000/api/genetics/calculate -H "Content-Type: application/json" -d '{"parent1Genotype":"Bb","parent2Genotype":"Bb"}'
```

---

## 📊 Test Results Analysis

### Understanding Test Output
```bash
# After test run, check summary:
# - Total tests run
# - Passed/Failed counts
# - Test duration
# - Screenshots/videos generated
```

### Key Metrics to Monitor
1. **Pass Rate**: Should be >90%
2. **Test Duration**: Should be <10 minutes total
3. **Performance Tests**: Load times <2 seconds
4. **Accessibility Tests**: No critical violations
5. **Cross-browser Tests**: Consistent behavior

### Test Result Files
```bash
# Cypress generates these artifacts:
cypress/screenshots/     # Failed test screenshots
cypress/videos/          # Test execution videos
mochawesome-report/      # HTML test reports (if configured)
```

---

## 🛠 Troubleshooting Common Issues

### Issue 1: "Support file not found"
```bash
# Solution: Ensure only TypeScript support files exist
rm cypress/support/e2e.js cypress/support/commands.js
```

### Issue 2: "Cannot connect to localhost:5173"
```bash
# Solution: Ensure frontend server is running
cd packages/frontend
npm run dev
```

### Issue 3: "Cannot connect to localhost:3000"
```bash
# Solution: Ensure backend server is running
cd packages/backend
npm run dev
```

### Issue 4: "Element not found" errors
```bash
# Solution: Run in interactive mode to inspect elements
npm run cypress:open
# Use Cypress selector playground to find correct selectors
```

### Issue 5: Tests are flaky/intermittent failures
```bash
# Solution: Add retry configuration
# In cypress.config.js, add:
# retries: { runMode: 2, openMode: 0 }
```

---

## 🎯 Test Completion Checklist

### Before Running Tests
- [ ] Frontend server running on port 5173
- [ ] Backend server running on port 3000
- [ ] Duplicate support files removed
- [ ] All dependencies installed (`npm install`)

### During Test Execution
- [ ] Monitor console for errors
- [ ] Check test progress in terminal
- [ ] Note any failing tests for later analysis

### After Test Completion
- [ ] Review pass/fail summary
- [ ] Check generated screenshots for UI issues
- [ ] Analyze performance test results
- [ ] Verify accessibility compliance
- [ ] Document any issues found

### Test Results Documentation
- [ ] Create test execution summary report
- [ ] List any failing tests with reasons
- [ ] Document performance baselines
- [ ] Note accessibility compliance status
- [ ] Recommend any fixes or improvements

---

## 📈 Expected Test Execution Time

| Test Category | Files | Tests | Est. Time |
|---------------|-------|-------|-----------|
| Core | 3 | ~25 | 3-4 min |
| Accessibility | 1 | ~10 | 1-2 min |
| Performance | 1 | ~8 | 2-3 min |
| Integration | 1 | ~15 | 2-3 min |
| Compatibility | 1 | ~12 | 1-2 min |
| Visual | 1 | ~8 | 1-2 min |
| Edge Cases | 1 | ~15 | 2-3 min |
| **Total** | **8** | **~93** | **12-19 min** |

---

## 🔄 Continuous Testing Workflow

### For Development
```bash
# Watch mode (re-run on file changes)
npx cypress run --headed --no-exit

# Or use interactive mode during development
npm run cypress:open
```

### For CI/CD Integration
```bash
# Full headless run with video recording
npm run cypress:run --record --key YOUR_CYPRESS_KEY

# With multiple browsers
npm run cypress:run -- --browser chrome
npm run cypress:run -- --browser firefox
```

---

## 📝 Next Steps After Successful Test Run

1. **Create Test Report**: Document all results and metrics
2. **Performance Baseline**: Establish performance benchmarks
3. **Fix Any Issues**: Address failing tests and improve coverage
4. **Maintenance Plan**: Schedule regular test execution
5. **Documentation**: Update project README with testing info

---

**Ready to continue? Start with fixing the support file issue and then run the full test suite!**
