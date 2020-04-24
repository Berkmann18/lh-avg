interface LhReGroup {
  perf: string;
  a11y: string;
  bp: string;
  seo: string;
  fnr: string;
  ins: string;
  po: string;
}

// Fun fact: Uncommenting this 2 REs and using them in avg() will lead to some occasional failures in the same tests
// const SHORT_RE = /(?<perf>\d+)\s*\/\s*(?<a11y>\d+)\s*\/\s*(?<bp>\d+)\s*\/\s*(?<seo>\d+)\s*\/\s*\((?<fnr>\d+)(,|\/)\s*(?<ins>\d+)(,|\/)\s*(?<po>\d+)\)/g;
// const LONG_RE = /(?<perf>\d+)\s*\/\s*(?<a11y>\d+)\s*\/\s*(?<bp>\d+)\s*\/\s*(?<seo>\d+)\s*\/\s*\((?<fnr>\d+\/\d+)(,|\/)\s*(?<ins>\d+\/\d+)(,|\/)\s*(?<po>\d+\/\d+)\)/g;

const split = (scoreStr: string): {output: LhReGroup; shorthandForm: boolean} => {
  /* eslint-disable security/detect-unsafe-regex */
  const exp = /(?<perf>\d+)\s*\/\s*(?<a11y>\d+)\s*\/\s*(?<bp>\d+)\s*\/\s*(?<seo>\d+)\s*\/\s*\((?<fnr>\d+)(,|\/)\s*(?<ins>\d+)(,|\/)\s*(?<po>\d+)\)/g.exec(
    scoreStr
  );
  const longExp = /(?<perf>\d+)\s*\/\s*(?<a11y>\d+)\s*\/\s*(?<bp>\d+)\s*\/\s*(?<seo>\d+)\s*\/\s*\((?<fnr>\d+\/\d+)(,|\/)\s*(?<ins>\d+\/\d+)(,|\/)\s*(?<po>\d+\/\d+)\)/g.exec(
    scoreStr
  );

  if (exp === null) {
    if (longExp === null) {
      throw new Error('Invalid expression!');
    }
    return {
      output: (longExp.groups as unknown) as LhReGroup,
      shorthandForm: false
    };
  }

  return {
    output: (exp.groups as unknown) as LhReGroup,
    shorthandForm: true
  }
};

export default split;
