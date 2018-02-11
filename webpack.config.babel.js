import { resolve } from 'path'

export default {
  entry: resolve(__dirname, 'client'),
  output: {
    path: resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: [ '.js' ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ 'react', [ 'env', { modules: false } ] ],
            plugins: [
              'transform-class-properties',
              'transform-object-rest-spread',
              [ 'transform-react-remove-prop-types', { removeImport: true } ]
            ]
          }
        }
      }
    ]
  }
}
