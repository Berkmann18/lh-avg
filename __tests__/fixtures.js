const AVG = 0.423673469387755;
const PERC = '42.37%';
const INPUT = '13 / 94 / 86 / 75 / (0/3, 0/3, 2/7)';

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
`

const NAMES = ['a', 'b'];

module.exports = {
  AVG,
  PERC,
  INPUT,
  NAMES,
  DEFAULT: {
    normal: OUTPUT,
    perc: PERC_OUTPUT,
    split: null
  },
  JSON: {
    normal: JSON_OUTPUT,
    perc: JSON_PERC_OUTPUT,
    split: null
  },
  CSV: {
    normal: CSV_OUTPUT,
    perc: CSV_PERC_OUTPUT,
    split: null
  },
  MD: {
    normal: MD_OUTPUT,
    perc: MD_PERC_OUTPUT,
    split: null
  },
  HTML: {
    normal: HTML_OUTPUT,
    perc: HTML_PERC_OUTPUT,
    split: null
  }
};
