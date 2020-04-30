// eslint-disable-next-line node/no-missing-import
import split from './split';

const round = (num: number): number => Math.round(num * 100) / 100;

/** @private */
const signsResult = (result: number): string => {
  let output: string = result.toString();
  output = result === 0 ? '-' : `${round(result)}%`;
  if (result > 0) output = `+${output}`;
  return output;
};

/** @private */
const PROCESSABLE_FIELDS = ['perf', 'a11y', 'bp', 'seo', 'average'];
/** @private */
const PWA_FIELDS = ['fnr', 'ins', 'po'];

/** @private */
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

/** @protected */
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

/** @private */
const perc = (num: number): string => `${Math.round(num * 10000) / 100}%`;

/** @protected */
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

/** @private */
const safeFractionEval = (fraction: string): number => {
  const [num, denum] = fraction.split('/');
  return parseInt(num) / parseInt(denum);
};

/** @private */
const perc2float = (percentages: string[], denominator = 100): number[] => {
  return percentages.map((perc) => parseFloat(perc) / denominator);
};

/** @private */
const pwaScores = (output: LhReGroup, shorthandForm: boolean): number[] => {
  if (shorthandForm) {
    return [parseFloat(output.fnr) / 3, parseFloat(output.ins) / 3, parseFloat(output.po) / 7];
  }
  return [output.fnr, output.ins, output.po].map(safeFractionEval);
};

/** @protected */
const parseScoreString = (scoreStr: string): number[] => {
  const { output, shorthandForm } = split(scoreStr);
  const result = perc2float([output.perf, output.a11y, output.bp, output.seo]);
  const pwa = pwaScores(output, shorthandForm);
  return result.concat(pwa);
};

const scoreToString = (score: Result /*,  rounding = false */): string => {
  /* return rounding
    ? `"${round(score.perf as number)} / ${round(score.a11y as number)} / ${round(
        score.bp as number
    )} / ${round(score.seo as number)} / (${round(score.pwa.fnr as number)}, ${round(
        score.pwa.ins as number
    )}, ${round(score.pwa.po as number)})" => ${round(score.average as number)}`
    : `"${score.perf} / ${score.a11y} / ${score.bp} / ${score.seo} / (${score.pwa.fnr}, ${score.pwa.ins}, ${score.pwa.po})" => ${score.average}`; */
  return `"${score.perf} / ${score.a11y} / ${score.bp} / ${score.seo} / (${score.pwa.fnr}, ${score.pwa.ins}, ${score.pwa.po})" => ${score.average}`;
};

export { processDifference, percentagify, parseScoreString, scoreToString };
