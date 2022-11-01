const { defineConfig } = require('@vue/cli-service')
const pdfDevUrl = 'http://localhost:8090'
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/pdf-server': {
        target: `${pdfDevUrl}/pdf-server`,
        changeOrigin: true,
        pathRewrite: {
          '^/pdf-server': '',
        },
      },
    },
  },
})
