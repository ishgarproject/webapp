export function mergeArrays<T, Y>(arr1: T[], arr2: Y[]) {
  return arr1.map((element, index) => {
    return {
      ...element,
      ...arr2[index],
    };
  });
}
