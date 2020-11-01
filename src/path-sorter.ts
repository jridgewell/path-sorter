const A_IS_BEFORE = -1;
const B_IS_BEFORE = 1;

export default function pathSorter(aPath: string, bPath: string): -1 | 0 | 1 {
  if (aPath === bPath) return 0;

  const aParts = aPath.split('/');
  const bParts = bPath.split('/');

  const l = Math.max(aParts.length, bParts.length);
  let i = 0;
  for (; i < l; i++) {
    if (aParts[i] !== bParts[i]) break;
  }

  if (aParts.length === i) return A_IS_BEFORE;
  if (bParts.length === i) return B_IS_BEFORE;

  // Parent directories come after siblings and sibling-descendants.
  if (aParts[i] === '..') return B_IS_BEFORE;
  if (bParts[i] === '..') return A_IS_BEFORE;

  // This is really to ensure that external imports will be before a `./**`.
  if (aParts[i] === '.') return B_IS_BEFORE;
  if (bParts[i] === '.') return A_IS_BEFORE;

  // Prioritize siblings over sibling-descendants.
  if (aParts.length - i === 1 && bParts.length > aParts.length)
    return A_IS_BEFORE;
  if (bParts.length - i === 1 && aParts.length > bParts.length)
    return B_IS_BEFORE;

  // Finally sort by sibling
  if (aParts[i] > bParts[i]) return B_IS_BEFORE;
  if (bParts[i] > aParts[i]) return A_IS_BEFORE;

  return 0;
}
