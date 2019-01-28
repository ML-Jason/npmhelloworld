const { expect } = require('chai');
const { vutils } = require('../src');

describe('vutils.randomStr()', () => {
  it('default should only alphanumeric and length is 10', () => {
    const allowstr = '0123456789aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ';
    const reg = new RegExp(`[^${allowstr}]`);
    for (let i = 0; i < 10000; i += 1) {
      const rnd = vutils.randomStr();
      if (reg.test(rnd) || rnd.length !== 10) {
        expect.fail(`output is ${rnd}`);
        return;
      }
    }
  });
  it('length parameter should workds', () => {
    const targetLength = 20;
    for (let i = 0; i < 10000; i += 1) {
      const rnd = vutils.randomStr(targetLength);
      if (rnd.length !== targetLength) {
        expect.fail(`output is ${rnd}`);
        return;
      }
    }
  });
  it('added chars should appear', (done) => {
    const addChars = '#';
    const reg = new RegExp(`[${addChars}]`);
    for (let i = 0; i < 100000; i += 1) {
      const rnd = vutils.randomStr(10, addChars);
      if (reg.test(rnd)) {
        done();
        return;
      }
    }
    expect.fail('not appear');
  });
});

describe('vutils.newID()', () => {
  it('default should only alphanumeric and length is 15', () => {
    const allowstr = '0123456789aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ';
    const reg = new RegExp(`[^${allowstr}]`);
    for (let i = 0; i < 10000; i += 1) {
      const rnd = vutils.newID();
      if (reg.test(rnd) || rnd.length !== 15) {
        expect.fail(`output is ${rnd}`);
        return;
      }
    }
  });
  it('length parameter should workds', () => {
    const targetLength = 20;
    for (let i = 0; i < 10000; i += 1) {
      const rnd = vutils.newID(targetLength);
      if (rnd.length !== targetLength) {
        expect.fail(`output is ${rnd}`);
        return;
      }
    }
  });
  it('length must be >= 15', () => {
    const targetLength = 10;
    for (let i = 0; i < 10000; i += 1) {
      const rnd = vutils.newID(targetLength);
      if (rnd.length !== 15) {
        expect.fail(`output is ${rnd}`);
        return;
      }
    }
  });
});

describe('vutils.md5()', () => {
  it('md5 encode', () => {
    const str = 'this is password';
    expect(vutils.md5(str)).to.be.equal('8910e62fae2505e21f568632df8410a9');
  });
  it('empty string or undefined should return empty', () => {
    expect(vutils.md5()).to.be.empty;
  });
});

describe('vutils.replaceAll()', () => {
  it('"2" should be all replaced by "!"', () => {
    expect(vutils.replaceAll('123Abc-.@_=o2c', '2', '!')).to.be.equal('1!3Abc-.@_=o!c');
  });
});

describe('vutils.hashName()', () => {
  it('Name should be hashed and length is not changed', () => {
    const name = 'Jason Tseng';
    const outName = 'Jas○○○○○eng';
    expect(vutils.hashName(name)).to.be.equal(outName).and.to.have.property('length', name.length);
  });
  it('Replace char parameter should work', () => {
    const name = 'Jason Tseng';
    const outName = 'Jasxxxxxeng';
    expect(vutils.hashName(name, 'x')).to.be.equal(outName).and.to.have.property('length', name.length);
  });
  it('Empty string should return empty string', () => {
    expect(vutils.hashName()).to.be.empty;
  });
  it('length === 2 should work', () => {
    expect(vutils.hashName('12')).to.be.equal('1○');
  });
});

describe('vutils.hashEmail()', () => {
  it('Email should be hashed and length is not changed', () => {
    const name = 'jason@medialand.tw';
    const outName = 'jas○○@medi○○○○d.tw';
    expect(vutils.hashEmail(name)).to.be.equal(outName).and.to.have.property('length', name.length);
  });
  it('Replace char parameter should work', () => {
    const name = 'jason@medialand.tw';
    const outName = 'jasxx@medixxxxd.tw';
    expect(vutils.hashEmail(name, 'x')).to.be.equal(outName).and.to.have.property('length', name.length);
  });
  it('wrong email should return empty string', () => {
    expect(vutils.hashEmail('not a email')).to.be.empty;
  });
});

describe('vutils.clientIP()', () => {
  it('clientIP should be "127.0.0.1"', () => {
    const req = {
      headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36' },
      connection: { remoteAddress: '127.0.0.1' },
      socket: { remoteAddress: '127.0.0.1' },
    };
    expect(vutils.clientIP(req)).to.be.equal('127.0.0.1');
  });
});
describe('vutils.useragent()', () => {
  it('browser should be "Chrome" and platfrom should be "Microsoft Windows"', () => {
    const req = {
      headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36' },
      connection: { remoteAddress: '127.0.0.1' },
      socket: { remoteAddress: '127.0.0.1' },
    };
    expect(vutils.useragent(req))
      .to.have.property('browser', 'Chrome');
    expect(vutils.useragent(req))
      .to.have.property('platform', 'Microsoft Windows');
  });
  it('ip should be "127.0.0.1"', () => {
    const req = {
      headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36' },
      connection: { remoteAddress: '127.0.0.1' },
      socket: { remoteAddress: '127.0.0.1' },
    };
    expect(vutils.useragent(req))
      .to.have.property('ip', '127.0.0.1');
  });
});

describe('vutils.datesBetween()', () => {
  it('datesBetween should work', () => {
    const startDate = '2018-11-30';
    const endDate = '2018-12-03';
    const out = ['2018-11-30', '2018-12-01', '2018-12-02', '2018-12-03'];
    expect(vutils.datesBetween(startDate, endDate))
      .to.be.eql(out);
  });
  it('Wrong parameters should return empty array', () => {
    const out = [];
    expect(vutils.datesBetween())
      .to.be.eql(out);
  });
});
