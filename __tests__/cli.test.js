const path = require('path');
const cmd = require('./cmd');
const { INPUT, AVG, PERC, JSON, CSV, MD, HTML } = require('./fixtures');

/* test('normal', async (done) => {
  const response = await cmd.execute('./cli', [INPUT]);
  expect(response.trim().split(EOL)).toEqual('0.423673469387755');
  done();
}); */
describe('Singular flag', () => {
  const cliPath = path.join(__dirname, '../cli.js');
  const cliProcess = cmd.create(cliPath, '.');

  it('should default to text', async () => {
    const response = await cliProcess.execute([INPUT]);
    expect(response).toEqual(`Input: Average\n"${INPUT}" => ${AVG}\n`);
    // done();
  });

  it('can show percentages', async () => {
    const response = await cliProcess.execute([INPUT, '-p']);
    expect(response).toEqual(`Input: Average\n"${INPUT}" => ${PERC}\n`);
  });

  it('can print in JSON', async () => {
    const response = await cliProcess.execute([INPUT, '-f', 'json']);
    expect(response).toEqual(JSON.normal);
  });

  it('can print in CSV', async () => {
    const response = await cliProcess.execute([INPUT, '-f', 'csv']);
    expect(response).toEqual(CSV.normal);
  });

  it('can print in MD', async () => {
    const response = await cliProcess.execute([INPUT, '-f', 'md']);
    expect(response).toEqual(MD.normal);
  });

  it('can print in HTML', async () => {
    const response = await cliProcess.execute([INPUT, '-f', 'html']);
    expect(response).toEqual(HTML.normal);
  });
});

// TODO -s

// TODO -d

// TODO -n

// TODO -f json, csv, md, html

// TODO -ps

// TODO -psd

// Errors
/* test('error', async (done) => {
  try {
    await cmd.execute('../cli', ['0/0/0/0']);
  } catch (err) {
    expect(err.trim()).toEqual('Invalid expression!');
  }
  done();
}); */
