#!/usr/bin/env node

const { program } = require('commander');
const pkg = require('./package.json');
// eslint-disable-next-line node/no-missing-require
const avg = require('./build/main').default;

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
        console.dir(program.split ? Object.values(results) : results);
        break;
      case 'csv':
        if (program.split) {
          console.log(`${program.names ? 'name,' : ''}perf,a11y,bp,seo,pwa,average`);
          for (const score of results) {
            let out = Object.values(score);
            if (program.names) {
              out = out.slice(0, -1);
              out[4] = `${Object.values(out[4]).join('/')}`;
              console.log(`${score.name},${out.join(',')}`);
            } else {
              out[4] = `${Object.values(out[4]).join('/')}`;
              console.log(out.join(','));
            }
          }
        } else {
          /* eslint-disable security/detect-object-injection */
          console.log(`${program.names ? 'name,' : ''}input,average`);
          for (const idx in results) {
            console.log(
              `${program.names ? program.names[idx] + ',' : ''}"${scoreStrings[idx]}",${
                results[idx].average
              }`
            );
          }
        }
        break;
      case 'md':
        if (program.split) {
          console.log(
            `${
              program.names ? '| Name ' : ''
            }| Perf | A11y | BP | SEO | PWA | Average |\n|------|------|----|-----|-----|---------|`
          );
          for (const score of results) {
            let out = Object.values(score);
            if (program.names) {
              out = out.slice(0, -1);
              out[4] = `(${Object.values(out[4]).join(', ')})`;
              console.log(score.name && `| ${score.name}`, '|', out.join(' | '), '|');
            } else {
              out[4] = `(${Object.values(out[4]).join(', ')})`;
              console.log('|', out.join(' | '), '|');
            }
          }
        } else {
          console.log(`${program.names ? '| Name ' : ''}| Input | Average |\n|-------|---------|`);
          for (const idx in results) {
            console.log(
              `${results[idx].name ? '| ' + results[idx].name : ''}| ${scoreStrings[idx]} | ${
                results[idx].average
              } |`
            );
          }
        }
        break;
      case 'html':
        if (program.split) {
          console.log(
            `<table>\n  <tr>\n    ${
              program.names ? '<th>Name</th>' : ''
            }<th>Perf</th><th>A11y</th><th>BP</th><th>SEO</th><th>PWA</th><th>Average</th>\n  </tr>`
          );
          for (const score of results) {
            let out = Object.values(score);
            if (program.names) {
              out = out.slice(0, -1);
              out[4] = `(${Object.values(out[4]).join(', ')})`;
              console.log(
                `  <tr>\n    ${score.name && '<td>' + score.name + '</td>'}<td>${out.join(
                  '</td><td>'
                )}</td>\n  </tr>`
              );
            } else {
              out[4] = `(${Object.values(out[4]).join(', ')})`;
              console.log(`  <tr>\n    <td>${out.join('</td><td>')}</td>\n  </tr>`);
            }
          }
          console.log('</table>');
        } else {
          console.log(
            `<table>\n  <tr>\n    ${
              program.names ? '<th>Name</th>' : ''
            }<th>Input</th><th>Average</th>\n  </tr>`
          );
          for (const idx in results) {
            console.log(
              `  <tr>\n    ${results[idx].name ? '<td>' + results[idx].name + '</td>' : ''}<td>${
                scoreStrings[idx]
              }</td><td>${results[idx].average}</td>\n  </tr>`
            );
          }
        }
        break;
      default:
        if (program.split) {
          console.log(`${program.names ? 'Name: ' : ''}Perf / A11y / BP / SEO / PWA => Average`);
          for (const score of results) {
            let out = Object.values(score);
            if (program.names) {
              out = out.slice(0, -1);
              out[4] = `(${Object.values(out[4]).join(', ')})`;
              console.log(
                program.name ? score.name + ':' : '',
                out.join(' / ').replace(') /', ') =>')
              );
            } else {
              out[4] = `(${Object.values(out[4]).join(', ')})`;
              console.log(out.join(' / ').replace(') /', ') =>'));
            }
          }
        } else {
          console.log('Input: Average');
          for (const idx in results) {
            console.log(`"${scoreStrings[idx]}" => ${results[idx].average}`);
          }
        }
    }
  })
  .parse(process.argv);
