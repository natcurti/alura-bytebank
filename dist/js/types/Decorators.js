export function ValidateDebit(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (valueToBeDebited) {
        if (valueToBeDebited <= 0) {
            throw new Error("O valor a ser debitado precisa ser maior do que zero!");
        }
        if (valueToBeDebited > this.balance) {
            throw new Error("Seu saldo é insuficiente para realizar a operação!");
        }
        return originalMethod.apply(this, [valueToBeDebited]);
    };
    return descriptor;
}
export function ValidateDeposit(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (valueToBeDeposited) {
        if (valueToBeDeposited <= 0) {
            throw new Error("O valor a ser depositado precisa ser maior do que zero!");
        }
        return originalMethod.apply(this, [valueToBeDeposited]);
    };
    return descriptor;
}
