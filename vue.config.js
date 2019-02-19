module.exports = {
  transpileDependencies: ["axios","vue-qr","iview"],
  devServer: {
      port: 8000
    },
    configureWebpack: {
      devtool: 'source-map'
    }
}