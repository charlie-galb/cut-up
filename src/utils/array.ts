import { arrayMove as dndKitArrayMove } from "@dnd-kit/sortable";

export const removeAtIndex = (array: string[], index: number) => {
  return [...array.slice(0, index), ...array.slice(index + 1)];
};

export const insertAtIndex = (array: string[], index: number, item: string) => {
  return [...array.slice(0, index), item, ...array.slice(index)];
};

export const arrayMove = (array: string[], oldIndex: number, newIndex: number) => {
  return dndKitArrayMove(array, oldIndex, newIndex);
};

export const shuffle = (array: string[]) => {
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m]
    array[m] = array[i]
    array[i] = t
  }
  return array
}