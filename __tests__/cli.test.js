const path = require('path');
const cmd = require('./cmd');
const { INPUT, TWO_INPUTS, JSON, CSV, MD, HTML, DEFAULT } = require('./fixtures');

const cliPath = path.join(__dirname, '../cli.js');
const cliProcess = cmd.create(cliPath, '.');

describe('Singular flag', () => {
  it('should default to text', async () => {
    const response = await cliProcess.execute([INPUT]);
    expect(response).toEqual(DEFAULT.normal);
  });

  it('can show percentages', async () => {
    const response = await cliProcess.execute([INPUT, '-p']);
    expect(response).toEqual(DEFAULT.perc);
  });

  it('can print in JSON', async () => {
    const response = await cliProcess.execute([INPUT, '-f', 'json']);
    expect(response).toEqual(JSON.normal);
  });

  it('can print in CSV', async () => {
    const response = await cliProcess.execute([INPUT, '-f', 'csv']);
    expect(response).toEqual(CSV.normal);
  });

  it('can print in MD', async () => {
    const response = await cliProcess.execute([INPUT, '-f', 'md']);
    expect(response).toEqual(MD.normal);
  });

  it('can print in HTML', async () => {
    const response = await cliProcess.execute([INPUT, '-f', 'html']);
    expect(response).toEqual(HTML.normal);
  });

  it('can show split data', async () => {
    const response = await cliProcess.execute([INPUT, '-s']);
    expect(response).toEqual(DEFAULT.split);
  });

  it('can show diff data', async () => {
    const response = await cliProcess.execute([...TWO_INPUTS, '-d']);
    expect(response).toEqual(DEFAULT.diff);
  });

  it('can show named data', async () => {
    const response = await cliProcess.execute([INPUT, '-n', 'a']);
    expect(response).toEqual(DEFAULT.named);
  });
});

describe('Text', () => {
  it('can show split % data', async () => {
    const response = await cliProcess.execute([INPUT, '-sp']);
    expect(response).toEqual(DEFAULT.splitPerc);
  });

  it('can show split named data', async () => {
    const response = await cliProcess.execute([INPUT, '-sn', 'a']);
    expect(response).toEqual(DEFAULT.splitNamed);
  });

  it('can show split diff data', async () => {
    const response = await cliProcess.execute([...TWO_INPUTS, '-sd']);
    expect(response).toEqual(DEFAULT.splitDiff);
  });

  it('can show split diff % data', async () => {
    const response = await cliProcess.execute([...TWO_INPUTS, '-psd']);
    expect(response).toEqual(DEFAULT.splitDiffPerc);
  });
});

describe('CSV', () => {
  it('can show percentages', async () => {
    const response = await cliProcess.execute([INPUT, '-pf', 'csv']);
    expect(response).toEqual(CSV.perc);
  });

  it('can show split data', async () => {
    const response = await cliProcess.execute([INPUT, '-sf', 'csv']);
    expect(response).toEqual(CSV.split);
  });

  it('can show split % data', async () => {
    const response = await cliProcess.execute([INPUT, '-spf', 'csv']);
    expect(response).toEqual(CSV.splitPerc);
  });

  it('can show diff data', async () => {
    const response = await cliProcess.execute([...TWO_INPUTS, '-df', 'csv']);
    expect(response).toEqual(CSV.diff);
  });

  it('can show split diff data', async () => {
    const response = await cliProcess.execute([...TWO_INPUTS, '-sdf', 'csv']);
    expect(response).toEqual(CSV.splitDiff);
  });

  it('can show named data', async () => {
    const response = await cliProcess.execute([INPUT, '-n', 'a', '-f', 'csv']);
    expect(response).toEqual(CSV.named);
  });

  it('can show split named data', async () => {
    const response = await cliProcess.execute([INPUT, '-sf', 'csv', '-n', 'a']);
    expect(response).toEqual(CSV.splitNamed);
  });

  it('can show split diff % data', async () => {
    const response = await cliProcess.execute([...TWO_INPUTS, '-psdf', 'csv']);
    expect(response).toEqual(CSV.splitDiffPerc);
  });
});

describe('JSON', () => {
  it('can show percentages', async () => {
    const response = await cliProcess.execute([INPUT, '-pf', 'json']);
    expect(response).toEqual(JSON.perc);
  });

  it('can show split data', async () => {
    const response = await cliProcess.execute([INPUT, '-sf', 'json']);
    expect(response).toEqual(JSON.normal);
  });

  it('can show split % data', async () => {
    const response = await cliProcess.execute([INPUT, '-spf', 'json']);
    expect(response).toEqual(JSON.perc);
  });

  it('can show diff data', async () => {
    const response = await cliProcess.execute([...TWO_INPUTS, '-df', 'json']);
    expect(response).toEqual(JSON.diff);
  });

  it('can show split diff data', async () => {
    const response = await cliProcess.execute([...TWO_INPUTS, '-sdf', 'json']);
    expect(response).toEqual(JSON.diff);
  });

  it('can show named data', async () => {
    const response = await cliProcess.execute([INPUT, '-n', 'a', '-f', 'json']);
    expect(response).toEqual(JSON.named);
  });

  it('can show split named data', async () => {
    const response = await cliProcess.execute([INPUT, '-sn', 'a', '-f', 'json']);
    expect(response).toEqual(JSON.named);
  });

  it('can show split diff % data', async () => {
    const response = await cliProcess.execute([...TWO_INPUTS, '-psdf', 'json']);
    expect(response).toEqual(JSON.diffPerc);
  });
});

describe('MD', () => {
  it('can show percentages', async () => {
    const response = await cliProcess.execute([INPUT, '-pf', 'md']);
    expect(response).toEqual(MD.perc);
  });

  it('can show split data', async () => {
    const response = await cliProcess.execute([INPUT, '-sf', 'md']);
    expect(response).toEqual(MD.split);
  });

  it('can show split % data', async () => {
    const response = await cliProcess.execute([INPUT, '-spf', 'md']);
    expect(response).toEqual(MD.splitPerc);
  });

  it('can show diff data', async () => {
    const response = await cliProcess.execute([...TWO_INPUTS, '-df', 'md']);
    expect(response).toEqual(MD.diff);
  });

  it('can show split diff data', async () => {
    const response = await cliProcess.execute([...TWO_INPUTS, '-sdf', 'md']);
    expect(response).toEqual(MD.splitDiff);
  });

  it('can show named data', async () => {
    const response = await cliProcess.execute([INPUT, '-n', 'a', '-f', 'md']);
    expect(response).toEqual(MD.named);
  });

  it('can show split named data', async () => {
    const response = await cliProcess.execute([INPUT, '-sn', 'a', '-f', 'md']);
    expect(response).toEqual(MD.splitNamed);
  });

  it('can show split diff % data', async () => {
    const response = await cliProcess.execute([...TWO_INPUTS, '-psdf', 'md']);
    expect(response).toEqual(MD.splitDiffPerc);
  });
});

describe('HTML', () => {
  it('can show percentages', async () => {
    const response = await cliProcess.execute([INPUT, '-pf', 'html']);
    expect(response).toEqual(HTML.perc);
  });

  it('can show split data', async () => {
    const response = await cliProcess.execute([INPUT, '-sf', 'html']);
    expect(response).toEqual(HTML.split);
  });

  it('can show split % data', async () => {
    const response = await cliProcess.execute([INPUT, '-spf', 'html']);
    expect(response).toEqual(HTML.splitPerc);
  });

  it('can show diff data', async () => {
    const response = await cliProcess.execute([...TWO_INPUTS, '-df', 'html']);
    expect(response).toEqual(HTML.diff);
  });

  it('can show split diff data', async () => {
    const response = await cliProcess.execute([...TWO_INPUTS, '-sdf', 'html']);
    expect(response).toEqual(HTML.splitDiff);
  });

  it('can show named data', async () => {
    const response = await cliProcess.execute([INPUT, '-n', 'a', '-f', 'html']);
    expect(response).toEqual(HTML.named);
  });

  it('can show split named data', async () => {
    const response = await cliProcess.execute([INPUT, '-sn', 'a', '-f', 'html']);
    expect(response).toEqual(HTML.splitNamed);
  });

  it('can show split diff % data', async () => {
    const response = await cliProcess.execute([...TWO_INPUTS, '-psdf', 'html']);
    expect(response).toEqual(HTML.splitDiffPerc);
  });
});

// Errors
test('Error', async () => {
  try {
    await cliProcess.execute(['0/0/0/0']);
  } catch (err) {
    expect(/Error: (.*?)\n/g.exec(err)[1]).toEqual('Invalid expression!');
  }
});
