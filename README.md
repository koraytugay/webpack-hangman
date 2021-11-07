# Vanilla Hangman
This is Vanilla Hangman enhanced with webpack, for learning purposes.

Steps taken to integrate webpack to the project:
- `gameController.js` is renamed to `index.js` since the default entry point in webpack is `src/index.js`
  - `type=module` attribute has been removed since it is not a ES6 module anymore
- `index.html` now includes `dist/main.js` since that is the default output file for webpack
- npm has been added to the project with `npm init -y`
- `webpack` and `webpack-cli` has been added by `npm install webpack webpack-cli`
- In `package.json`, I added the following scripts:
```
"scripts": {
  "dev": "webpack --mode development",
  "prod": "webpack --mode production"
},
```
- Now you need to run `npm run dev` or `npm run prod` to generate the bundle
  - Note one can simply run `npx webpack` as well and the bundle operation will work
- Once the bundle is generated, open `index.html`

Previously simply opening the `index.html` was not working since the script was of type module. It is not the case anymore.

## Introducing watch
- Add `"watch": "webpack --mode development --watch"` to `scripts`
- Run `npm run watch`
- Open `index.html` again

Now whenever you make a change in your JS file, simply reload the application, and they will be in effect. No need to bundle everytime.

## Bundling CSS
You can even bundle the css, within the `dist/bundle.js` file, which is very weird. `bundling-css` commit shows the required changes.

## Bundling Images
The commit `bundling-images` shows the changes required for bundling images.
