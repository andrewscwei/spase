import HTMLPlugin from 'html-webpack-plugin'
import path from 'path'
import type { Configuration } from 'webpack'

const cwd: string = path.join(__dirname, '../')
const inputDir: string = path.join(cwd, 'src')
const outputDir: string = path.join(cwd, '../', '.gh-pages')

const config: Configuration = {
  devtool: 'source-map',
  entry: {
    bundle: path.join(inputDir, 'index.ts'),
  },
  infrastructureLogging: {
    level: 'error',
  },
  module: {
    rules: [{
      test: /\.ts$/,
      use: [{
        loader: 'babel-loader',
      }],
    }],
  },
  output: {
    filename: '[name].js',
    path: outputDir,
    publicPath: process.env.NODE_ENV === 'development' ? '/' : './',
    sourceMapFilename: '[file].map',
  },
  plugins: [
    new HTMLPlugin({
      filename: 'index.html',
      inject: true,
      template: path.join(inputDir, 'templates', 'index.html'),
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts'],
  },
  target: 'web',
}

export default config
