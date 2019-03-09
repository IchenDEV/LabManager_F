module.exports = {
  transpileDependencies: ["axios", "vue-qr", "vuex"],

  devServer: {
    port: 8000
  },

  configureWebpack: {
    devtool: 'source-map'
  },

  chainWebpack: config => { // ie报错无效字符 添加该配置项 解决该问题  
    config.module.rule('iview').test(/iview.src.*?js$/).use('babel').loader('babel-loader').end()
  }
}
