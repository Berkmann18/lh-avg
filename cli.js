#!/usr/bin/env node

const { program } = require('commander');
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

// TODO Refactor this to a shorter function with more re-usable code.
program
  .arguments('<scoreStrings...>')
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
  .action((scoreStrings) => {
    const results = avg(scoreStrings, {
      asPercentage: program.percentage,
      showDiff: program.diff,
      names: program.names
    });

    /* eslint-disable indent */
    switch (program.format) {
      case 'json':
        return jsonTransform(results, program);
      case 'csv':
        return csvTransform(results, program, scoreStrings);
      case 'md':
        return mdTransform(results, program, scoreStrings);
      case 'html':
        return htmlTransform(results, program, scoreStrings);
      default:
        textTransform(results, program, scoreStrings);
    }
  })
  .parse(process.argv);
