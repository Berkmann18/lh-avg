# Contributing

:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

The following is a set of guidelines for contributing to lh-avg.
These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Code of Conduct

This project and everyone participating in it is governed by a [Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How to contribute to lh-avg

1.  Make sure you always pull the latest changes from the repo and `rebase` from the `master` branch whenever it's necessary.
2.  Always work on the `dev` branch or dedicated branches (e.g.: for features).
3.  Don't modify generated files in built directories.
4.  Squash commits in branches to reduce the chain whenever its possible.
5.  Always **test** your code using `npm test`.
6.  If you add new code, ensure that it's covered by test cases.
7.  If you fix an issue, mention `fix #x` (where x is the issue number).
8.  If you reference an issue/PR, mention `re #x`.
9.  Ensure that you use the appropriate code style and commit convention.

### Tests

Make sure the code you're adding has decent test coverage.

Running project tests and coverage:

```bash
npm run test
```

### Commit Guidelines

The project uses the commitizen tool for standardizing changelog style commit and a git pre-commit hook to enforce them.
