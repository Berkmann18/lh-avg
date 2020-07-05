<p align="center"><h1 align="center">
  lh-avg
</h1>

<p align="center">
  LightHouse Average calculator
</p>

[![NPM](https://nodei.co/npm/lh-avg.png)](https://nodei.co/npm/lh-avg/)

![Node.js CI](https://github.com/Berkmann18/lh-avg/workflows/Node.js%20CI/badge.svg)
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

<p align="center">
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

# Install

```bash
npm i --save lh-avg
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
  -n, --names <names>    Add names to each results
  -c, --config <config>  Use the configuration from the specified path
  -m, --multi <multi>    Show multiple results (EXPERIMENTAL, please the config option for this)
  -h, --help             display help for command
```

### Configuration
The CLI will look for configuration files following the `cosmiconfig` approach:
1.  `lh-avg` property in `package.json`
2.  `.lh-avgrc` (using JSON or YAML syntax)
3.  `.lh-avgrc.json`
4.  `.lh-avgrc.yaml`/`.lh-avgrc.yml`/`.lh-avgrc.js`
5.  `lh-avg.config.js`

It will first read the configuration (if it finds one) _then_ look at the CLI options (which overrides the relevant configuration options).

_Note:_ If it encounters a broken/invalid JSON configuration file, it will try to fix it and save the changes to the file itself. It won't be able to do the same for YAML files!

#### Example
```json
{
  "format": "md",
  "split": true,
  "percentage": true,
  "inputs": [
    "86/100/79/100/(1, 1, 6)",
    "90/100/79/100/(1, 2, 6)"
  ],
  "diff": true,
  "names": ["`master`", "`pr`"],
  "multi": {}
}
```

## Imports

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

console.log(average(lightHouseScores, { asPercentage: true }));
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
<table>
  <tr>
    <td align="center"><a href="http://maxcubing.wordpress.com"><img src="https://avatars0.githubusercontent.com/u/8260834?v=4" width="100px;" alt=""/><br /><sub><b>Maximilian Berkmann</b></sub></a><br /><a href="https://github.com/Berkmann18/lh-avg/commits?author=Berkmann18" title="Code">💻</a> <a href="https://github.com/Berkmann18/lh-avg/commits?author=Berkmann18" title="Documentation">📖</a> <a href="#example-Berkmann18" title="Examples">💡</a> <a href="#ideas-Berkmann18" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-Berkmann18" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-Berkmann18" title="Maintenance">🚧</a> <a href="#platform-Berkmann18" title="Packaging/porting to new platform">📦</a> <a href="https://github.com/Berkmann18/lh-avg/commits?author=Berkmann18" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
