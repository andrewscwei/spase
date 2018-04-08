const path = require(`path`);
const { EnvironmentPlugin } = require(`webpack`);
const { BundleAnalyzerPlugin } = require(`webpack-bundle-analyzer`);
const isDev = process.env.NODE_ENV === `development`;
const analyzerEnabled = (process.env.ANALYZER_ENABLED === `true`);
const baseDir = path.resolve(__dirname, `..`);

console.log(`Building bundle, debug=${isDev}`);

module.exports = {
  target: `node`,
  mode: isDev ? `development` : `production`,
  context: path.join(baseDir, `src`),
  devtool: isDev ? `source-map` : false,
  entry: {
    spase: `./index.js`
  },
  output: {
    path: path.join(baseDir, `dist`),
    filename: isDev ? `[name].js` : `[name].min.js`,
    sourceMapFilename: `[file].map`,
    library: `spase`,
    libraryTarget: `umd`
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: `babel-loader`
    }]
  },
  plugins: [
    new EnvironmentPlugin({
      NODE_ENV: `production`
    })
  ]
    .concat(analyzerEnabled ? [
      new BundleAnalyzerPlugin
    ] : [])
};
