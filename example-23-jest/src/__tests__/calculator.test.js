import { sum, difference } from '../calculator';

it('adds 1 + 2 = 3', () => {
    expect(sum(1, 2)).toBe(3);
})

it('adds 3 + 5 + 4 = 12', () => {
    expect(sum(3, 5, 4)).toBe(12);
})

it('adds nothing = 0', () => {
    expect(sum()).toBe(0);
})

it('adds one thing = that thing', () => {
    expect(sum(42)).toBe(42);
})

it('ignores non-numeric values when adding', () => {
    expect(sum(3, null, 4, undefined, [], 2, 'Hello', false)).toBe(9);
})

it('subtracts 6 - 4 = 2', () => {
    expect(difference(6, 4)).toBe(2);
})

it('subtracts 10 - 8 - 1 = 1', () => {
    expect(difference(10, 8, 1)).toBe(1);
})

it('subtracts nothing = 0', () => {
    expect(difference()).toBe(0);
})

it('subtracts one thing = that thing', () => {
    expect(difference(42)).toBe(42);
})

it('ignores non-numeric values when subtracting', () => {
    expect(difference(3, null, 4, undefined, [], 2, 'Hello', false)).toBe(-3);
})