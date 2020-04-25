#!/usr/bin/env node

const { program } = require('commander');
const pkg = require('./package.json');
// eslint-disable-next-line node/no-missing-require
const avg = require('./build/main').default;

/*
 Usage: ./cli.js '13/94/86/75/(0, 0, 2)' '27 / 100 / 86 / 100 / (0/3, 1/3, 6/7)'
*/

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
  .action(scoreStrings => {
    const results = [];
    /* eslint-disable security/detect-object-injection */
    scoreStrings.forEach(str => {
      results[str] = avg(str, program.percentage);
    });

    /* eslint-disable indent */
    switch (program.format) {
      case 'json':
        console.dir(program.split ? Object.values(results) : results);
        break;
      case 'csv':
        if (program.split) {
          console.log('perf,a11y,bp,seo,pwa,average');
          for (const str in results) {
            const out = Object.values(results[str]);
            out[4] = `${Object.values(out[4]).join('/')}`;
            console.log(out.join(','));
          }
        } else {
          console.log('input,average');
          for (const str in results) {
            console.log(`"${str}",${results[str].average}`);
          }
        }
        break;
      case 'md':
        if (program.split) {
          console.log(
            '| Perf | A11y | BP | SEO | PWA | Average |\n|------|------|----|-----|-----|---------|'
          );
          for (const str in results) {
            const out = Object.values(results[str]);
            out[4] = `(${Object.values(out[4]).join(', ')})`;
            console.log('|', out.join(' | '), '|');
          }
        } else {
          console.log('| Input | Average |\n|-------|---------|');
          for (const str in results) {
            console.log(`| ${str} | ${results[str].average} |`);
          }
        }
        break;
      case 'html':
        if (program.split) {
          console.log(
            '<table>\n  <tr>\n    <th>Perf</th><th>A11y</th><th>BP</th><th>SEO</th><th>PWA</th><th>Average</th>\n  </tr>'
          );
          for (const str in results) {
            const out = Object.values(results[str]);
            out[4] = `(${Object.values(out[4]).join(', ')})`;
            console.log(`  <tr>\n    <td>${out.join('</td><td>')}</td>\n  </tr>`);
          }
          console.log('</table>');
        } else {
          console.log('<table>\n  <tr>\n    <th>Input</th><th>Average</th>\n  </tr>');
          for (const str in results) {
            console.log(`  <tr>\n    <td>${str}</td><td>${results[str].average}</td>\n  </tr>`);
          }
        }
        break;
      default:
        if (program.split) {
          console.log('Perf / A11y / BP / SEO / PWA: Average');
          for (const str in results) {
            const out = Object.values(results[str]);
            out[4] = `(${Object.values(out[4]).join(', ')})`;
            console.log(out.join(' / ').replace(') /', '):'));
          }
        } else {
          console.log('Input: Average');
          for (const str in results) {
            console.log(`"${str}": ${results[str].average}`);
          }
        }
    }
  })
  .parse(process.argv);
