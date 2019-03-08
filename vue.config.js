module.exports = {
  transpileDependencies: ["axios","vue-qr","vuex",'vue-router',"@/util/tools.js"],
  devServer: {
      port: 8000
    },
    configureWebpack: {
      devtool: 'source-map'
    }
}