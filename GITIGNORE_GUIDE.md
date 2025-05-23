# .gitignore Configuration Guide

## Overview
This project uses a comprehensive three-tier .gitignore strategy to ensure proper version control hygiene across the fullstack monorepo.

## Structure

### 1. Root Level (.gitignore)
**Location:** `/`  
**Purpose:** Manages monorepo-wide exclusions and common patterns
**Covers:**
- Global dependencies and build artifacts
- Common cache directories
- CI/CD artifacts
- Documentation builds
- Security-sensitive files

### 2. Frontend Package (.gitignore)
**Location:** `/packages/frontend/`  
**Purpose:** Frontend-specific exclusions for React + Vite + Cypress setup
**Covers:**
- Vite build outputs (`dist/`, `dist-ssr/`)
- Cypress artifacts (`videos/`, `screenshots/`, `downloads/`)
- Frontend testing outputs
- Parcel/Rollup cache
- Storybook builds
- Deployment platform files (Vercel, Netlify)

### 3. Backend Package (.gitignore)
**Location:** `/packages/backend/`  
**Purpose:** Backend-specific exclusions for Node.js API server
**Covers:**
- API build outputs
- Database files
- Upload directories
- Session storage
- API documentation builds
- SSL certificates
- PM2 configurations

## Key Features

### Cypress Testing Integration
- Excludes test videos, screenshots, downloads
- Preserves test configuration files
- Maintains test reports structure

### Development Environment Support
- Flexible environment variable handling
- Editor configuration preservation
- OS-specific file exclusions

### Security Considerations
- SSL certificates and keys
- API secrets and tokens
- Database files
- Session storage

### CI/CD Compatibility
- Build artifact management
- Cache optimization
- Testing output handling

## Package Manager Flexibility
Lock files are commented out in all .gitignore files to support different package manager preferences:
- npm: Uncomment `package-lock.json` exclusion
- yarn: Uncomment `yarn.lock` exclusion  
- pnpm: Uncomment `pnpm-lock.yaml` exclusion

## Best Practices Applied

1. **Hierarchical Organization**: Root → Package → Specific overrides
2. **Comprehensive Coverage**: Development, testing, deployment, security
3. **Tool-Specific Sections**: Clear categorization for maintainability
4. **Performance Optimization**: Cache and temporary file exclusions
5. **Security-First**: Sensitive data and credential protection

## Maintenance
- Review .gitignore files when adding new tools or dependencies
- Test exclusion patterns with `git check-ignore <file>` command
- Update documentation when modifying ignore patterns
- Regularly audit tracked files for accidental inclusions

## Validation Commands
```bash
# Check if a file is ignored
git check-ignore <filename>

# List all ignored files in directory
git ls-files --others --ignored --exclude-standard

# Show ignored files with their ignore source
git check-ignore -v <filename>
```
