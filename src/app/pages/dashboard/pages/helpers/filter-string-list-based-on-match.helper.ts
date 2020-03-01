export function filterStringListBasedOnMatch(list: string[], match) {
  return (list || []).filter(
    (stringItem: string) => stringItem.indexOf(match) !== -1
  );
}
