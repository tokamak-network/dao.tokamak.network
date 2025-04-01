const ESLintPlugin = require('eslint-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  configureWebpack: {
    plugins: [
      new ESLintPlugin({
        extensions: ['js', 'vue'],
        emitWarning: true,
      }),
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
    ],
    resolve: {
      fallback: {
        http: require.resolve("stream-http"),
        https: require.resolve("https-browserify"),
        zlib: require.resolve("browserify-zlib"),
        url: require.resolve("url/"),
        assert: require.resolve("assert/"),
        stream: require.resolve("stream-browserify"),
        buffer: require.resolve("buffer/"),
      },
    },
  },
};
