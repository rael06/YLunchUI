import { LocalStorageItem } from "./types";

export function getItem(item: LocalStorageItem) {
  return window.localStorage.getItem(item);
}

export function setItem(item: LocalStorageItem, value: string) {
  window.localStorage.setItem(item, value);
}
