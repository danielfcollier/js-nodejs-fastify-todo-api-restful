# Todo API RESTful

Requirements: Node.js + Fastify.js

## Table of Contents

- [Demo Version](#demo-version)
- [Build and Run](#build-and-run)
- [Run Tests](#run-tests)
- [CI-CD](#ci-cd)
- [Configurations](#configurations)
- [References](#references)

## Demo Version

## Build and Run the App

### Locally:

```bash
npm install
npm start
```

### With Docker:

```bash
docker build -t todo-api .
docker run -p 3000:3000 todo-api
```

## Run Tests

```bash
npm test
```

## CI-CD

### GitHub Actions

Tests are configured to run on multiple OS and Node.js versions to make sure the app is compatible across many platforms.

#### Test locally with `act`

```bash
act -j tests
```

### Deployment to Production Branch

If tests are passing, the CI with GitHub Actions pushes the changes to a production branch (`prod`).

## References

### Fastify.js API documentation:

https://www.fastify.io/

### Base dockerfile created with:

https://github.com/vercel/next.js/tree/canary/examples/with-docker

### Test GitHub Actions Locally

https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-net

https://github.com/nektos/act
