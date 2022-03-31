import { LocalStorageItem } from "./types";

export function getLocalStorageItem(item: LocalStorageItem) {
  return window.localStorage.getItem(item);
}

export function setLocalStorageItem(item: LocalStorageItem, value: string) {
  window.localStorage.setItem(item, value);
}

export function removeLocalStorageItem(item: LocalStorageItem) {
  window.localStorage.removeItem(item);
}
