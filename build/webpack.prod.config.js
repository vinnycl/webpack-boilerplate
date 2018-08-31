process.env.NODE_ENV = 'production'

var utils = require('./utils')
var webpack = require('webpack')
var config = require('./config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.config')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.sourceMap,
      extract: true
    })
  },
  devtool: config.build.sourceMap ? 'source-map' : false,
  output: {
    path: utils.absolutePath(config.build.assetsRoot),
    publicPath: config.build.publicPath,
    // filename: 'js/[name].[chunkhash].js',
    // chunkFilename: 'js/[chunkhash].js'
    filename: 'js/[name].js'
  },
  plugins: [
    new CleanWebpackPlugin([config.build.assetsRoot], {
      root: utils.absolutePath('')
    }),
    new webpack.HashedModuleIdsPlugin(),
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': config.build.env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      // if we use a prefix (something like `css/[name].css`) it will break all `url()` reference
      // such as `background-image` and `@font-face src` when public path is relatively
      //filename: '[name].[contenthash].css',
      filename: 'css/[name].css',
      // If you do not add the following line, you will get an error.
      // https://github.com/webpack/webpack/issues/959#issuecomment-276685210
      allChunks: true
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true,
        map: config.build.sourceMap ? { inline: false } : false
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: config.htmlTemplate,
      minify: {
        removeComments: true,
        removeCommentsFromCDATA: true,
        collapseWhitespace: true,
        conservativeCollapse: false,
        removeAttributeQuotes: true,
        removeScriptTypeAttributes: true,
        removeStyleTypeAttributes: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          // will js versus  CSS Documents are divided into main.css versus  vendor.css Two
          /\.(js|css)$/.test(module.resource) &&
          module.resource.indexOf(
            utils.absolutePath('node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // copy custom static assets
    new CopyWebpackPlugin([{
      from: utils.absolutePath(config.staticRoot),
      ignore: ['.*']
    }])
  ]
})

if (config.build.analyzer) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
