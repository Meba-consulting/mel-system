export function removeInterventionFromList(
  interventionList: any[],
  intervention: any
) {
  if (!intervention) {
    return interventionList;
  }
  const availablePeriodIndex = (interventionList || []).indexOf(
    (interventionList || []).find(
      interventionItem => interventionItem.id === intervention.id
    )
  );

  return availablePeriodIndex !== -1
    ? [
        ...interventionList.slice(0, availablePeriodIndex),
        ...interventionList.slice(availablePeriodIndex + 1)
      ]
    : interventionList;
}
