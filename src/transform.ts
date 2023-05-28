// eslint-disable-next-line node/no-missing-import
import { scoreToString } from './process';

const jsonTransform = (results: Result[], cliOpts: CommanderOptions): void => {
  console.dir(cliOpts.split ? Object.values(results) : results);
};

const csvTransform = (results: Result[], cliOpts: CommanderOptions): string[] => {
  const name = (cliOpts.names as string[])?.length ? 'name,' : '';
  const output: string[] = [];

  if (cliOpts.split) {
    output.push(`${name}perf,a11y,bp,seo,pwa,average`);
    for (const score of results) {
      let out = Object.values(score);
      if (name.length) {
        out = out.slice(0, -1);
        out[4] = `${Object.values(out[4]).join('/')}`;
        output.push(`${score.name},${out.join(',')}`);
      } else {
        out[4] = `${Object.values(out[4]).join('/')}`;
        output.push(out.join(','));
      }
    }
  } else {
    /* eslint-disable security/detect-object-injection */
    output.push(`${name}input,average`);
    for (const idx in results) {
      output.push(
        `${name.length ? (cliOpts.names as string[])[idx] + ',' : ''}"${cliOpts.inputs[idx]}",${
          results[idx].average
        }`
      );
    }
  }

  return output;
};

const mdTransform = (results: Result[], cliOpts: CommanderOptions): string[] => {
  const hasNames = (cliOpts.names as string[])?.length;
  const output: string[] = [];

  if (cliOpts.split) {
    output.push(
      hasNames
        ? '| Name | Perf | A11y | BP | SEO | PWA | Average |\n|------|------|------|----|-----|-----|---------|'
        : '| Perf | A11y | BP | SEO | PWA | Average |\n|------|------|----|-----|-----|---------|'
    );
    for (const score of results) {
      let out = Object.values(score);
      if (hasNames) {
        out = out.slice(0, -1);
        out[4] = `(${Object.values(out[4]).join(', ')})`;
        output.push((score.name ? `| ${score.name} ` : '') + `| ${out.join(' | ')} |`);
      } else {
        out[4] = `(${Object.values(out[4]).join(', ')})`;
        output.push(`| ${out.join(' | ')} |`);
      }
    }
  } else {
    output.push(
      hasNames
        ? '| Name | Input | Average |\n|------|-------|---------|'
        : '| Input | Average |\n|-------|---------|'
    );
    for (const idx in results) {
      output.push(
        `${results[idx].name ? '| ' + results[idx].name + ' ' : ''}| ${cliOpts.inputs[idx]} | ${
          results[idx].average
        } |`
      );
    }
  }

  return output;
};

const htmlTransform = (results: Result[], cliOpts: CommanderOptions): string[] => {
  const name = (cliOpts.names as string[])?.length ? '<th>Name</th>' : '';
  const output: string[] = [];

  if (cliOpts.split) {
    output.push(
      `<table>\n  <tr>\n    ${name}<th>Perf</th><th>A11y</th><th>BP</th><th>SEO</th><th>PWA</th><th>Average</th>\n  </tr>`
    );
    for (const score of results) {
      let out = Object.values(score);
      if (name.length) {
        out = out.slice(0, -1);
        out[4] = `(${Object.values(out[4]).join(', ')})`;
        output.push(
          `  <tr>\n    ${score.name && '<td>' + score.name + '</td>'}<td>${out.join(
            '</td><td>'
          )}</td>\n  </tr>`
        );
      } else {
        out[4] = `(${Object.values(out[4]).join(', ')})`;
        output.push(`  <tr>\n    <td>${out.join('</td><td>')}</td>\n  </tr>`);
      }
    }
    output.push('</table>');
  } else {
    output.push(`<table>\n  <tr>\n    ${name}<th>Input</th><th>Average</th>\n  </tr>`);
    for (const idx in results) {
      output.push(
        `  <tr>\n    ${results[idx].name ? '<td>' + results[idx].name + '</td>' : ''}<td>${
          cliOpts.inputs[idx]
        }</td><td>${results[idx].average}</td>\n  </tr>`
      );
    }
    output.push('</table>');
  }

  return output;
};

const textTransform = (results: Result[], cliOpts: CommanderOptions): string[] => {
  const name = (cliOpts.names as string[])?.length ? 'Name: ' : '';
  const output: string[] = [];

  if (cliOpts.split) {
    output.push(`${name}Perf / A11y / BP / SEO / PWA => Average`);
    for (const score of results) {
      let out = Object.values(score);
      if (name.length) {
        out = out.slice(0, -1);
        out[4] = `(${Object.values(out[4]).join(', ')})`;
        output.push(
          (cliOpts.names ? score.name + ': ' : '') + out.join(' / ').replace(') /', ') =>')
        );
      } else {
        out[4] = `(${Object.values(out[4]).join(', ')})`;
        output.push(out.join(' / ').replace(') /', ') =>'));
      }
    }
  } else {
    output.push(`${name}Input => Average`);
    for (const idx in results) {
      if (cliOpts.diff) {
        const str = scoreToString(results[idx]);
        output.push(str);
      } else {
        output.push(
          `${cliOpts.names ? results[idx].name + ': ' : ''}"${cliOpts.inputs[idx]}" => ${
            results[idx].average
          }`
        );
      }
    }
  }

  return output;
};

const arrayToLog = (output: string[]): void => {
  output.forEach((line) => console.log(line));
};

export { jsonTransform, csvTransform, mdTransform, htmlTransform, textTransform, arrayToLog };
