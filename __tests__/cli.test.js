const path = require('path');
const cmd = require('./cmd');
const { INPUT, JSON, CSV, MD, HTML, DEFAULT } = require('./fixtures');

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
    expect(response).toEqual(DEFAULT.normal);
    // done();
  });

  it('can show percentages', async () => {
    const response = await cliProcess.execute([INPUT, '-p']);
    expect(response).toEqual(DEFAULT.perc);
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

  it('can show split data', async () => {
    const response = await cliProcess.execute([INPUT, '-s']);
    expect(response).toEqual(DEFAULT.split);
  });

  // it('can show diff data', async () => {
  //   const response = await cliProcess.execute([...TWO_INPUTS, '-d']);
  //   expect(response).toEqual(DEFAULT.diff);
  // });
});

// TODO -n

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
