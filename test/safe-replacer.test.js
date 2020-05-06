import SafeReplacer from '../src/safe-replacer.js';

describe('SafeReplacer', () => {
  describe('constructor()', () => {
    test('The target string and encloser are duplicated.', () => {
      const srcStr = '<#<#<# #-#-#- Hello #-#-#- #>#>#>';
      expect(function() {
        const replacer = new SafeReplacer(srcStr);
        const result = replacer
          .replace(/Hello/g, 'Hi!')
          .build().getString();
      }).toThrowError('Replacement may not be possible');

    });
  });
  describe('replace()', () => {
    test('Set string as replacer(replacement value)', () => {

      const srcStr = 'His name is AAA.mm is a nice guy.';

      const replacer = new SafeReplacer(srcStr);
      const result = replacer
        .replace(/AAA/g, 'Tommy')
        .replace(/mm/g, 'Jack')
        .build().getString()
      expect(result).toBe('His name is Tommy.Jack is a nice guy.');
    });
    test('Set function as replacer', () => {

      const srcStr = 'His name is AAA.mm is a nice guy.';
      const replacer = new SafeReplacer(srcStr, {});
      const result = replacer
        .replace(/AAA/g, (m) => {
          return 'Tommy';
        })
        .replace(/mm/g, (m) => {
          return 'Jack';
        })
        .build().getString();
      expect(result).toBe('His name is Tommy.Jack is a nice guy.');
    });
    test('Set illegal type as replacer', () => {

      const srcStr = 'His name is AAA.mm is a nice guy.';

      expect(function() {
        const replacer = new SafeReplacer(srcStr, {});
        const result = replacer
          .replace(/AAA/g, 1)
          .replace(/mm/g, 1)
          .build().getString();
      }).toThrowError('Invalid replacer');

    });
    test('No replacer', () => {

      const srcStr = 'His name is AAA.mm is a nice guy.';
      const replacer = new SafeReplacer(srcStr, {});
      const result = replacer
        .replace(/AAA/g)
        .replace(/mm/g)
        .build().getString();
      expect(result).toBe(srcStr);
    });
    test('change replacement encloser', () => {

      const srcStr = 'His name is AAA.mm is a nice guy.';
      const replacer = new SafeReplacer(srcStr, {
        escaperPrefix: '\0\0',
        escaperSuffix: '\0\0',
        consumedDelimiter: '\0\0\0'
      });
      const result = replacer
        .replace(/AAA/g, 'Tommy')
        .replace(/mm/g, 'Jack')
        .build().getString();
      expect(result).toBe('His name is Tommy.Jack is a nice guy.');
    });

    test('Complex replacement', () => {

      const srcStr = 'AAA BBB CCC DDD';
      const replacer = new SafeReplacer(srcStr, {});
      const result = replacer
        .replace(/A{1,3}/g, 'BBB')
        .replace(/B{1,3}/g, 'CCC')
        .replace(/C{1,3}/g, 'DDD')
        .replace(/D{1,3}/g, 'EEE')
        .build().getString();
      expect(result).toBe('BBB CCC DDD EEE');

      const normalStringReplacement = srcStr
        .replace(/A{1,3}/g, 'BBB')
        .replace(/B{1,3}/g, 'CCC')
        .replace(/C{1,3}/g, 'DDD')
        .replace(/D{1,3}/g, 'EEE');
      expect(normalStringReplacement).toBe('EEE EEE EEE EEE');

    });
  });
});