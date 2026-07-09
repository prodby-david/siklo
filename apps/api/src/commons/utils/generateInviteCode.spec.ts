import generateInviteCode from './generateInviteCode';

describe('generateInviteCode', () => {
  it('should generate a 12-character uppercase hex code', () => {
    const code = generateInviteCode();
    expect(code).toHaveLength(12);
  });

  it('should generate different codes on different calls', () => {
    const code1 = generateInviteCode();
    const code2 = generateInviteCode();
    expect(code1).not.toBe(code2);
  });
});
