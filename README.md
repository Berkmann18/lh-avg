<p align="center"><h1 align="center">
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
<a href="#contributors-">
  <img src="https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square" alt="All Contributors" />
</a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
  lh-avg
</h1>

<p align="center">
  LightHouse average calculator
</p>

<p align="center">
  <a href="https://www.npmjs.org/package/lh-avg"><img src="https://badgen.net/npm/v/lh-avg" alt="npm version"/></a>
  <a href="https://www.npmjs.org/package/lh-avg"><img src="https://badgen.net/npm/license/lh-avg" alt="license"/></a>
  <a href="https://www.npmjs.org/package/lh-avg"><img src="https://badgen.net/npm/dt/lh-avg" alt="downloads"/></a>
  <a href="https://travis-ci.org/berkmann18/lh-avg"><img src="https://badgen.net/travis/berkmann18/lh-avg" alt="build"/></a>
  <a href="https://codecov.io/gh/berkmann18/lh-avg"><img src="https://badgen.net/codecov/c/github/berkmann18/lh-avg" alt="codecov"/></a>
  <a href="https://snyk.io/test/github/berkmann18/lh-avg"><img src="https://snyk.io/test/github/berkmann18/lh-avg/badge.svg" alt="Known Vulnerabilities"/></a>
  <a href="./SECURITY.md"><img src="https://img.shields.io/badge/Security-Responsible%20Disclosure-yellow.svg" alt="Responsible Disclosure Policy" /></a>
</p>

# About

lh-avg

LightHouse average calculator

# Install

```bash
npm install --save lh-avg
```

# Usage
## CLI
```
Usage: cli [options] <scoreStrings...>

LightHouse average calculator

Options:
  -V, --version          output the version number
  -p, --percentage       Return the result(s) in percentage form
  -f, --format <format>  Return the result(s) in a specific format (json, csv, md, html), default: text
  -s, --split            Split the string by metric
  -h, --help             display help for command
```

## ES Module
```js
import average from 'lh-avg';
// Or
const average = require('lh-avg').default;
```

# Example
```ts
import average from 'lh-avg';

const lightHouseScoreString = '14 / 100 / 98 / 100 / (1, 0, 6)';

console.log(average(lightHouseScoreString));
/* {
  perf: 0.14,
  a11y: 1,
  bp: 0.98,
  seo: 1,
  pwa: { fnr: 0.3333333333333333, ins: 0, po: 0.8571428571428571 },
  average: 0.6157823129251702
} */

console.log(average(lightHouseScoreString, true));
/* {
  perf: '14%',
  a11y: '100%',
  bp: '98%',
  seo: '100%',
  pwa: { fnr: '33.33%', ins: '0%', po: '85.71%' },
  average: '61.58%'
} */
```
For more documentation, please check [`./doc/index.html`](./doc/index.html).

# Contributing

Please consult [CONTRIBUTING](./CONTRIBUTING.md) for guidelines on contributing to this project.

# Author

**lh-avg** © [Berkmann18](https://github.com/berkmann18), Released under the [Apache-2.0](./LICENSE) License.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!