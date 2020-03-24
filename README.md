# interp1

[MATLAB-inspired](https://www.mathworks.com/help/matlab/ref/interp1.html) 1-dimensional data interpolation.

## Importing this function

### Node Modules

- Run `npm install interp1 --save`
- Add an import to the npm package `import interp1 from 'interp1';`
- Then you can use the function in your code.

### UNPKG

- Put the following script tag `<script src='https://unpkg.com/interp1@1.0.2/dist/interp1.umd.js'></script>` in the head of your index.html
- Then you can use the function in your code.

## API

```javascript
vqs = interp1(xs, vs, xqs);
vqs = interp1(xs, vs, xqs, method);
```

The function takes the following arguments:

- `xs`: Array of independent sample points. No value may occur more than once.
- `vs`: Array of dependent values v(x) with length equal to xs.
- `xqs`: Array of query points.
- `method`: Method of interpolation: `linear`, `nearest`, `next` or `previous`. Defaults to `linear`.

It returns an array of interpolated values `vqs`, corresponding to the query values `xqs`.

## Example

```javascript
var vqs = interp1(
  [1, 2, 3],
  [-4, 6, 3],
  [1, 1.5, 2.5],
  'linear',
);
console.log(vqs);
// expected output: Array [-4, 1, 4.5]
```

## NPM scripts

- `npm install`: Install dependencies
- `npm test`: Run test suite
- `npm start`: Run `npm run build` in watch mode
- `npm run test:watch`: Run test suite in [interactive watch mode](http://facebook.github.io/jest/docs/cli.html#watch)
- `npm run test:prod`: Run linting and generate coverage
- `npm run build`: Generate bundles and typings, create docs
- `npm run lint`: Lints code
