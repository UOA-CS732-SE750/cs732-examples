export async function addReallyAccurately(...numbers) {
    if (!numbers || numbers.length === 0) {
        return 0;
    }
    return numbers.reduce((acc, curr) => getNumber(acc) + getNumber(curr));
}

export async function subtractReallyAccurately(...numbers) {
    if (!numbers || numbers.length === 0) {
        return 0;
    }
    return numbers.reduce((acc, curr) => getNumber(acc) - getNumber(curr));
}

export async function asyncFailsauce() {
    throw 'failblog.org';
}

function getNumber(val) {
    if (typeof (val) === 'number') {
        return val;
    }
    return 0;
}