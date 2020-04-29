const AVG = 0.423673469387755;
const PERC = '42.37%';
const INPUT = '13 / 94 / 86 / 75 / (0/3, 0/3, 2/7)';
const TWO_INPUTS = ['13 / 94 / 86 / 75 / (0, 0, 2)', '26 / 100 / 85 / 75 / (0, 0, 2)'];

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
    average: ${PERC}
  }
]
`;

const CSV_OUTPUT = `input,average\n"${INPUT}",${AVG}\n`;
const CSV_PERC_OUTPUT = `input,average\n"${INPUT}",${PERC}\n`;

const MD_OUTPUT = `| Input | Average |\n|-------|---------|\n| ${INPUT} | ${AVG} |\n`
const MD_PERC_OUTPUT = `| Input | Average |\n|-------|---------|\n| ${INPUT} | ${PERC} |\n`

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
0.13 / 0.94 / 0.86 / 0.75 / (0, 0, ${OUTPUT[0].pwa.po}) => ${PERC}
`;

const NAMES = ['a', 'b'];

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
  average: 0.02571428571428576
};

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
    diff: null
  },
  JSON: {
    normal: JSON_OUTPUT,
    perc: JSON_PERC_OUTPUT,
    split: null,
    splitPerc: null,
    diff: null
  },
  CSV: {
    normal: CSV_OUTPUT,
    perc: CSV_PERC_OUTPUT,
    split: null,
    splitPerc: null,
    diff: null
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
