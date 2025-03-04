# Poker Hand Evaluator TDD Project

This project demonstrates Test-Driven Development (TDD) using Vitest and pnpm.

## Setup

1. Make sure you have [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) installed
2. Clone this repository
3. Install dependencies:

```bash
pnpm install
```

## Test Commands

- Run tests once:
  ```bash
  pnpm test
  ```

- Run tests in watch mode (great for TDD):
  ```bash
  pnpm test:watch
  ```

- Run tests with UI:
  ```bash
  pnpm test:ui
  ```

- Run tests with coverage:
  ```bash
  pnpm test:coverage
  ```

## TDD Workflow

1. Write a failing test for the functionality you want to implement
2. Run the test to see it fail
3. Implement the minimal code to make the test pass
4. Run the test to see it pass
5. Refactor your code as needed (while keeping tests passing)
6. Repeat for the next feature

## Project Structure

- `src/` - Source code
  - `*.ts` - Implementation files
  - `*.test.ts` - Test files

## Example

The project includes a simple poker hand evaluator as an example:

- `src/poker.ts` - Contains the poker hand evaluation logic
- `src/poker.test.ts` - Contains tests for the poker hand evaluator

## Building

To compile TypeScript:

```bash
pnpm build
```

To watch for changes and recompile:

```bash
pnpm dev
``` 
