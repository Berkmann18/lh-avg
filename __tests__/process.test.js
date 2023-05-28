const { scoreToString } = require('../src/process.ts');
const { OUTPUT, PARSED_OUTPUT } = require('./fixtures.js');

test('scoreToString', () => {
  expect(scoreToString(OUTPUT[0])).toBe(PARSED_OUTPUT);
});