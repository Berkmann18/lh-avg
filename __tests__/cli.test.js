const cmd = require('./cmd');
// const cli = require('../cli');
const path = require('path');

const INPUT = '13 / 94 / 86 / 75 / (0/3, 0/3, 2/7)';

/* test('normal', async (done) => {
  const response = await cmd.execute('./cli', [INPUT]);
  expect(response.trim().split(EOL)).toEqual('0.423673469387755');
  done();
}); */
describe('Singular flag', () => {
  const cliPath = path.join(__dirname, '../cli.js');
  const cliProcess = cmd.create(cliPath, '.');

  it('should default to text', async (done) => {
    const response = await cliProcess.execute([INPUT]);
    expect(response).toEqual(`Input: Average\n"${INPUT}" => 0.423673469387755\n`);
    done();
  });
});

// TODO -p
/* test('-p', async (done) => {
  const response = await cmd.execute('../cli', [INPUT, '-p']);
  expect(response).toEqual('42.37%');
  done();
}); */

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
