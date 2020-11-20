module.exports = {
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set('@', resolve('./src'))
  //   // .set('components', resolve('./src/components')) //set第一个参数：设置的别名，第二个参数：设置的路径

  // },
  lintOnSave: false,
  devServer: {
    port: 9040,
    proxy: {
      '/api': {
        target: 'http://10.0.2.1:5000/',
        changeOrigin: true,
      }
    }
  }
}