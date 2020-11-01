# @jridgewell/path-sorter

> Sort paths, giving precedence to sibling, descendant, then parent directories

## Installation

```sh
npm install @jridgewell/path-sorter
```

## Usage

```js
import pathSorter from '@jridgewell/path-sorter';

const paths = [
  '../foo/baz',
  '../bar/baz',
  '../foo',
  '../bar',
  './foo/baz',
  './bar/baz',
  './foo',
  './bar',
  'foo',
  'bar',
];

const sorted = paths.sort(pathSorter);
assert.deepEqual(sorted, [
  // Non-relative paths are prioritized first
  'bar',
  'foo',

  // relative siblings paths are next, giving precedence
  // _this_ directory, then 1-deep, then 2-deep, etc.
  './bar',
  './foo',
  './bar/baz',
  './foo/baz',

  // parent directories are last,
  '../bar',
  '../foo',
  '../bar/baz',
  '../foo/baz',
]);
```
