# Webpack With Vue.js Boilerplate

This is a Webpack + Vue.js boilerplate that heavy inspired by [vuejs-templates/webpack](https://github.com/vuejs-templates/webpack) and [lmk123/webpack-boilerplate](https://github.com/lmk123/webpack-boilerplate) with these features:

 - Apply [Autoprefixer](https://github.com/postcss/autoprefixer) outside of `.vue` components. See [vuejs-templates/webpack#600](https://github.com/vuejs-templates/webpack/issues/600).
 - Use [webpack-dev-server](https://github.com/webpack/webpack-dev-server) instead of custom develop server.
 - [Simple config](build/config.js).
 - Not lint-on-save with ESLint: run `npm run lint` instead. This make me easy to debug code temporary.
 - Use **relative public path** by default. See [vuejs-templates/webpack#200](https://github.com/vuejs-templates/webpack/issues/200).
 - Apply Babel plugins with [babel-preset-env](https://github.com/babel/babel-preset-env).
 - Similar to JS, also split CSS to `vendor.css` and `main.css`. See [vuejs-templates/webpack#598](https://github.com/vuejs-templates/webpack/issues/598).
 - Ready to use `import('./path/to/module')` syntax to [code-splitting](https://webpack.js.org/guides/code-splitting-import/).

## Usage

 1. To run this project you will need [Node](https://nodejs.org/en/download/).
 2. Open the the project folder and Install dependencies: `npm install`

Now you have three commands:

 - `npm start`
 - `npm run build`
 - `npm run lint`: Lint code with ESLint (use [JavaScript Standard Style](https://standardjs.com/) rules)

## Trouble-shooting

This boilerplate use [Sass](http://sass-lang.com/) `node-sass` and `sass-loader` 