/**
 * This class represents a bank account which stores its balance as a whole number of cents.
 * 
 * It contains methods to deposit, withdraw, and query balance. All three operations can work with whole numbers representing a number
 * of cents, or objects of the shape { dollars: X, cents: Y }, where X and Y are whole numbers.
 * 
 * @author Andrew Meads
 */
export default class BankAccount {

    constructor(initialBalance) {
        this.balance = 0;
        this.deposit(initialBalance);
    }

    deposit(amount) {
        const cents = toCents(amount);
        if (cents < 0) {
            throw 'cannot deposit a negative amount';
        }
        this.balance += cents;
    }

    withdraw(amount) {
        const cents = toCents(amount);
        if (cents < 0) {
            throw 'cannot withdraw a negative amount';
        }
        else if (this.balance - cents < 0) {
            throw 'cannot withdraw more than an account has';
        }
        this.balance -= cents;
    }

    getBalanceInDollarsAndCents() {
        const dollars = Math.floor(this.balance / 100);
        const cents = this.balance - (dollars * 100);
        return { dollars, cents }
    }

    getBalanceInCents() {
        return this.balance;
    }

    toString() {
        const { dollars, cents } = this.getBalanceInDollarsAndCents();
        return `$${dollars}.${cents.toString().padStart(2, '0')}`;
    }

}

/**
 * This function takes care of converting an amount into cents.
 * 
 * If the given amount is a number, that amount of cents is returned. If the given amount is an object of shape { dollars: X, cents: Y },
 * then the equivalent amount of cents is returned.
 * 
 * Error cases which are checked include if number (or X or Y) are negative, non-numbers, or are fractional. Any of these cases results in
 * this function throwing an exception.
 */
function toCents(amount) {
    let result = 0;
    if (typeof (amount) === 'number') {
        result = amount;
    }
    else if (typeof (amount) === 'object') {
        const dollars = amount.dollars;
        const cents = amount.cents;
        if (isNumberOrUndefined(dollars)) {
            result += dollars ? dollars * 100 : 0;
        }
        else {
            throw 'if dollars exists, it must be a number';
        }
        if (isNumberOrUndefined(cents)) {
            result += cents ? cents : 0;
        }
        else {
            throw 'if cents exists, it must be a number';
        }
    }
    else {
        throw 'amount is not an object or a number';
    }

    if (Math.floor(result) !== result) {
        throw 'amount of cents must be a whole number';
    }
    return result;
}

function isNumberOrUndefined(val) {
    return typeof (val) === 'undefined' || typeof (val) === 'number';
}