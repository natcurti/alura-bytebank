export class Storage {
    constructor() { }
    static saveData(key, value) {
        const valueToString = JSON.stringify(value);
        localStorage.setItem(key, valueToString);
    }
    static getData(key, receive) {
        const valueFromLocalStorage = localStorage.getItem(key);
        if (valueFromLocalStorage === null) {
            return null;
        }
        if (receive) {
            return JSON.parse(valueFromLocalStorage, receive);
        }
        return JSON.parse(valueFromLocalStorage);
    }
}
