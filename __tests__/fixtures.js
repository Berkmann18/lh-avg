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
    pwa: { fnr: 0, ins: 0, po: 0.2857142857142857 },
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

const JSON_DIFF_OUTPUT = `[
  {
    perf: 0.13,
    a11y: 0.94,
    bp: 0.86,
    seo: 0.75,
    pwa: { fnr: 0, ins: 0, po: 0.2857142857142857 },
    average: ${AVG}
  },
  {
    perf: 0.13,
    a11y: 0.06,
    bp: -0.01,
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
    pwa: { fnr: 0, ins: 0, po: 0.2857142857142857 },
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
0.13,0.94,0.86,0.75,0/0/${PERC_OUTPUT[0].pwa.po},${PERC}
`;
const CSV_DIFF_OUTPUT = `input,average
"${TWO_INPUTS[0]}",${AVG}
"${TWO_INPUTS[1]}",${DIFF.average}
`;
const CSV_NAMED_OUTPUT = `name,input,average
${NAMES[0]},"${INPUT}",${AVG}
`;

const MD_OUTPUT = `| Input | Average |
|-------|---------|
| ${INPUT} | ${AVG} |
`
const MD_PERC_OUTPUT = `| Input | Average |
|-------|---------|
| ${INPUT} | ${PERC} |
`

const HTML_OUTPUT = `<table>
  <tr>
    <th>Input</th><th>Average</th>
  </tr>
  <tr>
    <td>${INPUT}</td><td>${AVG}</td>
  </tr>
`;
const HTML_PERC_OUTPUT = `<table>
<tr>
  <th>Input</th><th>Average</th>
</tr>
<tr>
  <td>${INPUT}</td><td>${PERC}</td>
</tr>
`;

const TEXT_OUTPUT = `Input: Average
"${INPUT}" => ${AVG}
`;
const TEXT_PERC_OUTPUT = `Input: Average
"${INPUT}" => ${PERC}
`;
const TEXT_SPLIT_OUTPUT = `Perf / A11y / BP / SEO / PWA => Average
0.13 / 0.94 / 0.86 / 0.75 / (0, 0, ${OUTPUT[0].pwa.po}) => ${AVG}
`;
const TEXT_SP_OUTPUT = `Perf / A11y / BP / SEO / PWA => Average
13% / 94% / 86% / 75% / (0%, 0%, ${PERC_OUTPUT[0].pwa.po}) => ${PERC}
`;

const TEXT_DIFF_OUTPUT = `Input: Average
0.13 / 0.94 / 0.86 / 0.75 / (0, 0, 0.2857142857142857) => ${AVG}
0.13 / 0.06 / -0.01 / 0 / (0, 0, 0) => 0.025714285714285745
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
    named: null
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
    named: CSV_NAMED_OUTPUT
  },
  MD: {
    normal: MD_OUTPUT,
    perc: MD_PERC_OUTPUT,
    split: null,
    splitPerc: null,
    diff: null
  },
  HTML: {
    normal: HTML_OUTPUT,
    perc: HTML_PERC_OUTPUT,
    split: null,
    splitPerc: null,
    diff: null
  }
};
