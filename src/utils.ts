import { LocalStorageValue } from './types';

export const getItem = (key: LocalStorageValue): string | null => {
    return localStorage.getItem(key);
};
export const setItem = (key: LocalStorageValue, JSONStringified: string) => {
    localStorage.setItem(key, JSONStringified);
};
