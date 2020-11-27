module.exports = {
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set('@', resolve('./src'))
  //   // .set('components', resolve('./src/components')) //set第一个参数：设置的别名，第二个参数：设置的路径

  // },
  publicPath: '/os/',
  lintOnSave: false,
  devServer: {
    // port: 9040,
    proxy: {
      "/api": {
        target: "http://101.37.76.80:9001/os/",
        changeOrigin: true,
        pathRewrite: {
          // 标识替换
          // 原请求地址为 /api/getData 将'/api'替换''时，
          // 代理后的请求地址为： http://xxx.xxx.xxx/getData
          // 若替换为'/other',则代理后的请求地址为 http://xxx.xxx.xxx/other/getData     
         '^/api': ''  
       }
      }
    }
  },
};
