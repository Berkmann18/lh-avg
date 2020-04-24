import split from './split';

const mean = (nums: number[]): number => nums.reduce((acc, val) => acc + val, 0) / nums.length;

const perc = (num: number): string => `${Math.round(num * 10000) / 100}%`;

const safeFractionEval = (fraction: string): number => {
  // return fraction.split('/').map(parseFloat).reduce((acc, val) => acc / val);
  const [num, denum] = fraction.split('/');
  return parseInt(num) / parseInt(denum);
};

type NumLike = number | string;

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
}

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

export default avg;
