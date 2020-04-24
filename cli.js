#!/usr/bin/env node

const { program } = require('commander');
const pkg = require('./package.json');
const avg = require('./build/main').default;

/*
 Usage: ./cli.js '13/94/86/75/(0, 0, 2)' '27 / 100 / 86 / 100 / (0/3, 1/3, 6/7)'
*/

program
  .arguments('[scoreStrings...]')
  .version(pkg.version)
  .description(pkg.description)
  .option('-p, --percentage', 'Return the result(s) in percentage form')
  // TODO Add JSON/CSV/MD/HTML exports
  .action(scoreStrings => {
    scoreStrings.forEach(str => {
      console.log(`"${str}": ${avg(str, program.percentage)}`);
    });
  })
  .parse(process.argv);
