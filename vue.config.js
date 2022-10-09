'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}
const name = defaultSettings.title || '新CMS系统'

const port = process.env.production || process.env.npm_config_port || 9527 // dev port

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: false,
    /* 使用代理 */
    proxy: {
      'cors-icms': {
        target: 'https://testicms.shhzcj.com',
        changeOrigin: true,
        pathRewrite: {
          'cors-icms': ''
        }
      },
      'cors-wx': {
        target: 'http://testwx.shhzcj.com',
        changeOrigin: true,
        pathRewrite: {
          'cors-wx': ''
        }
      },
      'cors-liveapi': {
        target: 'http://testliveapi.shhzcj.com',
        changeOrigin: true,
        pathRewrite: {
          'cors-liveapi': ''
        }
      },
      'cors-info': {
        target: 'https://testinfo.shhzcj.com',
        changeOrigin: true,
        pathRewrite: {
          'cors-info': ''
        }
      },
      'cors-lottery': {
        target: 'http://testlottery.shhzcj.com',
        changeOrigin: true,
        pathRewrite: {
          'cors-lottery': ''
        }
      }
    },
    overlay: {
      warnings: false,
      errors: true
    }
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap((options) => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()
  }
}
