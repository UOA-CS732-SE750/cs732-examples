
# CS732 examples - Lecture 00 - Example 00 - Supplementary JavaScript resources
This project doesn't contain any code as such, but this README contains examples of more advanced JavaScript features that are used quite often in React apps. This project covers language features that weren't taught in COMPSCI 719 - so do study this README to make sure you understand these, even if you did really well in the JavaScript section of that course!


## Ternary operator, truthiness and `&&`
In JavaScript, and may other languages, exists the *ternary* operator. This operator produces some output if a given value is "truthy", and some different output if the given value is *not* truthy.

We could already do this using `if-else` statements, like so:

```js
const someValue = ...; // The value to check

let result;
if (someValue) {
    result = ...; // Value if true
}
else {
    result = ...; // value if false
}
```

However, using the ternary operator, it lets us write all of this using one line of code. Here is the equivalent statement, written using the ternary operator instead of `if-else`:

```js
const someValue = ...; // The value to check

const result = someValue ? valueIfTrue : valueIfFalse;
```

As we can see, the conditional we're checking comes first, followed by a `?`. Then, the value if truthy is specified, followed by a colon `:`, followed by the value if not truthy.

In React, this syntax is often used for conditionally rendering components, as it is much easier to interleave ternaries into your JSX code than `if-else` statements.

### Truthiness
In almost all languages, there is the concept of a Boolean value - `true` or `false`. In JavaScript, this is extended with the concept of *truthiness*. If an expression is evaluated and a Boolean value is expected as the result, but a non-Boolean value is given instead (e.g. a number, string, or `null`), JavaScript will automatically convert the value to a Boolean based on whether the value *looks* true - i.e. is *truthy*.

Truthiness in JavaScript is defined as such:

- The values `""` (empty string), `0`, `false`, `null`, `undefined`, and `NaN` are considered *falsy*.
- Any value that is **not** falsy, is *truthy*.

### Logical AND operator (`&&`)
In JavaScript and many other languages, there exists the `&&` operator. Typically this is used with Boolean expressions, and when used as such, will return a Boolean value. Consider the expression `expr1 && expr2`. When `expr1` and `expr2` are both Boolean values, then if `expr1` and `expr2` are both `true`, the result will be `true`. Otherwise, the result will be `false`.

In many languages, such as Java, `&&` doesn't work with non-Boolean values. However, in JavaScript, we can use `&&` with non-Booleans. If we do, it will return a non-Boolean result. Again consider `expr1 && expr2`, this time with non-Boolean values for `expr1` and `expr2`. If `expr1` is truthy (see above), then the result will be `expr2`. Otherwise, the result will be `expr1`. Or, in other words, `expr1 && expr2` will return a result equivalent to the following:

```js
let result;
if (expr1) {
    result = expr2;
}
else {
    result = expr1;
}
```

In react, this non-Boolean mode of the `&&` operator is often used in place of the ternary operator to conditionally render a component if a value is truthy, in the case that rendering an alternative component if the value is falsy is not required.


## Arrow functions
In JavaScript (and many other languages), you can write functions in several ways. For example, this is a normal function that you're used to:
```js
function sayHello(name) {
    console.log(name);
}
```

And, this is an "anonymous" version of that function:
```js
const sayHelloAnon = function(name) {
    console.log(name);
}
```

More recently, arrow functions were introduced to the language as a more concise way of writing anonymous functions. Here is the arrow function version of `sayHello()`:

```js
const sayHelloArrow = (name) => console.log(name);
```

Here is another example of a function and its corresponding arrow function, this time showing a return value. Note that we can omit the return statement itself from the arrow function, contributing to its conciseness.

```js
// Normal version
function add(a, b) {
    return a + b;
}

// Arrow function version
const addArrow = (a, b) => a + b;
```

If arrow functions have more than one line of code in the body, that works too - we just keep the braces `{ }`.

```js
function average(numbers) {
    let sum = 0;
    for (let num of numbers) {
        sum += num;
    }
    return sum / numbers.length;
}

// ... like so
const averageArrow = (numbers) => {
    let sum = 0;
    for (let num of numbers) {
        sum += num;
    }
    return sum / numbers.length;
}
```

Arrow functions are typically used most often where anonymous functions would have been used previously. For example, JavaScript arrays have a function called [reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce), which takes a reducer function that can be used to reduce an array to a single output. It could be used to procude the sum of all elements in the array, as follows:

```js
function add(a, b) {
    return a + b;
}

const sum = myArray.reduce(add, 0);
```

Instead of defining a function as above, we could replace that with an arrow function:

```js
const sum = myArray.reduce((a, b) => a + b, 0);
```


## Array and object dereferencing
In JavaScript, dereferencing, can be used as shorthand to save us from excessive use of dot (`.`) notation, or array indexing (`[]`) syntax, and can often increase the readability of our code.

### Array dereferencing
Array dereferencing lets us easily assign variables referring to different elements in an array, in a single line.

For example, consider the following array:

```js
const myArray = ['Hello', 'World', 'This', 'Is', 'Sparta'];
```

Let's now say that we wanted to define `const`s referring to the first two elements in that array. We could write the following:

```js
const elem1 = myArray[0];
const elem2 = myArray[1];
```

Or, we could use array dereferencing syntax to write the following instead:

```js
//      v-- assign myArray[0] to this variable...
const [elem, elem2] = myArray;
//             ^-- and assign myArray[1] to this variable.
```

Both of the examples above will result in the same thing: consts `elem1` and `elem2` being defined, having the values "Hello" and "World", respectively.

A practical example of this is if we need a function to return multiple values. For example, consider the division operation, where we might want to know both the result of integer division, *and* the remainder, in one go. We could do that, like so:

```js
// A function to perform devision and return both the quotient and remainder
function integerDivision(a, b) {
    const quotient = Math.floor(a / b);
    const remainder = a % b;
    return [quotient, remainder];
}

// Using the function
const a = 5, b = 4;
const [quotient, remainder] = integerDivision(a, b);
console.log(`${a} / ${b} = ${quotient} (remainder ${remainder}).`);
```

In React, the most common example of this syntax is with the `useState()` hook, which returns an array where the first element is the stateful value, and the second element is a function to mutate the value.

```js
const [count, setCount] = useState(0);
```

As a note, the syntax also works with function argumenets. For example, in our `integerDivision()` example above, we could write the following:

```js
const a = 5, b = 4;
const result = integerDivision(a, b);
printResult(a, b, result);

function printResult(a, b, [quotient, remainder]) {
    console.log(`${a} / ${b} = ${quotient} (remainder ${remainder}).`);
}
```

### Object dereferencing
Object dereferencing works very similarly to array dereferencing, except with object properties instead of array indices.

For example, consider the following definition:

```js
const person = {
    firstName: 'Joe',
    lastName: 'Bloggs',
    age: 42,
    address: '123 Some Street',
    likesReact: true
};
```

If we wanted to access that person's properties such as first name and age, we could of course use dot notation and write `person.firstName`, `person.age`, etc (or `[]` notation such as `person['firstName']` etc). This may get tedious if we need to refer to the person's properties many times.

Instead, if we like, we can write the following to obtain variables pointing to the properties we need to access, in a single line of code:

```js
const { firstName, age } = person;
```

This syntax also works for function arguments, and is common to use in React to dereference the `props` argument being passed into a functional component. Contrast the following two snippets as an example:

```jsx
function MyComponent(props) {
    return (
        <p>My name is {props.name}, and I like {props.food}!</p>
    );
}
```

```jsx
function MyComponent({ name, food }) {
    return (
        <p>My name is {name}, and I like {food}!</p>
    );
}
```


## Ellipsis notation
In JavaScript, it is common we want to make a copy of an array or object, with potentially some minor modifications. One way of doing this is with the ellipsis notation.

For example, consider the following definitions:

```js
const myArray = ['Hello', 'World', 'This', 'Is', 'Sparta'];

const myObject = {
    firstName: 'Joe',
    lastName: 'Bloggs',
    age: 42,
    address: '123 Some Street',
    likesReact: true
};
```

### Array ellipsis
To make a shallow copy of `myArray`, we can use ellipsis notation as follows:

```js
const arrayCopy = [ ...myArray ];
```

This results in a new array being created, with all elements being identical (by reference) to the elements in `myArray`.

If we want to add additional elements to the new array in the same line of code, we can do so. For example, consider the following two new arrays:

```js
// Contents of array1:
// ['Hello', 'World', 'This', 'Is', 'Sparta', 'Extra', 'Things]
const array1 = [ ...myArray, 'Extra', 'Things'];

// Contents of array2:
// ['More', 'Stuff', 'Hello', 'World', 'This', 'Is', 'Sparta']
const array2 = [ 'More', 'Stuff', ...myArray ];
```

The examples show how we can add more elements to the beginning and / or end of the new array being created.

We can even ellipsis multiple arrays into a single result array:

```js
const array1 = [ 1, 2, 3 ];
const array2 = [ 4, 5, 6 ];

// Contents: [ 1, 2, 3, 4, 5, 6 ]
const result = [ ...array1, ...array2 ];
```

### Object ellipsis
Similarly to array copies, we can copy objects such as `myObject` as follows:

```js
const objectCopy = { ...myObject };
```

This will create a new JS object, and copy all properties of `myObject` across to the new object. In other words, `objectCopy.firstName === myObject.firstName`, as will be true for all of `myObject`'s other properties.

We can assign extra properties to the newly created object easily:

```js
const newPerson = {
    ...myObject,

    occupation: 'Software engineer'
};
```

This will create a new object with all the properties of `myObject`, plus an `occupation` property.

We can also overwrite any properties in the object being copied, by specifying the same property name again. For example:

```js
const dave = {
    ...myObject,
    firstName: 'Dave',
    lastName: 'Dobbyn',
    occupation: 'Singer'
};
```

This will result in the following object:

```js
{
    firstName: 'Dave',
    lastName: 'Dobbyn',
    age: 42,
    address: '123 Some Street',
    likesReact: true,
    occupation: 'Singer'
}
```

### Combining ellipsis with dereferencing
We can combine the ellipsis with either array or object dereferencing to define objects or arrays that have "the rest" of the elements or properties not explicitly named For example, for arrays:

```js
function source = [ 1, 2, 3, 4, 5, 6 ];

const [first, second, ...andTheRest] = source;

// first: 1
// second: 2
// andTheRest: [ 3, 4, 5, 6 ]
```

And, for objects:

```js
const person = {
    firstName: 'Joe',
    lastName: 'Bloggs',
    age: 42,
    address: '123 Some Street',
    likesReact: true
};

const { firstName, age, ...andTheRest } = person;

// firstName: 'Joe'
// age: 42
// andTheRest: { lastName: 'Bloggs', address: '123 Some Street', likesReact: true }
```

### Functions with variable number of parameters
Finally, we can use ellipsis to define a function parameter that accepts the "rest of" the arguments passed.

For example, consider the following function:

```js
function average(...numbers) {
    const sum = numbers.reduce((a, b) => a + b, 0);
    return sum / numbers.length;
}
```

You could call this function with any number of arguments. All of these are valid:

```js
average(1, 2, 3, 4); // The four numbers will be converted to an array
average(3, 8); // The three numbers will be converted to an array
average([ 5, 7, 2 ]); // The given array will be used directly
```


## The array `map()` function
In JavaScript, arrays have a function called `map()`. This is a very useful function which creates a *new* array, of the same size as the original array. Each element in the result array will be generated from the given *mapping function*, given an element in the source array and (optionally) its index. As an example, consider the following code:

```js
const nums = [ 1, 2, 3 ];

const plusOnes = nums.map(x => x + 1);
```

In that case, the mapping function is the arrow function `x => x + 1`. This means, each element in the result array `plusOnes` will be one bigger than the corresponding source element. In this case, `[ 2, 3, 4 ]`.

Now consider the next example, showing how we can additionally access the *index* in addition to the element:

```js
const source = [ 'A', 'B', 'C' ];

const result = source.map((elem, index) => `Element ${index} = '${elem}'`);
```

The `result` array will contain the following elements:

```js
[
    "Element 0 = 'A'",
    "Element 1 = 'B'",
    "Element 2 = 'C'"
]
```

In React, the `map()` function is widely used when we need to render a particular component multiple times, once for each element in an array. For example, say we have a list of to-do items:

```js
const todos = [
    'Sleep',
    'Get coffee',
    'Procrastinate'
];
```

Then, we could convert this to an `<ol>`, with one `<li>` for each todo item:

```jsx
function ToDoList({ todos }) {
    return (
        <ol>
            {todos.map((todo, index) => (
                <li key={index}>{todo}</li>
            ))}
        </ol>
    );
}
```

The resulting HTML on-screen would be:

```html
<ol>
    <li>Sleep</li>
    <li>Get coffee</li>
    <li>Procrastinate</li>
</ol>
```

For more information about using the `map()` function this way, refer to Week One's material, along with [Example 04](../example-04-components-logic-loops).
