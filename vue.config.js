module.exports = {
  publicPath: '/mhw-clock/dist',
  configureWebpack: {
    output: {
      filename: 'js/mhw-clock.js',
      chunkFilename: 'js/chunk-vendors.js'
    }
  }
}