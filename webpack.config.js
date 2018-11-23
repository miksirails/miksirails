var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var Clean = require("clean-webpack-plugin");
var path = require("path");

var definePlugin = new webpack.DefinePlugin({
  __DEVELOPMENT__: JSON.stringify(
    JSON.parse(process.env.BUILD_DEVELOPMENT || false)
  ),
  __PRODUCTION__: JSON.stringify(
    JSON.parse(process.env.BUILD_PRODUCTION || false)
  ),
});

var siteConfig = {
  entry: {
    index: ["./source/stylesheets/index.scss", "./source/javascripts/index.js"],
  },

  resolve: {
    modules: [path.join(__dirname, "source/javascripts"), "node_modules"],
  },

  output: {
    path: __dirname + "/tmp/dist",
    filename: "javascripts/[name].bundle.js",
  },

  module: {
    rules: [
      {
        test: /.*\.js$/,
        exclude: /node_modules|tmp|vendor/,
        use: [
          {
            loader: "babel-loader",
            options: {
              // cacheDirectory: true,
              // presets: ["es2015", "stage-0", "babel-preset-react", "react"]
              presets: ["es2015", "stage-0"],
            },
          },
        ],
      },

      // { test: require.resolve("jquery"), loader: "expose?$" },

      {
        test: /[\\\/]vendor[\\\/]modernizr\.js$/,
        use: [{loader: "imports?this=>window!exports?window.Modernizr"}],
      },

      // Load SCSS
      {
        test: /.*\.scss$/,
        use: ExtractTextPlugin.extract(
          "css-loader!sass-loader?sourceMap&includePaths[]=" +
            __dirname +
            "/node_modules"
        ),
      },

      // Load plain-ol' vanilla CSS
      {test: /\.css$/, use: [{loader: "style-loader!css"}]},

      // the url-loader uses DataUrls.
      // the file-loader emits files.
      // {
      //   test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      //   // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
      //   // loader: "url?limit=10000"
      //   loader: "url",
      // },
      {
        test: /\.(ttf|eot|svg|woff2?)(\?[\s\S]+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              publicPath: "/fonts/",
              outputPath: "fonts/",
            },
          },
        ],
      },
    ],
  },

  node: {
    console: true,
  },

  plugins: [
    definePlugin,
    new Clean(["tmp"]),
    new ExtractTextPlugin("stylesheets/index.bundle.css"),
    // new webpack.ProvidePlugin({
    //   $: "jquery",
    //   jQuery: "jquery",
    //   "window.jQuery": "jquery"
    // }),
  ],
};

module.exports = [siteConfig];
