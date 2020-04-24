const mean = (nums: number[]): number => nums.reduce((acc, val) => acc + val, 0) / nums.length;

const avg = (scoreStr: string): number => {
  // const SHORT_RE = /(?<metrics>\d+\s*\/\s*\d+\s*\/\s*\d+\s*\/\s*\d+)\s*\/\s*\((?<fnr>\d+)(,|\/)\s*(?<ins>\d+)(,|\/)\s*(?<po>\d+)\)/g;
  const SPLIT_RE = /\s*\/\s*/;
  const _p = (n: string): string => {
    const a = n.split(SPLIT_RE);
    return `${a[0]}/${a[1]}`;
  };

  const scores = scoreStr
    .replace(
      /(\d+)\s*\/\s*(\d+)\s*\/\s*(\d+)\s*\/\s*(\d+)\s*\/\s*\((\d+\/\d+), (\d+\/\d+), (\d+\/\d+)\)/g,
      (_, perf, a11y, bp, seo, fastNReliable, installable, pwaOptimised) => {
        const mt = [perf, a11y, bp, seo].map((x) => parseInt(x) / 100).join('/');
        const fnr = _p(fastNReliable);
        const ins = _p(installable);
        const po = _p(pwaOptimised);
        return `${mt}/${eval(fnr)}/${eval(ins)}/${eval(po)}`;
      }
    )
    .split('/')
    .map((x) => parseFloat(x));
  return mean(scores);
};

export default avg;
