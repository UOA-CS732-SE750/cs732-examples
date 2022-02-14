# CS732 examples - Using Babel to enable JSX support
JSX allows us to write HTML-like syntax to define our React components. However, it is not supported by default. We need to *transpile* our JavaScript code with JSX into a format without JSX that browsers can understand.

To do this we can use Babel:

1) Set up your project as an `npm` project:

```
npm init -y
```

2) Install Babel:

```
npm install babel-cli@6 babel-preset-react-app@3
```

**Note:** If you've downloaded the project from the examples repo, then the dependencies are already defined in `package.json`, and you'll only need to run `npm install` without the extra stuff.

3) Start Babel:

```
npx babel --watch src --out-dir . --presets react-app/prod
```

Now, whenever any file in the `src` folder changes (in this case, our `like-button.js` with JSX), Babel will create an equivalent version of that file in the out-dir (`.`, or the root directory in this case). The file is functionally identical but written in JavaScript which all browsers can understand.

**Note:** You won't need to manually install Babel like this in any of the other examples in this course - Babel is already included in `create-react-app` (See example 03!).