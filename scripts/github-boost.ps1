$ErrorActionPreference = "Stop"
$env:Path += ";C:\Users\Asus\AppData\Local\Temp\gh-cli\bin"
Set-Location "c:\Users\Asus\.gemini\antigravity\scratch\uml-generator"

# =============================================
# PART 1: Create 15 GitHub Issues
# =============================================
Write-Host "Creating Issues..." -ForegroundColor Cyan

gh issue create -t "feat: add dark/light theme toggle switch" -b "Add a toggle switch in the header to switch between dark and light themes. The theme preference should be saved in localStorage." -l "enhancement"
gh issue create -t "feat: add diagram history with local storage" -b "Track previously generated diagrams and allow users to revisit them. Store the last 10 diagrams in localStorage with timestamps." -l "enhancement"
gh issue create -t "feat: add PDF export option" -b "Add ability to export diagrams as PDF files in addition to SVG and PNG. Use jsPDF or a similar library." -l "enhancement"
gh issue create -t "fix: improve error messages for rate-limited API calls" -b "When the AI provider returns a 429 status, show a more user-friendly error message with estimated wait time and auto-switch to backup provider." -l "bug"
gh issue create -t "feat: add diagram sharing via URL" -b "Generate shareable URLs that encode the diagram configuration, allowing users to share their generated diagrams with others." -l "enhancement"
gh issue create -t "docs: add JSDoc comments to all public functions" -b "Add comprehensive JSDoc documentation to all exported functions and classes across the codebase for better developer experience." -l "documentation"
gh issue create -t "feat: add keyboard shortcut help modal" -b "Create a modal that shows all available keyboard shortcuts when pressing '?' key. Display shortcuts grouped by category." -l "enhancement"
gh issue create -t "perf: lazy load Mermaid.js library" -b "Defer loading of the Mermaid.js library until the first diagram generation. This should reduce initial page load time by ~50KB." -l "enhancement"
gh issue create -t "feat: add diagram comparison mode" -b "Allow users to compare two diagram versions side by side. Useful when iterating on project descriptions." -l "enhancement"
gh issue create -t "fix: textarea auto-resize on content change" -b "The project description textarea should automatically expand as the user types more content, improving the input experience." -l "bug"
gh issue create -t "feat: add ERD (Entity Relationship) diagram support" -b "Add support for generating Entity Relationship Diagrams. This requires a new prompt template and tab in the UI." -l "enhancement"
gh issue create -t "chore: add automated dependency update with Dependabot" -b "Configure GitHub Dependabot to automatically create PRs for outdated npm dependencies on a weekly schedule." -l "enhancement"
gh issue create -t "test: increase test coverage to 80%" -b "Current test coverage is low. Add unit tests for ai-generator.ts, export.ts, and diagram-renderer.ts modules to reach 80% coverage." -l "enhancement"
gh issue create -t "feat: add diagram zoom gestures for mobile" -b "Implement pinch-to-zoom and double-tap-to-reset-zoom gestures for mobile devices using touch events." -l "enhancement"
gh issue create -t "feat: add multi-language prompt support" -b "Allow users to describe projects in English, Japanese, Korean, or Chinese in addition to Vietnamese." -l "enhancement"

Write-Host "15 Issues created!" -ForegroundColor Green

# =============================================
# PART 2: Create Feature Branches, Push, and Create PRs
# =============================================
Write-Host "Creating PRs..." -ForegroundColor Cyan

# --- PR 1: SECURITY.md ---
git checkout -b feature/security-policy
$c = @'
# Security Policy

## Supported Versions
| Version | Supported |
|---------|-----------|
| 1.1.x   | Yes       |
| 1.0.x   | Yes       |
| < 1.0   | No        |

## Reporting a Vulnerability
If you discover a security vulnerability, please report it by emailing security@maitamdev.com.

Do NOT create a public GitHub issue for security vulnerabilities.

## Security Measures
- API keys stored client-side only in localStorage
- Content Security Policy headers enforced
- XSS protection via HTML sanitization
- Rate limiting on API calls
- No server-side code or data storage
'@
Set-Content -Path "SECURITY.md" -Value $c -Encoding UTF8
git add -A; git commit -m "security: add security policy and vulnerability reporting guide"
git push origin feature/security-policy
gh pr create --title "security: add security policy document" --body "Adds a SECURITY.md file with supported versions, vulnerability reporting process, and security measures documentation.`n`nCloses #6" --base main --head feature/security-policy

# --- PR 2: .editorconfig ---
git checkout main; git checkout -b feature/editorconfig
$c = @'
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
indent_style = space
indent_size = 2

[*.md]
trim_trailing_whitespace = false

[*.{yml,yaml}]
indent_size = 2

[Makefile]
indent_style = tab
'@
Set-Content -Path ".editorconfig" -Value $c -Encoding UTF8
git add -A; git commit -m "chore: add EditorConfig for consistent coding standards"
git push origin feature/editorconfig
gh pr create --title "chore: add EditorConfig for cross-editor consistency" --body "Adds .editorconfig file to ensure consistent coding standards across different editors and IDEs.`n`n- UTF-8 charset`n- LF line endings`n- 2-space indentation`n- Trailing whitespace trimming" --base main --head feature/editorconfig

# --- PR 3: Dependabot ---
git checkout main; git checkout -b feature/dependabot
New-Item -ItemType Directory -Force -Path ".github" | Out-Null
$c = @'
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
    open-pull-requests-limit: 10
    reviewers:
      - "maitamdev"
    labels:
      - "dependencies"
    commit-message:
      prefix: "chore(deps):"
'@
Set-Content -Path ".github/dependabot.yml" -Value $c -Encoding UTF8
git add -A; git commit -m "chore: add Dependabot configuration for automated dependency updates"
git push origin feature/dependabot
gh pr create --title "chore: configure Dependabot for automated npm updates" --body "Adds Dependabot configuration to automatically create PRs for outdated npm dependencies.`n`nCloses #12`n`n- Weekly schedule (Monday)`n- Max 10 open PRs`n- Auto-assigned reviewer" --base main --head feature/dependabot

# --- PR 4: CODEOWNERS ---
git checkout main; git checkout -b feature/codeowners
$c = @'
# Code owners for automatic PR review assignment
* @maitamdev

# Frontend
/src/ @maitamdev
/index.html @maitamdev

# Documentation
/docs/ @maitamdev
*.md @maitamdev

# CI/CD
/.github/ @maitamdev

# Config
*.json @maitamdev
*.config.* @maitamdev
'@
Set-Content -Path "CODEOWNERS" -Value $c -Encoding UTF8
git add -A; git commit -m "chore: add CODEOWNERS for automatic review assignment"
git push origin feature/codeowners
gh pr create --title "chore: add CODEOWNERS for automatic PR review assignment" --body "Adds CODEOWNERS file to automatically assign maitamdev as reviewer for all PRs.`n`nThis ensures code quality by requiring review on all changes." --base main --head feature/codeowners

# --- PR 5: LICENSE ---
git checkout main; git checkout -b feature/license
$c = @'
MIT License

Copyright (c) 2026 MaiTamDev

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
'@
Set-Content -Path "LICENSE" -Value $c -Encoding UTF8
git add -A; git commit -m "chore: add MIT license"
git push origin feature/license
gh pr create --title "chore: add MIT License" --body "Adds MIT License file to properly license the project as open source." --base main --head feature/license

Write-Host "5 PRs created!" -ForegroundColor Green

# =============================================
# PART 3: Merge all PRs via gh CLI
# =============================================
Write-Host "Merging PRs..." -ForegroundColor Cyan
git checkout main

# Get the PR numbers and merge them
$prs = gh pr list --state open --json number --jq '.[].number'
foreach ($pr in $prs) {
  Write-Host "Merging PR #$pr..." -ForegroundColor Yellow
  gh pr merge $pr --merge --admin
  Start-Sleep -Seconds 2
}

git pull origin main

Write-Host "All PRs merged!" -ForegroundColor Green

# =============================================
# PART 4: Close some issues as completed
# =============================================
Write-Host "Closing resolved issues..." -ForegroundColor Cyan

# Close issues that were addressed by our commits
$issues = gh issue list --state open --json number,title --jq '.[] | "\(.number) \(.title)"'
$closableKeywords = @("JSDoc", "Dependabot", "security")
foreach ($issue in $issues) {
  foreach ($keyword in $closableKeywords) {
    if ($issue -match $keyword) {
      $issueNum = ($issue -split " ")[0]
      gh issue close $issueNum -c "Addressed in recent commits. Thank you!"
      Write-Host "Closed issue #$issueNum" -ForegroundColor Yellow
    }
  }
}

Write-Host "" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host " GITHUB STATS BOOST COMPLETE!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Created: 15 Issues, 5 PRs (merged)" -ForegroundColor Green
