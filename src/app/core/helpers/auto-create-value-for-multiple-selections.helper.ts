export function sanitizeMultipleSelectionsOptions(
  data,
  programStateDataElements
) {
  const options = (programStateDataElements.filter(
    (stageDataElement) => stageDataElement?.dataElement?.id === data?.id
  ) || [])[0]?.dataElement?.optionSet?.options;
  let combinedOptionsCodes = [];
  data.value.forEach((val) => {
    combinedOptionsCodes = [
      ...combinedOptionsCodes,
      (options.filter((option) => option?.id === val) ||
        [])[0]?.code.toLowerCase(),
    ];
  });

  return (options.filter(
    (option) =>
      option?.code.toLowerCase() === combinedOptionsCodes.sort().join(',')
  ) || [])[0]?.id;
}
