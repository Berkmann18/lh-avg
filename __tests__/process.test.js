const { scoreToString, generate } = require('../src/process.ts');
const { OUTPUT, PARSED_OUTPUT, INPUT, JSON_OUTPUT, CSV_OUTPUT, MD_OUTPUT, HTML_OUTPUT, TEXT_OUTPUT } = require('./fixtures.js');

test('scoreToString', () => {
  expect(scoreToString(OUTPUT[0])).toBe(PARSED_OUTPUT);
});


//TODO: Add tests that properly check the output from the transformers used by generate()
describe('generate', () => {
  test('JSON', () => {
    expect(generate({
      inputs: [INPUT],
      format: 'json'
    })).toBe(JSON_OUTPUT)
  });

  test('CSV', () => {
    expect(generate({
      inputs: [INPUT],
      format: 'csv'
    })).toBe(CSV_OUTPUT)
  });

  test('MD', () => {
    expect(generate({
      inputs: [INPUT],
      format: 'md'
    })).toBe(MD_OUTPUT)
  });

  test('HTML', () => {
    expect(generate({
      inputs: [INPUT],
      format: 'html'
    })).toBe(HTML_OUTPUT)
  });

  test('Text', () => {
    expect(generate({
      inputs: [INPUT],
      format: 'text'
    })).toBe(TEXT_OUTPUT)
  });
});