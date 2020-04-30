const AVG = 0.423673469387755;
const PERC = '42.37%';
const INPUT = '13 / 94 / 86 / 75 / (0/3, 0/3, 2/7)';
const TWO_INPUTS = ['13 / 94 / 86 / 75 / (0, 0, 2)', '26 / 100 / 85 / 75 / (0, 0, 2)'];
const NAMES = ['a', 'b'];

const OUTPUT = [
  {
    perf: 0.13,
    a11y: 0.94,
    bp: 0.86,
    seo: 0.75,
    pwa: {
      fnr: 0,
      ins: 0,
      po: 0.2857142857142857
    },
    average: AVG
  }
];
const DIFF = {
  perf: 0.13,
  a11y: 0.06,
  bp: -0.01,
  seo: 0,
  pwa: {
    fnr: 0,
    ins: 0,
    po: 0
  },
  average: 0.025714285714285745
};

const JSON_OUTPUT = `[
  {
    perf: 0.13,
    a11y: 0.94,
    bp: 0.86,
    seo: 0.75,
    pwa: { fnr: 0, ins: 0, po: ${OUTPUT[0].pwa.po} },
    average: ${AVG}
  }
]
`;
const PERC_OUTPUT = [
  {
    perf: '13%',
    a11y: '94%',
    bp: '86%',
    seo: '75%',
    pwa: {
      fnr: '0%',
      ins: '0%',
      po: '28.57%'
    },
    average: PERC
  }
];
const JSON_PERC_OUTPUT = `[
  {
    perf: '13%',
    a11y: '94%',
    bp: '86%',
    seo: '75%',
    pwa: { fnr: '0%', ins: '0%', po: '28.57%' },
    average: '${PERC}'
  }
]
`;

// TODO Rectify the Floating Point issues
const JSON_DIFF_OUTPUT = `[
  {
    perf: 0.13,
    a11y: 0.94,
    bp: 0.86,
    seo: 0.75,
    pwa: { fnr: 0, ins: 0, po: ${OUTPUT[0].pwa.po} },
    average: ${AVG}
  },
  {
    perf: 0.13,
    a11y: 0.06000000000000005,
    bp: -0.010000000000000009,
    seo: 0,
    pwa: { fnr: 0, ins: 0, po: 0 },
    average: ${DIFF.average}
  }
]
`;
const JSON_NAMED_OUTPUT = `[
  {
    perf: 0.13,
    a11y: 0.94,
    bp: 0.86,
    seo: 0.75,
    pwa: { fnr: 0, ins: 0, po: ${OUTPUT[0].pwa.po} },
    average: ${AVG},
    name: '${NAMES[0]}'
  }
]
`;

const CSV_OUTPUT = `input,average
"${INPUT}",${AVG}
`;
const CSV_PERC_OUTPUT = `input,average
"${INPUT}",${PERC}
`;
const CSV_SPLIT_OUTPUT = `perf,a11y,bp,seo,pwa,average
0.13,0.94,0.86,0.75,0/0/${OUTPUT[0].pwa.po},${AVG}
`;
const CSV_SP_OUTPUT = `perf,a11y,bp,seo,pwa,average
13%,94%,86%,75%,0%/0%/${PERC_OUTPUT[0].pwa.po},${PERC}
`;
const CSV_DIFF_OUTPUT = `input,average
"${TWO_INPUTS[0]}",${AVG}
"${TWO_INPUTS[1]}",${DIFF.average}
`;
const CSV_NAMED_OUTPUT = `name,input,average
${NAMES[0]},"${INPUT}",${AVG}
`;
const CSV_SD_OUTPUT = `perf,a11y,bp,seo,pwa,average
0.13,0.94,0.86,0.75,0/0/${OUTPUT[0].pwa.po},${AVG}
0.13,0.06000000000000005,-0.010000000000000009,0,0/0/0,${DIFF.average}
`;
const CSV_SN_OUTPUT = `name,perf,a11y,bp,seo,pwa,average
${NAMES[0]},0.13,0.94,0.86,0.75,0/0/${OUTPUT[0].pwa.po},${AVG}
`;

const MD_OUTPUT = `| Input | Average |
|-------|---------|
| ${INPUT} | ${AVG} |
`;
const MD_PERC_OUTPUT = `| Input | Average |
|-------|---------|
| ${INPUT} | ${PERC} |
`;
const MD_SPLIT_OUTPUT = `| Perf | A11y | BP | SEO | PWA | Average |
|------|------|----|-----|-----|---------|
| 0.13 | 0.94 | 0.86 | 0.75 | (0, 0, ${OUTPUT[0].pwa.po}) | ${AVG} |
`;
const MD_SP_OUTPUT = `| Perf | A11y | BP | SEO | PWA | Average |
|------|------|----|-----|-----|---------|
| 13% | 94% | 86% | 75% | (0%, 0%, 28.57%) | ${PERC} |
`;
const MD_DIFF_OUTPUT = `| Input | Average |
|-------|---------|
| ${TWO_INPUTS[0]} | ${AVG} |
| ${TWO_INPUTS[1]} | ${DIFF.average} |
`;
const MD_SD_OUTPUT = `| Perf | A11y | BP | SEO | PWA | Average |
|------|------|----|-----|-----|---------|
| 0.13 | 0.94 | 0.86 | 0.75 | (0, 0, ${OUTPUT[0].pwa.po}) | ${AVG} |
| 0.13 | 0.06000000000000005 | -0.010000000000000009 | 0 | (0, 0, 0) | ${DIFF.average} |
`;
const MD_NAMED_OUTPUT = `| Name | Input | Average |
|-------|---------|
| ${NAMES[0]} | ${INPUT} | ${AVG} |
`;
const MD_SN_OUTPUT = `| Name | Perf | A11y | BP | SEO | PWA | Average |
|------|------|----|-----|-----|---------|
| ${NAMES[0]} | 0.13 | 0.94 | 0.86 | 0.75 | (0, 0, ${OUTPUT[0].pwa.po}) | ${AVG} |
`;

const HTML_OUTPUT = `<table>
  <tr>
    <th>Input</th><th>Average</th>
  </tr>
  <tr>
    <td>${INPUT}</td><td>${AVG}</td>
  </tr>
</table>
`;
const HTML_PERC_OUTPUT = `<table>
  <tr>
    <th>Input</th><th>Average</th>
  </tr>
  <tr>
    <td>${INPUT}</td><td>${PERC}</td>
  </tr>
</table>
`;
const HTML_SPLIT_OUTPUT = `<table>
  <tr>
    <th>Perf</th><th>A11y</th><th>BP</th><th>SEO</th><th>PWA</th><th>Average</th>
  </tr>
  <tr>
    <td>0.13</td><td>0.94</td><td>0.86</td><td>0.75</td><td>(0, 0, ${OUTPUT[0].pwa.po})</td><td>${AVG}</td>
  </tr>
</table>
`;
const HTML_SP_OUTPUT = `<table>
  <tr>
    <th>Perf</th><th>A11y</th><th>BP</th><th>SEO</th><th>PWA</th><th>Average</th>
  </tr>
  <tr>
    <td>13%</td><td>94%</td><td>86%</td><td>75%</td><td>(0%, 0%, ${PERC_OUTPUT[0].pwa.po})</td><td>${PERC}</td>
  </tr>
</table>
`;
const HTML_DIFF_OUTPUT = `<table>
  <tr>
    <th>Input</th><th>Average</th>
  </tr>
  <tr>
    <td>${TWO_INPUTS[0]}</td><td>${AVG}</td>
  </tr>
  <tr>
    <td>${TWO_INPUTS[1]}</td><td>${DIFF.average}</td>
  </tr>
</table>
`;
const HTML_NAMED_OUTPUT = `<table>
  <tr>
    <th>Name</th><th>Input</th><th>Average</th>
  </tr>
  <tr>
    <td>${NAMES[0]}</td><td>${INPUT}</td><td>${AVG}</td>
  </tr>
</table>
`;
const HTML_SD_OUTPUT = `<table>
  <tr>
    <th>Perf</th><th>A11y</th><th>BP</th><th>SEO</th><th>PWA</th><th>Average</th>
  </tr>
  <tr>
    <td>0.13</td><td>0.94</td><td>0.86</td><td>0.75</td><td>(0, 0, ${OUTPUT[0].pwa.po})</td><td>${AVG}</td>
  </tr>
  <tr>
    <td>0.13</td><td>0.06000000000000005</td><td>-0.010000000000000009</td><td>0</td><td>(0, 0, 0)</td><td>${DIFF.average}</td>
  </tr>
</table>
`;
const HTML_SN_OUTPUT = `<table>
  <tr>
    <th>Name</th><th>Perf</th><th>A11y</th><th>BP</th><th>SEO</th><th>PWA</th><th>Average</th>
  </tr>
  <tr>
    <td>${NAMES[0]}</td><td>0.13</td><td>0.94</td><td>0.86</td><td>0.75</td><td>(0, 0, ${OUTPUT[0].pwa.po})</td><td>${AVG}</td>
  </tr>
</table>
`;

const TEXT_OUTPUT = `Input => Average
"${INPUT}" => ${AVG}
`;
const TEXT_PERC_OUTPUT = `Input => Average
"${INPUT}" => ${PERC}
`;
const TEXT_SPLIT_OUTPUT = `Perf / A11y / BP / SEO / PWA => Average
0.13 / 0.94 / 0.86 / 0.75 / (0, 0, ${OUTPUT[0].pwa.po}) => ${AVG}
`;
const TEXT_SP_OUTPUT = `Perf / A11y / BP / SEO / PWA => Average
13% / 94% / 86% / 75% / (0%, 0%, ${PERC_OUTPUT[0].pwa.po}) => ${PERC}
`;
const TEXT_DIFF_OUTPUT = `Input => Average
"0.13 / 0.94 / 0.86 / 0.75 / (0, 0, ${OUTPUT[0].pwa.po})" => ${AVG}
"0.13 / 0.06000000000000005 / -0.010000000000000009 / 0 / (0, 0, 0)" => ${DIFF.average}
`;
const TEXT_NAMED_OUTPUT = `Name: Input => Average
${NAMES[0]}: "13 / 94 / 86 / 75 / (0/3, 0/3, 2/7)" => ${AVG}
`;
const TEXT_SD_OUTPUT = `Perf / A11y / BP / SEO / PWA => Average
0.13 / 0.94 / 0.86 / 0.75 / (0, 0, ${OUTPUT[0].pwa.po}) => ${AVG}
0.13 / 0.06000000000000005 / -0.010000000000000009 / 0 / (0, 0, 0) => ${DIFF.average}
`;

const TEXT_SN_OUTPUT = `Name: Perf / A11y / BP / SEO / PWA => Average
${NAMES[0]}: 0.13 / 0.94 / 0.86 / 0.75 / (0, 0, ${OUTPUT[0].pwa.po}) => ${AVG}
`;

module.exports = {
  AVG,
  PERC,
  INPUT,
  TWO_INPUTS,
  NAMES,
  OUTPUT,
  PERC_OUTPUT,
  DEFAULT: {
    normal: TEXT_OUTPUT,
    perc: TEXT_PERC_OUTPUT,
    split: TEXT_SPLIT_OUTPUT,
    splitPerc: TEXT_SP_OUTPUT,
    diff: TEXT_DIFF_OUTPUT,
    named: TEXT_NAMED_OUTPUT,
    splitDiff: TEXT_SD_OUTPUT,
    splitNamed: TEXT_SN_OUTPUT
  },
  JSON: {
    normal: JSON_OUTPUT,
    perc: JSON_PERC_OUTPUT,
    diff: JSON_DIFF_OUTPUT,
    named: JSON_NAMED_OUTPUT
  },
  CSV: {
    normal: CSV_OUTPUT,
    perc: CSV_PERC_OUTPUT,
    split: CSV_SPLIT_OUTPUT,
    splitPerc: CSV_SP_OUTPUT,
    diff: CSV_DIFF_OUTPUT,
    named: CSV_NAMED_OUTPUT,
    splitDiff: CSV_SD_OUTPUT,
    splitNamed: CSV_SN_OUTPUT
  },
  MD: {
    normal: MD_OUTPUT,
    perc: MD_PERC_OUTPUT,
    split: MD_SPLIT_OUTPUT,
    splitPerc: MD_SP_OUTPUT,
    diff: MD_DIFF_OUTPUT,
    named: MD_NAMED_OUTPUT,
    splitDiff: MD_SD_OUTPUT,
    splitNamed: MD_SN_OUTPUT
  },
  HTML: {
    normal: HTML_OUTPUT,
    perc: HTML_PERC_OUTPUT,
    split: HTML_SPLIT_OUTPUT,
    splitPerc: HTML_SP_OUTPUT,
    diff: HTML_DIFF_OUTPUT,
    named: HTML_NAMED_OUTPUT,
    splitDiff: HTML_SD_OUTPUT,
    splitNamed: HTML_SN_OUTPUT
  }
};
