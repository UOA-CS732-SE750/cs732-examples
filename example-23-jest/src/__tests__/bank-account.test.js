import BankAccount from '../bank-account';

let account;

// Before each of the below unit tests, re-initialize the bank account.
beforeEach(() => {
    account = new BankAccount(10000);
})

// After each of the below unit tests, log a message to the console (if this is uncommented).
// afterEach(() => {
//     console.log('A test was completed.');
// });

it('has the correct initial balance', () => {
    expectAmount(10000, 100, 0, '$100.00');
});

it('depositing 250 cents works', () => {
    account.deposit(250);
    expectAmount(10250, 102, 50, '$102.50');
});

it('depositing $12.00 works', () => {
    account.deposit({ dollars: 12 });
    expectAmount(11200, 112, 0, '$112.00');
})

it('depositing $11.56 works', () => {
    account.deposit({ dollars: 11, cents: 56 });
    expectAmount(11156, 111, 56, '$111.56');
});

// The next two are different ways of testing error throwing - which one is preferable depends on if you need to check the state
// of something after catching the error

it('depositing not-a-number throws an error', () => {
    expect(() => account.deposit('Hello')).toThrow('amount is not an object or a number');
});

it('depositing not-a-number throws an error and doesn\'t change balance', () => {
    try {
        account.deposit('Hello');
        fail('Depositing a string should not succeed');
    }
    catch (err) {
        expect(err).toBe('amount is not an object or a number');
        expectAmount(10000, 100, 0, '$100.00');
    }
})

// TODO Test additional deposits (missing dollars and cents? dollars and cents not numbers? negative amounts? fractional cents?)

// TODO Add some withdrawal tests

function expectAmount(totalCents, eDollars, eCents, text, acc = account) {
    expect(acc.getBalanceInCents()).toBe(totalCents);
    expect(acc.toString()).toBe(text);
    const { dollars, cents } = acc.getBalanceInDollarsAndCents();
    expect(dollars).toBe(eDollars);
    expect(cents).toBe(eCents);
}