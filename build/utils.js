var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var IS_PRODUCTION = process.env.NODE_ENV === 'production'

exports.absolutePath = function (prePath) {
  return path.resolve(__dirname, '..', prePath)
}

exports.cssLoaders = getCssLoaders

function getCssLoaders (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: IS_PRODUCTION,
      sourceMap: options.sourceMap
    }
  }

  /**
   * Generation loader Configuration
   * @param {string} [ext]
   * @param {object} [loaderOptions]
   * @return {Array}
   */
  function generateLoader (ext, loaderOptions) {
    // vue-loader Will automatically give .vue In the file <style> Block application postcss-loader，
    // But when quoted directly in the project CSS When the file is not, so
    // Unified here postcss-loader
    var loaders = [
      cssLoader,
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: options.sourceMap
        }
      }
    ]

    if (ext) {
      loaders.push({
        loader: ext + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Production environment will be all .vue middle  CSS Merged into a single main.css
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoader(),
    sass: generateLoader('sass'),
    scss: generateLoader('sass')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = getCssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}
