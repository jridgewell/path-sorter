const { default: pathSorter } = require('..');

const tests = [
  {
    desc: 'non-relative',
    cases: ['abc', 'def', 'hgi'],
  },
  {
    desc: 'non-relative-implicit-descendant',
    cases: ['abc/', 'def/', 'hgi/'],
  },
  {
    desc: 'non-relative-descendant',
    cases: ['abc/child', 'def/child', 'hgi/child'],
  },
  {
    desc: 'self',
    cases: ['.'],
  },
  {
    desc: 'self-implicit-descendant',
    cases: ['./'],
  },
  {
    desc: 'sibling',
    cases: ['./abc', './def', './hgi'],
  },
  {
    desc: 'sibling-implicit-descendant',
    cases: ['./abc/', './def/', './hgi/'],
  },
  {
    desc: 'sibling-descendant',
    cases: ['./abc/child', './def/child', './hgi/child'],
  },
  {
    desc: 'parent',
    cases: ['..'],
  },
  {
    desc: 'parent-implicit-descendant',
    cases: ['../'],
  },
  {
    desc: 'parent-descendant',
    cases: ['../abc', '../def', '../hgi'],
  },
  {
    desc: 'parent-descendant-implicit-descendant',
    cases: ['../abc/', '../def/', '../hgi/'],
  },
  {
    desc: 'parent-descendant-descendant',
    cases: ['../abc/child', '../def/child', '../hgi/child'],
  },
  {
    desc: 'parent-parent',
    cases: ['../..'],
  },
  {
    desc: 'parent-parent-implicit-descendant',
    cases: ['../../'],
  },
  {
    desc: 'parent-parent-descendant',
    cases: ['../../abc', '../../def', '../../hgi'],
  },
  {
    desc: 'parent-parent-descendant-implicit-descendant',
    cases: ['../../abc/', '../../def/', '../../hgi/'],
  },
  {
    desc: 'parent-parent-descendant-descendant',
    cases: ['../../abc/child', '../../def/child', '../../hgi/child'],
  },
];

const table = [];
const [aLength, bLength] = tests.reduce(
  ([aLength, bLength], test) => {
    const lengths = test.cases.map((c) => c.length + 1);
    return [Math.max(aLength, lengths[0]), Math.max(bLength, ...lengths)];
  },
  [0, 0],
);

for (const { desc, cases } of tests) {
  table.push(`  // ${desc}\n`);
  const a = cases[0].replace(/abc($|\/$|\/child$)/, 'def$1');
  const aPad = ' '.repeat(aLength - a.length);

  for (const { desc: otherDesc, cases: otherCases } of tests) {
    for (const b of otherCases) {
      const bPad = ' '.repeat(bLength - b.length);
      const expected = pathSorter(a, b);
      const expectedPad = ' '.repeat(3 - String(expected).length);
      table.push(
        `  ['${a}',${aPad}'${b}',${bPad}${expectedPad}${expected}, '${desc} ${otherDesc}'],\n`,
      );
    }
  }

  table.push(`\n`);
}

console.log(`export const cases: [string, string, number, string][] = [`);
console.log(table.join(''));
console.log(`];`);
