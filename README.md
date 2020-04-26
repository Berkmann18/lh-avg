<p align="center"><h1 align="center">
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
<a href="#contributors-">
  <img src="https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square" alt="All Contributors" />
</a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
  lh-avg
</h1>

<p align="center">
  LightHouse Average calculator
</p>

<p align="center">
  <a href="https://nodei.co/npm/lh-avg/"><img src="https://nodei.co/npm/lh-avg.png" alt="NPM"></a>

  <a href="https://github.com/Berkmann18/lh-avg/actions?query=workflow%3A%22Node.js+CI%22"><img src="https://github.com/Berkmann18/lh-avg/workflows/Node.js%20CI/badge.svg" alt="Node.js CI"></a>

  <a href="https://www.npmjs.org/package/lh-avg"><img src="https://badgen.net/npm/license/lh-avg" alt="license"/></a>
  <a href="https://www.npmjs.org/package/lh-avg"><img src="https://badgen.net/npm/dt/lh-avg" alt="downloads"/></a>
  <a href="https://codecov.io/gh/berkmann18/lh-avg"><img src="https://badgen.net/codecov/c/github/berkmann18/lh-avg" alt="codecov"/></a>
  <a href="https://snyk.io/test/github/berkmann18/lh-avg"><img src="https://snyk.io/test/github/berkmann18/lh-avg/badge.svg" alt="Known Vulnerabilities"/></a>
  <a href="./SECURITY.md"><img src="https://img.shields.io/badge/Security-Responsible%20Disclosure-yellow.svg" alt="Responsible Disclosure Policy" /></a>
  <a href="http://commitizen.github.io/cz-cli/"><img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg" alt="Commitizen friendly"></a>
  <a href="https://github.com/Berkmann18/lh-avg"><img src="https://img.shields.io/github/languages/code-size/Berkmann18/lh-avg.svg" alt="GitHub code size in bytes"></a>
  <a href="https://bettercodehub.com/results/Berkmann18/lh-avg"><img src="https://bettercodehub.com/edge/badge/Berkmann18/lh-avg?branch=master" alt="BCH compliance"></a>
  <a href="https://app.codacy.com/app/maxieberkmann/lh-avg?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Berkmann18/lh-avg&amp;utm_campaign=Badge_Grade_Dashboard"><img src="https://api.codacy.com/project/badge/Grade/2a8e3e98d3bb47f29abbc3df7174675d" alt="Codacy Badge"></a>
  <a href="https://github.com/semantic-release/semantic-release"><img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg" alt="semantic-release"></a>
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
  -d, --diff             Shows the difference between the first row and subsequent ones
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

const lightHouseScores = ['14 / 100 / 98 / 100 / (1, 0, 6)'];

console.log(average(lightHouseScores));
/* {
  perf: 0.14,
  a11y: 1,
  bp: 0.98,
  seo: 1,
  pwa: { fnr: 0.3333333333333333, ins: 0, po: 0.8571428571428571 },
  average: 0.6157823129251702
} */

console.log(average(lightHouseScores, true));
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
