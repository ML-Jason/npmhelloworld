const { expect } = require('chai');
const { vcheck } = require('../src');

describe('vcheck.str()', () => {
  it('error should return empty', () => {
    expect(vcheck.str()).to.be.equal('');
  });
  it('trim', () => {
    expect(vcheck.str(' ab cd ')).to.be.equal('ab cd');
  });
});

describe('vcheck.alphanumeric()', () => {
  it('error should return empty', () => {
    expect(vcheck.alphanumeric('123Abc-')).to.be.equal('');
  });
  it('Only alphanumeric allowed', () => {
    expect(vcheck.alphanumeric('123Abc')).to.be.equal('123Abc');
  });
});

describe('vcheck.normalStr()', () => {
  it('error should return empty', () => {
    expect(vcheck.normalStr('123Abc-.@_=')).to.be.equal('');
  });
  it('Only ([^a-zA-Z0-9_@.-]) allowed', () => {
    expect(vcheck.normalStr('123Abc-.@_')).to.be.equal('123Abc-.@_');
  });
});

describe('vcheck.number()', () => {
  it('error should return NaN', () => {
    expect(vcheck.number('123Abc^')).to.be.NaN;
  });
  it('error should pass !NaN', (done) => {
    if (vcheck.number('123Abc')) {
      expect.fail('no !');
      return;
    }
    done();
  });
  it('Only number allowed', () => {
    expect(vcheck.number('123')).to.be.equal(123);
  });
});

describe('vcheck.email()', () => {
  it('error should return empty', () => {
    expect(vcheck.email('123@com')).to.be.empty;
  });
  it('Only email allowed', () => {
    expect(vcheck.email('abc123@aaa.com')).to.be.equal('abc123@aaa.com');
  });
});

describe('vcheck.mongoID()', () => {
  it('error should return empty', () => {
    expect(vcheck.mongoID('123abc')).to.be.empty;
  });
  it('Only mongoID allowed', () => {
    expect(vcheck.mongoID('5c46d6881d8382364423bee2')).to.be.equal('5c46d6881d8382364423bee2');
  });
});

describe('vcheck.url()', () => {
  it('error should return empty', () => {
    expect(vcheck.url('123abc')).to.be.empty;
  });
  it('wrong protocol should return empty', () => {
    expect(vcheck.url('ftp://www.123abc')).to.be.empty;
  });
  it('Only url allowed', () => {
    expect(vcheck.url('www.abc.com')).to.be.equal('www.abc.com');
  });
  it('* can be allowed', () => {
    expect(vcheck.url('http://*.123abc.com')).to.be.equal('http://*.123abc.com');
  });
  it('* can be allowed and protocol can be ignored', () => {
    expect(vcheck.url('*.123abc.com')).to.be.equal('*.123abc.com');
  });
  it('* should be the sub-domain only', () => {
    expect(vcheck.url('www.123abc.*.com')).to.be.empty;
  });
  it('only one * allowed', () => {
    expect(vcheck.url('*.123abc.*.com')).to.be.empty;
  });
  it('* should before .', () => {
    expect(vcheck.url('www.*123abc.com')).to.be.empty;
  });
  it('not right * should return empty', () => {
    expect(vcheck.url('http:*.//www.123abc.com')).to.be.empty;
  });
});

describe('vcheck.boolean()', () => {
  it('if not 1 or "1" or true, should return false', () => {
    expect(vcheck.boolean('123abc')).to.be.false;
  });
  it('undefined should return false', () => {
    expect(vcheck.boolean()).to.be.false;
  });
  it('1 should be true', () => {
    expect(vcheck.boolean(1)).to.be.true;
  });
  it('"1" should be true', () => {
    expect(vcheck.boolean('1')).to.be.true;
  });
  it('true should be true', () => {
    expect(vcheck.boolean(true)).to.be.true;
  });
});

describe('vcheck.luxon()', () => {
  it('JSDate should be a DateTime', () => {
    expect(vcheck.luxon(new Date())).to.have.property('isValid', true);
  });
  it('Valid Object should be a DateTime', () => {
    expect(vcheck.luxon({ year: 2017, month: 5, day: 25 })).to.have.property('isValid', true);
  });
  it('ISO String should be a DateTime', () => {
    expect(vcheck.luxon('2019-01-24T16:58:30.622+08:00')).to.have.property('isValid', true);
  });
  it('fmt String should be a DateTime', () => {
    expect(vcheck.luxon('2019/01/24', 'yyyy/MM/dd')).to.have.property('isValid', true);
  });
  it('error should be invalid DateTime', () => {
    expect(vcheck.luxon('2019/01/24')).to.have.property('isValid', false);
  });
});

describe('vcheck.json()', () => {
  it('Object should be a json', () => {
    const obj = { a: 1, b: 2 };
    expect(vcheck.json(obj)).to.have.property('a', 1);
  });
  it('Array should be a json', () => {
    const obj = [1, 2];
    expect(vcheck.json(obj)).to.have.ordered.members([1, 2]);
  });
  it('valid string should be a Object', () => {
    const obj = JSON.stringify({ a: 1, b: 2 });
    expect(vcheck.json(obj)).to.have.property('b', 2);
  });
  it('invalid string should be null', () => {
    const obj = '{ "a": 1, "b": 2';
    expect(vcheck.json(obj)).to.be.null;
  });
  it('invalid parameter should be null', () => {
    expect(vcheck.json()).to.be.null;
  });
});

describe('vcheck.array()', () => {
  it('error should return null', () => {
    const obj = { a: 1, b: 2 };
    expect(vcheck.array(obj)).to.be.null;
  });
  it('Array should be a array', () => {
    const obj = [1, 2];
    expect(vcheck.array(obj)).to.have.ordered.members([1, 2]);
  });
  it('valid string should be a array', () => {
    const obj = JSON.stringify([1, 2]);
    expect(vcheck.array(obj)).to.have.ordered.members([1, 2]);
  });
});

describe('vcheck.escapeRegex()', () => {
  it('escapeRegExp', () => {
    const str = 'this\\(system) {is} [full].';
    const answer = new RegExp('this\\\\\\(system\\) \\{is\\} \\[full\\]\\.').toString();
    expect(`/${vcheck.escapeRegex(str)}/`).to.be.equal(answer);
  });
});

describe('vcheck.escape()', () => {
  it('replace <, >, &, \', " and / with HTML entities', () => {
    const str = '\'this\' "is" <a>';
    expect(vcheck.escape(str)).to.be.equal('&#x27;this&#x27; &quot;is&quot; &lt;a&gt;');
  });
});
