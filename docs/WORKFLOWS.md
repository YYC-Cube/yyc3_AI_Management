# GitHub Actions Workflows Documentation

## Overview

This repository uses GitHub Actions for continuous integration and continuous deployment (CI/CD). The workflows are designed to ensure code quality, run tests, and automate deployments.

## Workflows

### 1. CI/CD Pipeline (`ci-cd.yml`)

This is the main workflow that runs on pushes and pull requests to `main` and `develop` branches.

**Jobs:**

- **test**: Runs all backend tests with PostgreSQL and Redis services
  - Lints the code (non-blocking)
  - Performs type checking (non-blocking)
  - Runs database migrations
  - Executes unit tests with coverage
  - Runs cache, AI, and WebSocket tests (non-blocking)
  - Performs security scans
  - Runs integration tests (non-blocking)
  - Uploads coverage reports to Codecov
  
- **build**: Builds both frontend and backend
  - Builds Next.js frontend
  - Builds backend TypeScript code
  - Uploads build artifacts

- **docker**: Builds and pushes Docker images (only on `main` branch)
  - Uses Docker Buildx for multi-platform builds
  - Pushes to Docker Hub with proper tagging

- **deploy**: Deploys to production (only on `main` branch)
  - Performs rolling updates with zero downtime
  - Runs health checks
  - Executes smoke tests
  - Sends Slack notifications

- **preview**: Creates Vercel preview deployments for PRs
  - Deploys to Vercel preview environment
  - Creates a check run with the preview URL

**Key Features:**

- Uses `continue-on-error: true` for non-critical tests to allow the pipeline to complete even if some tests fail
- Provides comprehensive test coverage across different test suites
- Implements zero-downtime deployments with health checks
- Integrates with external services (Codecov, Docker Hub, Vercel, Slack)

### 2. Test Gate (`test-gate.yml`)

A comprehensive testing workflow that runs on multiple Node.js versions.

**Jobs:**

- **test**: Runs on Node.js 18.x and 20.x
  - Type checks the code
  - Lints the code
  - Runs unit tests with coverage
  - Checks coverage thresholds (80% minimum, non-blocking)
  - Runs integration tests (non-blocking)
  - Runs E2E tests with Playwright (non-blocking)
  - Uploads test artifacts and reports

- **security-scan**: Performs security audits
  - Runs npm audit (non-blocking)
  - Executes quality gate checks

- **performance-test**: Runs performance tests (only on `main` branch)
  - Uses k6 for load testing

- **deployment-ready**: Marks the build as ready for deployment
  - Only runs on `main` branch
  - Requires all other jobs to pass

**Key Features:**

- Matrix testing across multiple Node.js versions
- Comprehensive test coverage with detailed reporting
- Security scanning with npm audit
- Performance testing with k6
- Uploads test artifacts for debugging

### 3. Chromatic (`chromatic.yml`)

Visual regression testing for UI components.

**Jobs:**

- **chromatic**: Publishes to Chromatic
  - Performs visual regression testing
  - Auto-accepts changes on `main` branch
  - Exits with zero even if there are visual changes

## Configuration Requirements

### GitHub Secrets

The following secrets need to be configured in your GitHub repository:

#### For CI/CD Pipeline:
- `OPENAI_API_KEY_TEST`: OpenAI API key for testing
- `NEXT_PUBLIC_API_BASE_URL`: Frontend API base URL
- `DOCKER_USERNAME`: Docker Hub username
- `DOCKER_PASSWORD`: Docker Hub password
- `PRODUCTION_SSH_KEY`: SSH key for production deployment
- `PRODUCTION_USER`: Production server username
- `PRODUCTION_HOST`: Production server hostname
- `SLACK_WEBHOOK`: Slack webhook URL for notifications
- `SNYK_TOKEN`: Snyk authentication token (optional)
- `VERCEL_TOKEN`: Vercel deployment token (optional)
- `VERCEL_ORG_ID`: Vercel organization ID (optional)
- `VERCEL_PROJECT_ID`: Vercel project ID (optional)
- `VERCEL_SCOPE`: Vercel scope (optional)

#### For Chromatic:
- `CHROMATIC_PROJECT_TOKEN`: Chromatic project token

### Environment Variables

The workflows use the following environment variables:

- `NODE_VERSION`: Node.js version (default: 18.x)
- `DOCKER_IMAGE`: Docker image name (default: yanyu-reconciliation)

## Workflow Triggers

- **Push**: Runs on `main` and `develop` branches
- **Pull Request**: Runs on pull requests targeting `main` and `develop` branches

## Best Practices

1. **Non-blocking Tests**: Tests that might fail due to environmental issues (cache, AI, WebSocket) are set to `continue-on-error: true` to prevent blocking the entire pipeline.

2. **Coverage Thresholds**: The test gate checks for 80% code coverage, but this is non-blocking to allow development to continue while addressing coverage issues.

3. **Zero-downtime Deployments**: The deployment process uses rolling updates with health checks to ensure no service interruption.

4. **Artifact Retention**: Test results and build artifacts are retained for 7-30 days for debugging purposes.

5. **Security**: Regular security audits are performed, though they are non-blocking to allow for risk assessment.

## Troubleshooting

### Workflow Failures

If a workflow fails, check the following:

1. **Test Failures**: Review the test logs in the GitHub Actions UI
2. **Build Failures**: Check for TypeScript errors or dependency issues
3. **Deployment Failures**: Verify server access and health check endpoints
4. **Coverage Issues**: Review the coverage report to identify untested code

### Missing Secrets

If you see errors about missing secrets:

1. Go to your repository Settings > Secrets and variables > Actions
2. Add the required secrets as listed above
3. Re-run the failed workflow

### Service Connection Issues

If tests fail due to PostgreSQL or Redis connection issues:

1. Check the service health checks in the workflow logs
2. Verify the service configurations in the workflow file
3. Ensure the ports are correctly mapped

## Local Testing

To test the workflows locally, you can use [act](https://github.com/nektos/act):

```bash
# Install act
brew install act  # macOS
# or
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash  # Linux

# Run a specific workflow
act -j test

# Run with secrets
act -j test --secret-file .secrets
```

## Updating Workflows

When updating workflows:

1. Test changes in a feature branch
2. Review the workflow syntax using GitHub's workflow editor
3. Ensure all required secrets are documented
4. Update this documentation to reflect any changes
5. Test the workflow by creating a pull request

## Maintenance

- **Weekly**: Review security audit results
- **Monthly**: Update Node.js and action versions
- **Quarterly**: Review and optimize workflow performance
- **As needed**: Update secrets and credentials

## Support

For issues or questions about the workflows:

1. Check the [GitHub Actions documentation](https://docs.github.com/en/actions)
2. Review the workflow logs for error details
3. Contact the DevOps team or repository maintainers
4. Open an issue in the repository

## Related Documentation

- [README.md](../README.md) - Project overview and setup
- [SECURITY.md](../SECURITY.md) - Security policies
- [Backend Documentation](../backend/README.md) - Backend-specific information
