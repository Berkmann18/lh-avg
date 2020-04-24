const avg = require('../src/index.ts').default;
// import avg from '../build/main';

describe('baseline', () => {
  test('empty', () => {
    expect(avg('')).toBe(NaN);
  });

  test('0*4', () => {
    expect(avg('0/0/0/0')).toBe(0);
  });

  test('full 0', () => {
    expect(avg('0/0/0/0/(0/1, 0/1, 0/2)')).toBe(0);
  });
});

test('valid (old)', () => {
  expect(avg('13 / 94 / 86 / 75 / (0/3, 0/3, 2/7)')).toStrictEqual(0.423673469387755);
});

// TODO Make the result consistent
// TODO add tests for an option to return a percentage string
describe('Compressed', () => {
  test('valid (old)', () => {
    expect(avg('13/94/86/75/(0/3, 0/3, 2/7)')).toStrictEqual(0.423673469387755);
  });

  test('invalid (old)', () => {
    expect(avg('13/94/86/75/(0/3,0/3,2/7)')).toStrictEqual(NaN);
  });

  test('mixed (old)', () => {
    expect(avg('94/13/75/86/(0/3, 2/7, 0/3)')).toStrictEqual(0.423673469387755);
  });

  // test('short', () => {
  //   expect(avg('13/94/86/75/28.571428571428571428')).toStrictEqual(0.23532890365448505);
  // });

  test('no-pwa', () => {
    expect(avg('13/94/86/75')).toStrictEqual(67);
  });
});
