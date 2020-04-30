#!/usr/bin/env node
/* eslint-disable @typescript-eslint/explicit-function-return-type */

const { program } = require('commander');
const { cosmiconfig } = require('cosmiconfig');
const pkg = require('./package.json');
const { generate } = require('./build/main/process');
/* eslint-disable node/no-missing-require */

const explorer = cosmiconfig(pkg.name);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const findConfig = (configFromCli) => {
  const options = {
    percentage: false,
    format: 'text',
    split: false,
    diff: false,
    names: [],
    inputs: [],
    multi: {}
  };

  return new Promise((resolve, reject) => {
    if (configFromCli) {
      explorer.load(configFromCli).then((result) => {
        if (result && !result.isEmpty) {
          resolve({ ...options, ...result.config });
        } else reject(result);
      });
    } else {
      explorer
        .search()
        .then((result) => {
          if (result && !result.isEmpty) {
            resolve({ ...options, ...result.config });
          } else reject(result); // Will be null when running `./cli.js`
        })
        .catch((err) => reject(err));
    }
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
  .option('-c, --config <config>', 'Use the configuration from the specified path')
  // .option('-m, --multi <multi>', 'Show multiple results')
  .action(async (scoreStrings) => {
    let options = {};
    try {
      options = await findConfig(program.config);
    } catch (err) {
      if (!scoreStrings.length) throw new Error('No input found!');
    }
    // TODO Add CLI option for multi
    ['percentage', 'format', 'split', 'diff', 'names'].forEach((option) => {
      // eslint-disable-next-line security/detect-object-injection
      if (program[option]) options[option] = program[option];
    });
    if (scoreStrings.length) options.inputs = scoreStrings;

    if (options.multi) {
      for (const title in options.multi) {
        console.log(`\n${title}`);
        // eslint-disable-next-line security/detect-object-injection
        generate({ ...options, inputs: options.multi[title] });
      }
    } else generate(options);
  })
  .parse(process.argv);
