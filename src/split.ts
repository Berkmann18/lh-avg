const split = (scoreStr: string): { output: LhReGroup; shorthandForm: boolean } => {
  /* eslint-disable security/detect-unsafe-regex */
  const exp = /(?<perf>\d+)\s*\/\s*(?<a11y>\d+)\s*\/\s*(?<bp>\d+)\s*\/\s*(?<seo>\d+)\s*\/\s*\((?<fnr>\d+)(,|\/)\s*(?<ins>\d+)(,|\/)\s*(?<po>\d+)\)/g.exec(
    scoreStr
  );
  const longExp = /(?<perf>\d+)\s*\/\s*(?<a11y>\d+)\s*\/\s*(?<bp>\d+)\s*\/\s*(?<seo>\d+)\s*\/\s*\((?<fnr>\d+\/\d+)(,|\/)\s*(?<ins>\d+\/\d+)(,|\/)\s*(?<po>\d+\/\d+)\)/g.exec(
    scoreStr
  );

  const shorthandForm = exp !== null;
  const group = shorthandForm ? exp : longExp;
  if (group === null) throw new Error('Invalid expression!');
  const output = (group.groups as unknown) as LhReGroup;

  return {
    output,
    shorthandForm
  };
};

export default split;
