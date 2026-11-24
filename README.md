# Playwright QA Starter

![Playwright Tests](https://github.com/rajjahlawat-noob/playwright-qa-starter/actions/workflows/playwright.yml/badge.svg)

UI test automation for the [TodoMVC demo app](https://demo.playwright.dev/todomvc/) using **Playwright + TypeScript** and the **Page Object Model**.

## What's covered
| Test | Type |
|---|---|
| Add items | Functional |
| Complete an item | Functional |
| Filter Active / Completed | Functional |
| Delete an item | Functional |
| Empty input is rejected | Negative |

Runs on **Desktop Chrome** and **Pixel 7 (mobile emulation)**. Screenshots on failure, traces on retry, HTML report uploaded by CI.

## Run locally
```bash
npm install
npx playwright install chromium
npm test            # headless
npm run test:headed # watch it run
npm run report      # open HTML report
```

## Structure
```
pages/TodoPage.ts       # Page Object (selectors + actions)
tests/todo.spec.ts      # Test cases
playwright.config.ts    # Browsers, base URL, reporters
.github/workflows/      # CI on every push
```
