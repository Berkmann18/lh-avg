const avg = require('../src/index.ts').default;
const { AVG, PERC, DEFAULT, NAMES, INPUT } = require('./fixtures');

describe('baseline', () => {
  test('empty', () => {
    expect(() => avg([''])).toThrow('Invalid expression!');
  });

  test('0*4', () => {
    expect(() => avg(['0/0/0/0'])).toThrow('Invalid expression!');
  });

  test('full 0 (longhand)', () => {
    expect(avg(['0/0/0/0/(0/1, 0/1, 0/2)'])[0].average).toStrictEqual(0);
  });

  test('full 0% (longhand)', () => {
    expect(avg(['0/0/0/0/(0/1, 0/1, 0/2)'], { asPercentage: true })[0].average).toStrictEqual('0%');
  });

  test('full 100 (longhand)', () => {
    expect(avg(['100/100/100/100/(1/1, 1/1, 2/2)'])[0].average).toStrictEqual(1);
  });

  test('full 100% (longhand)', () => {
    expect(avg(['100/100/100/100/(1/1, 1/1, 2/2)'], { asPercentage: true })[0].average).toStrictEqual('100%');
  });

  test('full 0', () => {
    expect(avg(['0/0/0/0/(0, 0, 0)'])[0].average).toStrictEqual(0);
  });

  test('full 0%', () => {
    expect(avg(['0/0/0/0/(0, 0, 0)'], { asPercentage: true })[0].average).toStrictEqual('0%');
  });

  test('full 100', () => {
    expect(avg(['100/100/100/100/(3, 3, 7)'])[0].average).toStrictEqual(1);
  });

  test('full 100%', () => {
    expect(avg(['100/100/100/100/(3, 3, 7)'], { asPercentage: true })[0].average).toStrictEqual('100%');
  });
});

describe('normal', () => {
  test('longhand', () => {
    expect(avg([INPUT])).toEqual(DEFAULT.normal);
  });

  test('shorthand', () => {
    expect(avg(['13 / 94 / 86 / 75 / (0, 0, 2)'])).toEqual(DEFAULT.normal);
  });

  test('shorthand (alt)', () => {
    expect(avg(['13 / 94 / 86 / 75 / (0/ 0/ 2)'])).toEqual(DEFAULT.normal);
  });
});

describe('percentage', () => {
  test('longhand', () => {
    expect(avg([INPUT], { asPercentage: true })).toEqual(DEFAULT.perc);
  });

  test('shorthand', () => {
    expect(avg(['13 / 94 / 86 / 75 / (0, 0, 2)'], { asPercentage: true })).toEqual(DEFAULT.perc);
  });

  test('shorthand (alt)', () => {
    expect(avg(['13 / 94 / 86 / 75 / (0/ 0/ 2)'], { asPercentage: true })).toEqual(DEFAULT.perc);
  });
});

describe('Compressed', () => {
  test('valid (longhand)', () => {
    expect(avg(['13/94/86/75/(0/3, 0/3, 2/7)'])).toEqual(DEFAULT.normal);
  });

  test('valid', () => {
    expect(avg(['13/94/86/75/(0, 0, 2)'])).toEqual(DEFAULT.normal);
    expect(avg(['13/94/86/75/(0,0,2)'])).toEqual(DEFAULT.normal);
  });

  test('valid (alt)', () => {
    expect(avg(['13/94/86/75/(0/ 0/ 2)'])).toEqual(DEFAULT.normal);
    expect(avg(['13/94/86/75/(0/0/2)'])).toEqual(DEFAULT.normal);
  });

  test('mixed (longhand)', () => {
    expect(avg(['94/13/75/86/(0/3, 2/7, 0/3)'])).toEqual([
      {
        perf: 0.94,
        a11y: 0.13,
        bp: 0.75,
        seo: 0.86,
        pwa: {
          fnr: 0,
          ins: 0.2857142857142857,
          po: 0
        },
        average: AVG
      }
    ]);
  });

  test('no-pwa', () => {
    expect(() => avg(['13/94/86/75'])).toThrow('Invalid expression!');
  });
});

describe('diff', () => {
  /* eslint-disable security/detect-object-injection */
  test('normal', () => {
    const actual = avg(['13 / 94 / 86 / 75 / (0, 0, 2)', '26 / 100 / 85 / 75 / (0, 0, 2)'], { showDiff: true });
    const expected = {
      perf: 0.13,
      a11y: 0.06,
      bp: -0.01,
      seo: 0,
      pwa: {
        fnr: 0,
        ins: 0,
        po: 0
      },
      average: 0.02571428571428576
    };
    expect(actual[0]).toEqual(DEFAULT.normal[0]);
    ['perf', 'a11y', 'bp', 'seo', 'average'].forEach(key => {
      expect(actual[1][key]).toBeCloseTo(expected[key], 5);
    });
    ['fnr', 'ins', 'po'].forEach(key => {
      expect(actual[1].pwa[key]).toBeCloseTo(expected.pwa[key], 5);
    });
  });

  test('percentage', () => {
    const actual = avg(['13 / 94 / 86 / 75 / (0, 0, 2)', '26 / 100 / 85 / 75 / (0, 0, 2)'], { asPercentage: true, showDiff: true });
    const expected = {
      perf: '+13%',
      a11y: '+6%',
      bp: '-1%',
      seo: '-',
      pwa: {
        fnr: '-',
        ins: '-',
        po: '-'
      },
      average: '+2.57%'
    };
    expect(actual[0]).toEqual(DEFAULT.perc[0]);
    ['perf', 'a11y', 'bp', 'seo', 'average'].forEach(key => {
      expect(actual[1][key]).toEqual(expected[key]);
    });

    ['fnr', 'ins', 'po'].forEach(key => {
      expect(actual[1].pwa[key]).toEqual(expected.pwa[key]);
    });
  });
});

describe('names', () => {
  test('normal', () => {
    const expected = [
      {
        perf: 0.13,
        a11y: 0.94,
        bp: 0.86,
        seo: 0.75,
        pwa: {
          fnr: 0,
          ins: 0,
          po: 0.2857142857142857
        },
        average: AVG,
        name: 'a'
      },
      {
        perf: 0.26,
        a11y: 1,
        bp: 0.85,
        seo: 0.75,
        pwa: {
          fnr: 0,
          ins: 0,
          po: 0.2857142857142857
        },
        average: 0.44938775510204076,
        name: 'b'
      }
    ];
    expect(avg(['13 / 94 / 86 / 75 / (0, 0, 2)', '26 / 100 / 85 / 75 / (0, 0, 2)'], { names: NAMES })).toEqual(expected);
  });

  test('diff', () => {
    const expected = [
      {
        perf: 0.13,
        a11y: 0.94,
        bp: 0.86,
        seo: 0.75,
        pwa: {
          fnr: 0,
          ins: 0,
          po: 0.2857142857142857
        },
        average: AVG,
        name: 'a'
      },
      {
        perf: 0.13,
        a11y: 0.06,
        bp: -0.01,
        seo: 0,
        pwa: {
          fnr: 0,
          ins: 0,
          po: 0
        },
        average: 0.02571428571428576,
        name: 'b'
      }
    ];
    const actual = avg(['13 / 94 / 86 / 75 / (0, 0, 2)', '26 / 100 / 85 / 75 / (0, 0, 2)'], { showDiff: true, names: NAMES });
    expect(actual[0]).toEqual({ ...DEFAULT.normal[0], name: NAMES[0] });
    ['perf', 'a11y', 'bp', 'seo', 'average'].forEach(key => {
      expect(actual[1][key]).toBeCloseTo(expected[1][key], 5);
    });
    ['fnr', 'ins', 'po'].forEach(key => {
      expect(actual[1].pwa[key]).toBeCloseTo(expected[1].pwa[key], 5);
    });
  });

  test('diff %', () => {
    const expected = [
      {
        perf: '13%',
        a11y: '94%',
        bp: '86%',
        seo: '75%',
        pwa: {
          fnr: '0%',
          ins: '0%',
          po: '28.57%'
        },
        average: PERC,
        name: 'a'
      },
      {
        perf: '+13%',
        a11y: '+6%',
        bp: '-1%',
        seo: '-',
        pwa: {
          fnr: '-',
          ins: '-',
          po: '-'
        },
        average: '+2.57%',
        name: 'b'
      }
    ];
    expect(avg(['13 / 94 / 86 / 75 / (0, 0, 2)', '26 / 100 / 85 / 75 / (0, 0, 2)'], { asPercentage: true, showDiff: true, names: NAMES })).toEqual(expected);
  });
});
