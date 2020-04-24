const avg = require('../src/index.ts').default;
// import avg from '../build/main';

describe('baseline', () => {
  test('empty', () => {
    expect(() => avg('')).toThrow('Invalid expression!');
  });

  test('0*4', () => {
    expect(() => avg('0/0/0/0')).toThrow('Invalid expression!');
  });

  test('full 0', () => {
    expect(avg('0/0/0/0/(0/1, 0/1, 0/2)')).toBe(0);
  });
});

const result = 0.423673469387755;

describe('normal', () => {
  test('longhand', () => {
    expect(avg('13 / 94 / 86 / 75 / (0/3, 0/3, 2/7)')).toStrictEqual(result);
  });
  test('shorthand', () => {
    expect(avg('13 / 94 / 86 / 75 / (0, 0, 2)')).toStrictEqual(result);
  });
});

describe('Compressed', () => {
  test('valid (longhand)', () => {
    expect(avg('13/94/86/75/(0/3, 0/3, 2/7)')).toStrictEqual(result);
  });

  test('invalid (longhand)', () => {
    expect(avg('13/94/86/75/(0/3,0/3,2/7)')).toStrictEqual(result);
  });

  test('mixed (longhand)', () => {
    expect(avg('94/13/75/86/(0/3, 2/7, 0/3)')).toStrictEqual(result);
  });

  // test('short', () => {
  //   expect(avg('13/94/86/75/28.571428571428571428')).toStrictEqual(0.23532890365448505);
  // });

  test('no-pwa', () => {
    expect(() => avg('13/94/86/75')).toThrow('Invalid expression!');
  });
});
