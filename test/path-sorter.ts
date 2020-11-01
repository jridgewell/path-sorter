import pathSorter from '../src/path-sorter';
import { cases } from './cases';

describe('pathSorter', () => {
  type TestCase = [string, string, number, string];
  function invertTestCase(table: TestCase[], test: TestCase): TestCase[] {
    table.push(test);
    const [a, b, expected, desc] = test;
    if (expected !== 0) {
      table.push([b, a, -expected, desc]);
    }
    return table;
  }
  function isUniqueTestCase(
    test: TestCase,
    index: number,
    tests: TestCase[],
  ): boolean {
    for (let i = 0; i < index; i++) {
      const other = tests[i];
      if (test[0] === other[0] && test[1] === other[1]) return false;
    }
    return true;
  }

  const table = cases.reduce(invertTestCase, []).filter(isUniqueTestCase);

  it.each(table)(
    'sort("%s", "%s") == %i: %s',
    (a: string, b: string, expected: number, desc: string) => {
      try {
        expect(pathSorter(a, b)).toBe(expected);
      } catch (e) {
        e.message = `${desc}: ${e.message}`;
      }
    },
  );
});
