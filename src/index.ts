const mean = (nums: number[]): number => nums.reduce((acc, val) => acc + val, 0) / nums.length;

// Fun fact: Uncommenting this 2 REs and using them in avg() will lead to some occasional failures in the same tests
// const SHORT_RE = /(?<perf>\d+)\s*\/\s*(?<a11y>\d+)\s*\/\s*(?<bp>\d+)\s*\/\s*(?<seo>\d+)\s*\/\s*\((?<fnr>\d+)(,|\/)\s*(?<ins>\d+)(,|\/)\s*(?<po>\d+)\)/g;
// const LONG_RE = /(?<perf>\d+)\s*\/\s*(?<a11y>\d+)\s*\/\s*(?<bp>\d+)\s*\/\s*(?<seo>\d+)\s*\/\s*\((?<fnr>\d+\/\d+)(,|\/)\s*(?<ins>\d+\/\d+)(,|\/)\s*(?<po>\d+\/\d+)\)/g;

// type ReGroup = { [key: string]: string } | undefined;
interface LhReGroup {
  perf: string;
  a11y: string;
  bp: string;
  seo: string;
  fnr: string;
  ins: string;
  po: string;
}

const safeFractionEval = (fraction: string): number => {
  // return fraction.split('/').map(parseFloat).reduce((acc, val) => acc / val);
  const [num, denum] = fraction.split('/');
  return parseInt(num) / parseInt(denum);
};

const avg = (scoreStr: string, asPercentage = false): number | string => {
  /* eslint-disable security/detect-unsafe-regex */
  const exp = /(?<perf>\d+)\s*\/\s*(?<a11y>\d+)\s*\/\s*(?<bp>\d+)\s*\/\s*(?<seo>\d+)\s*\/\s*\((?<fnr>\d+)(,|\/)\s*(?<ins>\d+)(,|\/)\s*(?<po>\d+)\)/g.exec(
    scoreStr
  );
  const longExp = /(?<perf>\d+)\s*\/\s*(?<a11y>\d+)\s*\/\s*(?<bp>\d+)\s*\/\s*(?<seo>\d+)\s*\/\s*\((?<fnr>\d+\/\d+)(,|\/)\s*(?<ins>\d+\/\d+)(,|\/)\s*(?<po>\d+\/\d+)\)/g.exec(
    scoreStr
  );
  // console.log('str=', scoreStr, '\n', SHORT_RE.test(scoreStr), LONG_RE.test(scoreStr));
  let scores: number[];

  if (exp === null) {
    if (longExp === null) {
      throw new Error('Invalid expression!');
    }
    const { perf, a11y, bp, seo, fnr, ins, po } = (longExp.groups as unknown) as LhReGroup;
    scores = [
      parseFloat(perf) / 100,
      parseFloat(a11y) / 100,
      parseFloat(bp) / 100,
      parseFloat(seo) / 100,
      safeFractionEval(fnr),
      safeFractionEval(ins),
      safeFractionEval(po)
    ];
  } else {
    const { perf, a11y, bp, seo, fnr, ins, po } = (exp.groups as unknown) as LhReGroup;
    scores = [
      parseFloat(perf) / 100,
      parseFloat(a11y) / 100,
      parseFloat(bp) / 100,
      parseFloat(seo) / 100,
      parseFloat(fnr) / 3,
      parseFloat(ins) / 3,
      parseFloat(po) / 7
    ];
  }

  const result = mean(scores);
  return asPercentage ? `${Math.round(result * 10000) / 100}%` : result;
};

export default avg;
