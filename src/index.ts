// eslint-disable-next-line node/no-missing-import
import { parseScoreString, percentagify, processDifference } from './process';

/**
 * @private
 */
const mean = (nums: number[]): number => nums.reduce((acc, val) => acc + val, 0) / nums.length;

/**
 * Lighthouse average score calculator.
 * @param {string} scoreStr Lighthouse score string of the form ('num / num / num / num / (num, num, num)')
 * @param {boolean} [asPercentage=false] Return percentages (_as strings_) instead of numbers
 * @returns {Result} Result with the individual scores for each metrics.
 * @private
 */
const avg = (scoreStr: string, asPercentage: boolean): Result => {
  const scores = parseScoreString(scoreStr);
  const [perf, a11y, bp, seo, fnr, ins, po] = scores;

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

  if (asPercentage) return percentagify(out);

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
    processDifference(scoreStrings, results, asPercentage);
  }

  return results;
};

export default average;
