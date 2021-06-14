import { chunk } from "../types/chunk"

export const removeAtIndex = (array: chunk[], index: number): chunk[] => {
  return [...array.slice(0, index), ...array.slice(index + 1)];
};

export const insertAtIndex = (array: chunk[], index: number, item: chunk): chunk[] => {
  return [...array.slice(0, index), item, ...array.slice(index)];
};

export const shuffle = (array: chunk[]): chunk[] => {
  let m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m]
    array[m] = array[i]
    array[i] = t
  }
  return array
}