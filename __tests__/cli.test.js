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

  // it('can show diff data', async () => {
  //   const response = await cliProcess.execute([...TWO_INPUTS, '-d']);
  //   expect(response).toEqual(DEFAULT.diff);
  // });

  // TODO -n
});

describe('Double flags', () => {
  it('can show split % data', async () => {
    const response = await cliProcess.execute([INPUT, '-sp']);
    expect(response).toEqual(DEFAULT.splitPerc);
  });

  // it('can show split named data', async () => {
  //   const response = await cliProcess.execute([INPUT, '-sn', 'a']);
  //   expect(response).toEqual(DEFAULT.splitNamed);
  // });

  // it('can show split diff data', async () => {
  //   const response = await cliProcess.execute([INPUT, '-sd']);
  //   expect(response).toEqual(DEFAULT.splitDiff);
  // });
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

  it('can show diff data', async () => {
    const response = await cliProcess.execute([...TWO_INPUTS, '-df', 'csv']);
    expect(response).toEqual(CSV.diff);
  });

  it('can show named data', async () => {
    const response = await cliProcess.execute([INPUT, '-n', 'a', '-f', 'csv']);
    expect(response).toEqual(CSV.named);
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
  // it('can show diff data', async () => {
  //   const response = await cliProcess.execute([...TWO_INPUTS, '-df', 'json']);
  //   expect(response).toEqual(JSON.diff);
  // });

  it('can show named data', async () => {
    const response = await cliProcess.execute([INPUT, '-n', 'a', '-f', 'json']);
    expect(response).toEqual(JSON.named);
  });
});

// TODO MD ...

// TODO HTML ...

// TODO -psd

// Errors
test('Error', async () => {
  try {
    await cliProcess.execute(['0/0/0/0']);
  } catch (err) {
    expect(/Error: (.*?)\n/g.exec(err)[1]).toEqual('Invalid expression!');
  }
});
