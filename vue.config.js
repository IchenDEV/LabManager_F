module.exports = {
  transpileDependencies: ["axios","vue-qr"],
  devServer: {
      port: 8000
    },
    configureWebpack: {
      devtool: 'source-map'
    }
}