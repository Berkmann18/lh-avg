#!/usr/bin/env node
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable node/no-missing-require */
const { program } = require('commander');
const { cosmiconfig } = require('cosmiconfig');
const pkg = require('./package.json');
const { generate } = require('./build/main/process');
const jsonFixer = require('json-fixer');
const { readFileSync, writeFileSync } = require('fs');

const explorer = cosmiconfig(pkg.name);

const fixConfig = (filename, options, callback) => {
  const configData = readFileSync(filename, 'utf-8');
  const { data, changed } = jsonFixer(configData);
  if (changed) {
    writeFileSync(filename, JSON.stringify(data, null, 2));
    callback({ ...options, ...data });
  }
};

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
      // console.log('cFC')
      explorer
        .load(configFromCli)
        .then((result) => {
          // console.log('got=', result)
          if (result && !result.isEmpty) {
            resolve({ ...options, ...result.config });
          } else reject(result);
        })
        .catch((err) => {
          if (err.name === 'JSONError') {
            fixConfig(configFromCli, options, resolve);
          } else reject(err);
        });
    } else {
      // console.log('Searching')
      explorer
        .search()
        .then((result) => {
          // console.log('found=', result)
          if (result && !result.isEmpty) {
            resolve({ ...options, ...result.config });
          } else reject(result);
        })
        .catch((err) => {
          if (err.name !== 'JSONError') {
            reject(err);
            return err;
          }
          const filename = /JSON Error in (.*?):\n?/.exec(err.message);
          if (filename === null) {
            reject(err);
            return err;
          }
          fixConfig(filename[1], options, resolve);
        });
    }
  });
};

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
  .option(
    '-m, --multi <multi>',
    'Show multiple results (EXPERIMENTAL, please use the config option for this)'
  )
  .action(async (scoreStrings) => {
    let options = {};
    try {
      options = await findConfig(program.config);
      console.log('opts=', options);
    } catch (err) {
      if (!scoreStrings.length) throw new Error('No input found!');
    }
    ['percentage', 'format', 'split', 'diff', 'names', 'mutli'].forEach((option) => {
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
