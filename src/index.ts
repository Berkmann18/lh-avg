// eslint-disable-next-line node/no-missing-import
import split from './split';

/**
 * @private
 */
const mean = (nums: number[]): number => nums.reduce((acc, val) => acc + val, 0) / nums.length;

/**
 * @private
 */
const perc = (num: number): string => `${Math.round(num * 10000) / 100}%`;

/**
 * @private
 */
const safeFractionEval = (fraction: string): number => {
  // return fraction.split('/').map(parseFloat).reduce((acc, val) => acc / val);
  const [num, denum] = fraction.split('/');
  return parseInt(num) / parseInt(denum);
};

type NumLike = number | string;
type SubObj = Record<string, NumLike>;
type ResultKey = NumLike | SubObj;

interface Result {
  perf: NumLike; // Performance
  a11y: NumLike; // Accessibility
  bp: NumLike; // Best Practices
  seo: NumLike; // Search Engine Optimization
  pwa: {
    fnr: NumLike; // Fast & Reliable
    ins: NumLike; // Installable
    po: NumLike; // PWA Optimized
  };
  average: NumLike;
  [key: string]: ResultKey;
}

/**
 * Lighthouse average score calculator.
 * @param {string} scoreStr Lighthouse score string of the form ('num / num / num / num / (num, num, num)')
 * @param {boolean} [asPercentage=false] Return percentages (_as strings_) instead of numbers
 * @returns {Result} Result with the individual scores for each metrics.
 * @private
 */
const avg = (scoreStr: string, asPercentage = false): Result => {
  const { output, shorthandForm } = split(scoreStr);

  const perf = parseFloat(output.perf) / 100;
  const a11y = parseFloat(output.a11y) / 100;
  const bp = parseFloat(output.bp) / 100;
  const seo = parseFloat(output.seo) / 100;
  let fnr = null;
  let ins = null;
  let po = null;

  if (shorthandForm) {
    fnr = parseFloat(output.fnr) / 3;
    ins = parseFloat(output.ins) / 3;
    po = parseFloat(output.po) / 7;
  } else {
    fnr = safeFractionEval(output.fnr);
    ins = safeFractionEval(output.ins);
    po = safeFractionEval(output.po);
  }

  const scores = [perf, a11y, bp, seo, fnr, ins, po];

  const average = mean(scores);
  const out = {
    perf,
    a11y,
    bp,
    seo,
    pwa: {
      fnr,
      ins,
      po
    },
    average
  };

  if (asPercentage) {
    return {
      perf: perc(perf),
      a11y: perc(a11y),
      bp: perc(bp),
      seo: perc(seo),
      pwa: {
        fnr: perc(fnr),
        ins: perc(ins),
        po: perc(po)
      },
      average: perc(average)
    };
  }

  return out;
};

/**
 * Lighthouse average scores calculator.
 * @param {string[]} scoreStrings List of Lighthouse score strings of the form ('num / num / num / num / (num, num, num)')
 * @param {object} [opts={}] Options.
 * @param {boolean} [opts.asPercentage=false] Return percentages (_as strings_) instead of numbers
 * @param {boolean} [opts.showDiff=false] Show the difference between the first row and the subsequent ones.
 * @param {string[]} [opts.names=[]] List of names to add to each respective results.
 * @returns {Result[]} Results with the individual scores for each metrics.
 * @example <caption>Spaced</caption>
 *
 * ```js
 * average(['14 / 100 / 98 / 100 / (1, 0, 6)']);
 * /* Returns:
 * [{
 *   perf: 0.14,
 *   a11y: 1,
 *   bp: 0.98,
 *   seo: 1,
 *   pwa: { fnr: 0.3333333333333333, ins: 0, po: 0.8571428571428571 },
 *   average: 0.6157823129251702
 * }] * /
 * ```
 *
 * @example <caption>Percentages</caption>
 *
 * ```js
 * average(['14 / 100 / 98 / 100 / (1, 0, 6)'], { asPercentage: true });
 * /* Returns:
 * [{
 *   perf: '14%',
 *   a11y: '100%',
 *   bp: '98%',
 *   seo: '100%',
 *   pwa: { fnr: '33.33%', ins: '0%', po: '85.71%' },
 *   average: '61.58%'
 * }] * /
 * ```
 *
 * @example <caption>Compressed</caption>
 *
 * ```js
 * average(['14/100/98/100/(1,0,6)']);
 * /* Returns:
 * [{
 *   perf: 0.14,
 *   a11y: 1,
 *   bp: 0.98,
 *   seo: 1,
 *   pwa: { fnr: 0.3333333333333333, ins: 0, po: 0.8571428571428571 },
 *   average: 0.6157823129251702
 * }] * /
 * ```
 * @example <caption>Difference</caption>
 *
 * ```js
 * average(['14 / 100 / 98 / 100 / (1, 0, 6)', '28 / 100 / 97 / 100 / (1, 2, 6)'], { showDiff: true });
 * /* Returns:
 * [{
 *   perf: 0.14,
 *   a11y: 1,
 *   bp: 0.98,
 *   seo: 1,
 *   pwa: { fnr: 0.3333333333333333, ins: 0, po: 0.8571428571428571 },
 *   average: 0.6157823129251702
 * },
 * {
 *   perf: 0.14,
 *   a11y: 0,
 *   bp: -0.01,
 *   seo: 1,
 *   pwa: { fnr: 0, ins: 0.66666666666666, po: 0.8571428571428571 },
 *   average: 0.1138095238095237
 * }] * /
 * ```
 *
 * For more ways to input scores, please see the unit tests in \_\_tests\_\_/
 */
const average = (
  scoreStrings: string[],
  { asPercentage = false, showDiff = false, names = [] } = {}
): Result[] => {
  const results: Result[] = scoreStrings.map((str) => avg(str, asPercentage));
  if (names.length) {
    /* eslint-disable security/detect-object-injection */
    results.forEach((res, idx) => {
      res.name = names[idx];
    });
  }
  if (showDiff) {
    const ref = results[0];
    const refPwa = ref.pwa as SubObj;
    /* eslint-disable security/detect-object-injection */
    if (asPercentage) {
      for (let idx = 1; idx < scoreStrings.length; ++idx) {
        ['perf', 'a11y', 'bp', 'seo', 'average'].forEach((key) => {
          results[idx][key] =
            parseFloat(results[idx][key] as string) - parseFloat(ref[key] as string);
          const better = results[idx][key] > 0;
          const noChange = results[idx][key] === 0;
          results[idx][key] = noChange
            ? '-'
            : `${Math.round((results[idx][key] as number) * 100) / 100}%`;
          if (better) results[idx][key] = '+' + results[idx][key];
        });
        const pwa = results[idx].pwa as SubObj;
        ['fnr', 'ins', 'po'].forEach((key) => {
          pwa[key] = parseFloat(pwa[key] as string) - parseFloat(refPwa[key] as string);
          const better = pwa[key] > 0;
          const noChange = pwa[key] === 0;
          pwa[key] = noChange ? '-' : `${Math.round((pwa[key] as number) * 100) / 100}%`;
          if (better) pwa[key] = '+' + pwa[key];
        });
      }
      return results;
    }
    for (let idx = 1; idx < scoreStrings.length; ++idx) {
      ['perf', 'a11y', 'bp', 'seo', 'average'].forEach((key) => {
        (results[idx][key] as number) -= ref[key] as number;
      });
      const pwa = results[idx].pwa as SubObj;
      ['fnr', 'ins', 'po'].forEach((key) => {
        (pwa[key] as number) -= refPwa[key] as number;
      });
    }
  }

  return results;
};

export default average;
