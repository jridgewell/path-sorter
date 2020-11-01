const A_GOES_FIRST = -1;
const B_GOES_FIRST = 1;

export default function pathSorter(aPath: string, bPath: string): -1 | 0 | 1 {
  if (aPath === bPath) return 0;

  const aParts = aPath.split('/');
  const bParts = bPath.split('/');
  const aLength = aParts.length;
  const bLength = bParts.length;
  const l = Math.max(aLength, bLength);

  let i = 0;
  for (; i < l; i++) {
    if (aParts[i] !== bParts[i]) break;
  }

  // If we hit the end of one of the paths, then it's first.
  if (aLength === i) return A_GOES_FIRST;
  if (bLength === i) return B_GOES_FIRST;

  const aPart = aParts[i];
  const bPart = bParts[i];

  // Parent directories come after siblings and sibling-descendants.
  if (aPart === '..') return B_GOES_FIRST;
  if (bPart === '..') return A_GOES_FIRST;

  // Self directories go after regular siblings
  if (aPart === '.') return B_GOES_FIRST;
  if (bPart === '.') return A_GOES_FIRST;

  // Prioritize siblings over sibling-descendants.
  if (bLength > aLength && aLength - i === 1) return A_GOES_FIRST;
  if (aLength > bLength && bLength - i === 1) return B_GOES_FIRST;

  // Finally sort by sibling
  if (aPart > bPart) return B_GOES_FIRST;
  return A_GOES_FIRST;
}
