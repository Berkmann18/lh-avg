// eslint-disable-next-line node/no-missing-import
import split from './split';

const signsResult = (result: number): string => {
  let output: string = result.toString();
  output = result === 0 ? '-' : `${Math.round(result * 100) / 100}%`;
  if (result > 0) output = `+${output}`;
  return output;
};

const PROCESSABLE_FIELDS = ['perf', 'a11y', 'bp', 'seo', 'average'];
const PWA_FIELDS = ['fnr', 'ins', 'po'];

const processResultAsDiff = (results: Result[], idx: number): void => {
  /* eslint-disable security/detect-object-injection */
  PROCESSABLE_FIELDS.forEach((key) => {
    results[idx][key] =
      parseFloat(results[idx][key] as string) - parseFloat(results[0][key] as string);
    results[idx][key] = signsResult(results[idx][key] as number);
  });
  const refPwa = results[0].pwa as SubObj;
  const pwa = results[idx].pwa as SubObj;
  PWA_FIELDS.forEach((key) => {
    pwa[key] = parseFloat(pwa[key] as string) - parseFloat(refPwa[key] as string);
    pwa[key] = signsResult(pwa[key] as number);
  });
};

const processDifference = (
  scoreStrings: string[],
  results: Result[],
  asPercentage: boolean
): Result[] => {
  const ref = results[0];
  const refPwa = ref.pwa as SubObj;
  /* eslint-disable security/detect-object-injection */
  if (asPercentage) {
    for (let idx = 1; idx < scoreStrings.length; ++idx) {
      processResultAsDiff(results, idx);
    }
    return results;
  }
  for (let idx = 1; idx < scoreStrings.length; ++idx) {
    PROCESSABLE_FIELDS.forEach((key) => {
      (results[idx][key] as number) -= ref[key] as number;
    });
    const pwa = results[idx].pwa as SubObj;
    PWA_FIELDS.forEach((key) => {
      (pwa[key] as number) -= refPwa[key] as number;
    });
  }
  return results;
};

/**
 * @private
 */
const perc = (num: number): string => `${Math.round(num * 10000) / 100}%`;

const percentagify = (result: Result): Result => {
  return {
    perf: perc(result.perf as number),
    a11y: perc(result.a11y as number),
    bp: perc(result.bp as number),
    seo: perc(result.seo as number),
    pwa: {
      fnr: perc(result.pwa.fnr as number),
      ins: perc(result.pwa.ins as number),
      po: perc(result.pwa.po as number)
    },
    average: perc(result.average as number)
  };
};

/**
 * @private
 */
const safeFractionEval = (fraction: string): number => {
  const [num, denum] = fraction.split('/');
  return parseInt(num) / parseInt(denum);
};

const perc2float = (percentages: string[], denominator = 100): number[] => {
  return percentages.map((perc) => parseFloat(perc) / denominator);
};

const pwaScores = (output: LhReGroup, shorthandForm: boolean): number[] => {
  if (shorthandForm) {
    return [parseFloat(output.fnr) / 3, parseFloat(output.ins) / 3, parseFloat(output.po) / 7];
  }
  return [output.fnr, output.ins, output.po].map(safeFractionEval);
};

const parseScoreString = (scoreStr: string): number[] => {
  const { output, shorthandForm } = split(scoreStr);
  const result = perc2float([output.perf, output.a11y, output.bp, output.seo]);
  const pwa = pwaScores(output, shorthandForm);
  return result.concat(pwa);
};

export { processDifference, percentagify, parseScoreString };
