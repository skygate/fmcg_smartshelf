export const findElementsWithCondition = (source, condition) =>
  Object.values(source).find(({ isCritical }) => isCritical === condition);
