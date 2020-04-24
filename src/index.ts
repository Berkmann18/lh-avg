import split from './split';

const mean = (nums: number[]): number => nums.reduce((acc, val) => acc + val, 0) / nums.length;

const safeFractionEval = (fraction: string): number => {
  // return fraction.split('/').map(parseFloat).reduce((acc, val) => acc / val);
  const [num, denum] = fraction.split('/');
  return parseInt(num) / parseInt(denum);
};

const avg = (scoreStr: string, asPercentage = false): number | string => {
  const { output, shorthandForm } = split(scoreStr);
  let scores: number[];

  const { perf, a11y, bp, seo, fnr, ins, po } = output;
  if (shorthandForm) {
    scores = [
      parseFloat(perf) / 100,
      parseFloat(a11y) / 100,
      parseFloat(bp) / 100,
      parseFloat(seo) / 100,
      parseFloat(fnr) / 3,
      parseFloat(ins) / 3,
      parseFloat(po) / 7
    ];
  } else {
    scores = [
      parseFloat(perf) / 100,
      parseFloat(a11y) / 100,
      parseFloat(bp) / 100,
      parseFloat(seo) / 100,
      safeFractionEval(fnr),
      safeFractionEval(ins),
      safeFractionEval(po)
    ];
  }

  const result = mean(scores);
  return asPercentage ? `${Math.round(result * 10000) / 100}%` : result;
};

export default avg;
