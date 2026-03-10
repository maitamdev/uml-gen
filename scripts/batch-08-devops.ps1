$ErrorActionPreference = "Stop"
Set-Location "c:\Users\Asus\.gemini\antigravity\scratch\uml-generator"
New-Item -ItemType Directory -Force -Path ".github/workflows" | Out-Null
New-Item -ItemType Directory -Force -Path ".github/ISSUE_TEMPLATE" | Out-Null

# ---- Commit 71 ----
$c = @'
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
'@
Set-Content -Path ".github/workflows/ci.yml" -Value $c -Encoding UTF8
git add -A; git commit -m "ci: add GitHub Actions CI workflow for build verification"

# ---- Commit 72 ----
$c = @'
name: Deploy to Vercel
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
'@
Set-Content -Path ".github/workflows/deploy.yml" -Value $c -Encoding UTF8
git add -A; git commit -m "ci: add Vercel auto-deploy workflow on main branch push"

# ---- Commit 73 ----
$c = @'
---
name: Bug Report
about: Report a bug or unexpected behavior
title: "[BUG] "
labels: bug
assignees: ''
---

## Describe the Bug
A clear description of the bug.

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What you expected to happen.

## Screenshots
If applicable, add screenshots.

## Environment
- Browser: [e.g. Chrome 120]
- OS: [e.g. Windows 11]
- AI Provider: [Hugging Face / Groq]
'@
Set-Content -Path ".github/ISSUE_TEMPLATE/bug_report.md" -Value $c -Encoding UTF8
git add -A; git commit -m "chore: add bug report issue template"

# ---- Commit 74 ----
$c = @'
---
name: Feature Request
about: Suggest a new feature or improvement
title: "[FEATURE] "
labels: enhancement
assignees: ''
---

## Problem Description
What problem does this feature solve?

## Proposed Solution
Describe your proposed solution.

## Alternatives Considered
Any alternative solutions you considered.

## Additional Context
Any additional information or mockups.
'@
Set-Content -Path ".github/ISSUE_TEMPLATE/feature_request.md" -Value $c -Encoding UTF8
git add -A; git commit -m "chore: add feature request issue template"

# ---- Commit 75 ----
$c = @'
## Description
Brief description of the changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-reviewed the code
- [ ] Added/updated documentation
- [ ] No new warnings
- [ ] Tested locally

## Screenshots
If applicable, add screenshots of the changes.
'@
Set-Content -Path ".github/PULL_REQUEST_TEMPLATE.md" -Value $c -Encoding UTF8
git add -A; git commit -m "chore: add pull request template with checklist"

# ---- Commit 76 ----
$c = @'
{
  "env": {
    "browser": true,
    "es2022": true
  },
  "extends": [
    "eslint:recommended"
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "no-unused-vars": "warn",
    "no-console": "off",
    "prefer-const": "error",
    "no-var": "error",
    "eqeqeq": ["error", "always"],
    "curly": ["error", "multi-line"],
    "no-duplicate-imports": "error"
  }
}
'@
Set-Content -Path ".eslintrc.json" -Value $c -Encoding UTF8
git add -A; git commit -m "chore: add ESLint configuration for code quality"

# ---- Commit 77 ----
$c = @'
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "auto"
}
'@
Set-Content -Path ".prettierrc" -Value $c -Encoding UTF8
git add -A; git commit -m "chore: add Prettier configuration for consistent formatting"

# ---- Commit 78 ----
New-Item -ItemType Directory -Force -Path ".husky" | Out-Null
$c = @'
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
'@
Set-Content -Path ".husky/pre-commit" -Value $c -Encoding UTF8
git add -A; git commit -m "chore: add Husky pre-commit hook for lint-staged"

# ---- Commit 79 ----
$c = @'
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'feat', 'fix', 'docs', 'style', 'refactor',
      'perf', 'test', 'chore', 'ci', 'build', 'revert'
    ]],
    'subject-case': [0],
    'body-max-line-length': [0],
  },
};
'@
Set-Content -Path "commitlint.config.js" -Value $c -Encoding UTF8
git add -A; git commit -m "chore: add commitlint config for conventional commits"

# ---- Commit 80 ----
$c = @'
last 2 versions
> 1%
not dead
not ie 11
not op_mini all
'@
Set-Content -Path ".browserslistrc" -Value $c -Encoding UTF8
git add -A; git commit -m "chore: add browserslist config for target browser support"

Write-Host "Batch 8 done: 10 commits (DevOps)" -ForegroundColor Green
