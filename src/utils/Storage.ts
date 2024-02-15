export class Storage {
  private constructor() {}

  static saveData(key: string, value: any): void {
    const valueToString = JSON.stringify(value);
    localStorage.setItem(key, valueToString);
  }

  static getData<T>(
    key: string,
    receive?: (this: any, key: string, value: any) => any
  ): T | null {
    const valueFromLocalStorage = localStorage.getItem(key);

    if (valueFromLocalStorage === null) {
      return null;
    }

    if (receive) {
      return JSON.parse(valueFromLocalStorage, receive) as T;
    }

    return JSON.parse(valueFromLocalStorage) as T;
  }
}
