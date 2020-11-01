const A_GOES_FIRST = -1;
const B_GOES_FIRST = 1;

export default function pathSorter(aPath: string, bPath: string): -1 | 0 | 1 {
  const aParts = aPath.split('/');
  const bParts = bPath.split('/');

  const l = Math.max(aParts.length, bParts.length);
  let i = 0;
  for (; i < l; i++) {
    if (aParts[i] !== bParts[i]) break;
  }

  // If we hit the end of one of the paths, then it's first.
  if (aParts.length === i) return A_GOES_FIRST;
  if (bParts.length === i) return B_GOES_FIRST;

  // Parent directories come after siblings and sibling-descendants.
  if (aParts[i] === '..') return B_GOES_FIRST;
  if (bParts[i] === '..') return A_GOES_FIRST;

  // This is really to ensure that external imports will be before a `./**`.
  if (aParts[i] === '.') return B_GOES_FIRST;
  if (bParts[i] === '.') return A_GOES_FIRST;

  // Prioritize siblings over sibling-descendants.
  if (aParts.length - i === 1 && bParts.length > aParts.length) {
    return A_GOES_FIRST;
  }
  if (bParts.length - i === 1 && aParts.length > bParts.length) {
    return B_GOES_FIRST;
  }

  // Finally sort by sibling
  if (aParts[i] > bParts[i]) return B_GOES_FIRST;
  if (bParts[i] > aParts[i]) return A_GOES_FIRST;

  return 0;
}
