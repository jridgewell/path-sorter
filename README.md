# @jridgewell/path-sorter

> Sort paths, giving precedence to sibling, descendant, then parent directories

TODO

## Installation

```sh
npm install @jridgewell/path-sorter
```

## Usage

```js
import pathSorter from '@jridgewell/path-sorter';

const paths = [
  '../foo',
];

paths.sort(pathSorter);
```
