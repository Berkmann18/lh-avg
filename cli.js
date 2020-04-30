#!/usr/bin/env node

const { program } = require('commander');
const { cosmiconfig } = require('cosmiconfig');
const pkg = require('./package.json');
/* eslint-disable node/no-missing-require */
const avg = require('./build/main').default;
const {
  jsonTransform,
  csvTransform,
  mdTransform,
  htmlTransform,
  textTransform
} = require('./build/main/transform');

const explorer = cosmiconfig(pkg.name);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const findConfig = () => {
  const options = {
    percentage: false,
    format: 'text',
    split: false,
    diff: false,
    names: [],
    inputs: []
  };
  return new Promise((resolve, reject) => {
    explorer
      .search()
      .then((result) => {
        if (!result.isEmpty) {
          resolve({ ...options, ...result.config });
        }
      })
      .catch((err) => reject(err));
  });
};

// TODO Refactor this to a shorter function with more re-usable code.
program
  .arguments('[scoreStrings...]')
  .version(pkg.version)
  .description(pkg.description)
  .option('-p, --percentage', 'Return the result(s) in percentage form')
  .option(
    '-f, --format <format>',
    'Return the result(s) in a specific format (json, csv, md, html), default: text'
  )
  .option('-s, --split', 'Split the string by metric')
  .option('-d, --diff', 'Shows the difference between the first row and subsequent ones')
  .option('-n, --names <names>', 'Add names to each results', (value) => value.split(','))
  .action(async (scoreStrings) => {
    const options = await findConfig();
    ['percentage', 'format', 'split', 'diff', 'names'].forEach((option) => {
      // eslint-disable-next-line security/detect-object-injection
      if (program[option]) options[option] = program[option];
    });
    if (scoreStrings.length) options.inputs = scoreStrings;

    const results = avg(options.inputs, {
      asPercentage: options.percentage,
      showDiff: options.diff,
      names: options.names
    });

    /* eslint-disable indent */
    switch (options.format) {
      case 'json':
        return jsonTransform(results, options);
      case 'csv':
        return csvTransform(results, options, options.inputs);
      case 'md':
        return mdTransform(results, options, options.inputs);
      case 'html':
        return htmlTransform(results, options, options.inputs);
      default:
        textTransform(results, options, options.inputs);
    }
  })
  .parse(process.argv);
