export const findCriticalElements = (source, condition) =>
  Object.values(source).find(({ is_critical }) => is_critical === condition);
