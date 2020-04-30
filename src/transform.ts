// eslint-disable-next-line node/no-missing-import
import { scoreToString } from './process';

const jsonTransform = (results: Result[], cliOpts: CommanderOptions): void => {
  console.dir(cliOpts.split ? Object.values(results) : results);
};

const csvTransform = (results: Result[], cliOpts: CommanderOptions): void => {
  const name = (cliOpts.names as string[])?.length ? 'name,' : '';
  if (cliOpts.split) {
    console.log(`${name}perf,a11y,bp,seo,pwa,average`);
    for (const score of results) {
      let out = Object.values(score);
      if (name.length) {
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
    console.log(`${name}input,average`);
    for (const idx in results) {
      console.log(
        `${name.length ? cliOpts.names[idx] + ',' : ''}"${cliOpts.inputs[idx]}",${
          results[idx].average
        }`
      );
    }
  }
};

const mdTransform = (results: Result[], cliOpts: CommanderOptions): void => {
  const hasNames = (cliOpts.names as string[])?.length;
  if (cliOpts.split) {
    console.log(
      hasNames
        ? '| Name | Perf | A11y | BP | SEO | PWA | Average |\n|------|------|------|----|-----|-----|---------|'
        : '| Perf | A11y | BP | SEO | PWA | Average |\n|------|------|----|-----|-----|---------|'
    );
    for (const score of results) {
      let out = Object.values(score);
      if (hasNames) {
        out = out.slice(0, -1);
        out[4] = `(${Object.values(out[4]).join(', ')})`;
        console.log(score.name ? `| ${score.name}` : '', '|', out.join(' | '), '|');
      } else {
        out[4] = `(${Object.values(out[4]).join(', ')})`;
        console.log('|', out.join(' | '), '|');
      }
    }
  } else {
    console.log(
      hasNames
        ? '| Name | Input | Average |\n|------|-------|---------|'
        : '| Input | Average |\n|-------|---------|'
    );
    for (const idx in results) {
      console.log(
        `${results[idx].name ? '| ' + results[idx].name + ' ' : ''}| ${cliOpts.inputs[idx]} | ${
          results[idx].average
        } |`
      );
    }
  }
};

const htmlTransform = (results: Result[], cliOpts: CommanderOptions): void => {
  const name = (cliOpts.names as string[])?.length ? '<th>Name</th>' : '';
  if (cliOpts.split) {
    console.log(
      `<table>\n  <tr>\n    ${name}<th>Perf</th><th>A11y</th><th>BP</th><th>SEO</th><th>PWA</th><th>Average</th>\n  </tr>`
    );
    for (const score of results) {
      let out = Object.values(score);
      if (name.length) {
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
    console.log(`<table>\n  <tr>\n    ${name}<th>Input</th><th>Average</th>\n  </tr>`);
    for (const idx in results) {
      console.log(
        `  <tr>\n    ${results[idx].name ? '<td>' + results[idx].name + '</td>' : ''}<td>${
          cliOpts.inputs[idx]
        }</td><td>${results[idx].average}</td>\n  </tr>`
      );
    }
    console.log('</table>');
  }
};

const textTransform = (results: Result[], cliOpts: CommanderOptions): void => {
  const name = (cliOpts.names as string[])?.length ? 'Name: ' : '';
  if (cliOpts.split) {
    console.log(`${name}Perf / A11y / BP / SEO / PWA => Average`);
    for (const score of results) {
      let out = Object.values(score);
      if (name.length) {
        out = out.slice(0, -1);
        out[4] = `(${Object.values(out[4]).join(', ')})`;
        console.log(cliOpts.names ? score.name + ':' : '', out.join(' / ').replace(') /', ') =>'));
      } else {
        out[4] = `(${Object.values(out[4]).join(', ')})`;
        console.log(out.join(' / ').replace(') /', ') =>'));
      }
    }
  } else {
    console.log(`${name}Input => Average`);
    for (const idx in results) {
      if (cliOpts.diff) {
        const str = scoreToString(results[idx]);
        console.log(str);
      } else {
        console.log(
          `${cliOpts.names ? results[idx].name + ': ' : ''}"${cliOpts.inputs[idx]}" => ${
            results[idx].average
          }`
        );
      }
    }
  }
};

export { jsonTransform, csvTransform, mdTransform, htmlTransform, textTransform };
