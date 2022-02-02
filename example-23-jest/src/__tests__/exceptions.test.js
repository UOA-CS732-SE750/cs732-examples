import { throwStuff } from "../exceptions"

it('throws an appropriate error', () => {
    expect(() => throwStuff()).toThrow('This is an error.')
});