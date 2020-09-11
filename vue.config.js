module.exports = {
  pluginOptions: {
    devServer: {
      port: 8080,
      hot: true
    },
    quasar: {
      importStrategy: 'manual',
      rtlSupport: false
    }
  },
  transpileDependencies: [
    'quasar'
  ]
}
