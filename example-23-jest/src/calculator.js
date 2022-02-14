export function sum(...numbers) {
    if (!numbers || numbers.length === 0) {
        return 0;
    }
    return numbers.reduce((acc, curr) => getNumber(acc) + getNumber(curr));
}

export function difference(...numbers) {
    if (!numbers || numbers.length === 0) {
        return 0;
    }
    return numbers.reduce((acc, curr) => getNumber(acc) - getNumber(curr));
}

function getNumber(val) {
    if (typeof (val) === 'number') {
        return val;
    }
    return 0;
}