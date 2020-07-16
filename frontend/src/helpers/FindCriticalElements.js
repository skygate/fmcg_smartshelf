export const findCriticalElements = (source, condition) =>
  Object.values(source).find(({ isCritical }) => isCritical === condition);
