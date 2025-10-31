#!/bin/bash

# Workflow Health Check Script
# This script checks if the development environment is properly configured for CI/CD workflows

echo "🔍 YanYu Cloud³ Workflow Health Check"
echo "======================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counters
PASSED=0
FAILED=0
WARNINGS=0

# Helper functions
check_pass() {
    echo -e "${GREEN}✓${NC} $1"
    ((PASSED++))
}

check_fail() {
    echo -e "${RED}✗${NC} $1"
    ((FAILED++))
}

check_warn() {
    echo -e "${YELLOW}⚠${NC} $1"
    ((WARNINGS++))
}

# Check Node.js version
echo "1. Checking Node.js installation..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    NODE_MAJOR=$(echo $NODE_VERSION | cut -d'.' -f1 | sed 's/v//')
    if [ "$NODE_MAJOR" -ge 18 ]; then
        check_pass "Node.js $NODE_VERSION (>= 18.0.0 required)"
    else
        check_fail "Node.js $NODE_VERSION is installed but version 18.0.0 or higher is required"
    fi
else
    check_fail "Node.js is not installed"
fi
echo ""

# Check npm
echo "2. Checking npm installation..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    check_pass "npm $NPM_VERSION"
else
    check_fail "npm is not installed"
fi
echo ""

# Check for package.json files
echo "3. Checking project structure..."
if [ -f "package.json" ]; then
    check_pass "Root package.json found"
else
    check_fail "Root package.json not found"
fi

if [ -f "backend/package.json" ]; then
    check_pass "Backend package.json found"
else
    check_fail "Backend package.json not found"
fi
echo ""

# Check for node_modules
echo "4. Checking dependencies..."
if [ -d "node_modules" ]; then
    check_pass "Root dependencies installed"
else
    check_warn "Root dependencies not installed (run 'npm install')"
fi

if [ -d "backend/node_modules" ]; then
    check_pass "Backend dependencies installed"
else
    check_warn "Backend dependencies not installed (run 'cd backend && npm install')"
fi
echo ""

# Check TypeScript
echo "5. Checking TypeScript configuration..."
if [ -f "tsconfig.json" ]; then
    check_pass "Root tsconfig.json found"
else
    check_warn "Root tsconfig.json not found"
fi

if [ -f "backend/tsconfig.json" ]; then
    check_pass "Backend tsconfig.json found"
else
    check_fail "Backend tsconfig.json not found"
fi
echo ""

# Check ESLint configuration
echo "6. Checking ESLint configuration..."
if [ -f "backend/.eslintrc.json" ] || [ -f "backend/.eslintrc.js" ] || [ -f "backend/.eslintrc.yml" ]; then
    check_pass "Backend ESLint configuration found"
else
    check_fail "Backend ESLint configuration not found"
fi
echo ""

# Check workflow files
echo "7. Checking GitHub Actions workflows..."
if [ -f ".github/workflows/ci-cd.yml" ]; then
    check_pass "CI/CD workflow found"
else
    check_fail "CI/CD workflow not found"
fi

if [ -f ".github/workflows/test-gate.yml" ]; then
    check_pass "Test gate workflow found"
else
    check_fail "Test gate workflow not found"
fi

if [ -f ".github/workflows/chromatic.yml" ]; then
    check_pass "Chromatic workflow found"
else
    check_warn "Chromatic workflow not found (optional)"
fi
echo ""

# Check environment files
echo "8. Checking environment configuration..."
if [ -f ".env.example" ]; then
    check_pass ".env.example found"
else
    check_warn ".env.example not found"
fi

if [ -f "backend/.env.example" ]; then
    check_pass "Backend .env.example found"
else
    check_warn "Backend .env.example not found"
fi

if [ -f ".env" ]; then
    check_warn ".env file exists (ensure it's in .gitignore)"
else
    check_warn ".env file not found (copy from .env.example if needed)"
fi
echo ""

# Check Docker configuration
echo "9. Checking Docker configuration..."
if command -v docker &> /dev/null; then
    DOCKER_VERSION=$(docker --version)
    check_pass "Docker installed: $DOCKER_VERSION"
else
    check_warn "Docker not installed (optional but recommended)"
fi

if [ -f "scripts/docker-compose.dev.yml" ]; then
    check_pass "Docker Compose development configuration found"
else
    check_warn "Docker Compose development configuration not found"
fi
echo ""

# Check test configuration
echo "10. Checking test configuration..."
if [ -f "jest.config.js" ]; then
    check_pass "Jest configuration found"
else
    check_warn "Jest configuration not found"
fi

if [ -f "playwright.config.ts" ]; then
    check_pass "Playwright configuration found"
else
    check_warn "Playwright configuration not found"
fi
echo ""

# Try to run basic checks
echo "11. Running basic validation checks..."
if [ -d "node_modules" ]; then
    if npm run type-check &> /dev/null; then
        check_pass "TypeScript type check passes"
    else
        check_warn "TypeScript type check has errors (expected in development)"
    fi
else
    check_warn "Cannot run type check (install dependencies first)"
fi

if [ -d "backend/node_modules" ]; then
    if (cd backend && npm run lint &> /dev/null); then
        check_pass "Backend linting passes"
    else
        check_warn "Backend linting has warnings/errors (expected in development)"
    fi
    
    if (cd backend && npm run type-check &> /dev/null); then
        check_pass "Backend type check passes"
    else
        check_warn "Backend type check has errors (expected in development)"
    fi
else
    check_warn "Cannot run backend checks (install dependencies first)"
fi
echo ""

# Check for required services (if Docker is available)
echo "12. Checking required services..."
if command -v docker &> /dev/null; then
    if docker ps | grep -q postgres; then
        check_pass "PostgreSQL service running"
    else
        check_warn "PostgreSQL service not running (start with Docker Compose)"
    fi
    
    if docker ps | grep -q redis; then
        check_pass "Redis service running"
    else
        check_warn "Redis service not running (start with Docker Compose)"
    fi
else
    check_warn "Cannot check services (Docker not available)"
fi
echo ""

# Summary
echo "======================================"
echo "Summary:"
echo "======================================"
echo -e "${GREEN}Passed:${NC} $PASSED"
echo -e "${YELLOW}Warnings:${NC} $WARNINGS"
echo -e "${RED}Failed:${NC} $FAILED"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ Workflow health check completed successfully!${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. Install dependencies if not already installed:"
    echo "     npm install && cd backend && npm install"
    echo "  2. Set up environment variables:"
    echo "     cp .env.example .env && cp backend/.env.example backend/.env"
    echo "  3. Start services with Docker Compose:"
    echo "     docker-compose -f scripts/docker-compose.dev.yml up -d"
    echo "  4. Run tests:"
    echo "     npm test"
    echo ""
    echo "For more information, see docs/WORKFLOWS.md"
    exit 0
else
    echo -e "${RED}✗ Workflow health check found issues that need to be addressed.${NC}"
    echo ""
    echo "Please fix the failed checks before proceeding."
    echo "For more information, see docs/WORKFLOWS.md"
    exit 1
fi
