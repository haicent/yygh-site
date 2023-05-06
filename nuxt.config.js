module.exports = {
//   modules: ['@nuxtjs/axios', "@nuxtjs/proxy"],
//   /*
//      ** axios proxy
//      */
//   axios: {
//     proxy: true
//   },
//   /*
//    ** proxy
//    */
//   proxy: {
// // 一旦devServer(5000)服务器接收到 /api/xxx 的请求，就会把请求转发到另一个服务器(3000)
//     // 浏览器和服务器之间有跨域，但是服务器和服务器之间没有跨域
//     '/api/': {
//       target: 'http://192.168.122.10:31821',
//       // 发送请求时，请求路径重写：将 /api/xxx --> /xxx （去掉/api）
//       // pathRewrite: {
//       //   '^/api/': ''
//       // }
//     }
//   },
  /*
  ** Headers of the page
  */
  head: {
    title: 'yygh-site',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '尚医通 - 预约挂号统一平台' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },

  plugins: [{
    src: '~plugins/myPlugin',
    ssr: true,
  }],
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],
  /*
  ** Build configuration
  */
  build: {
    vendor: ['axios'],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

