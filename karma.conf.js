var webpackConfig = require('@vue/cli-service/webpack.config')

module.exports = function(config) {
  config.set({
    frameworks: ['mocha'],
    files: ['tests/**/*.spec.js'], //需要加载到浏览器的文件列表
    preprocessors: { //在浏览器使用之前处理匹配的文件
      '**/*.spec.js': ['webpack', 'sourcemap']
    },
    autoWatch: true, //启用自动检测文件变化进行测试
    webpack: webpackConfig,
    reporters: ['spec'],
    browsers: ['ChromeHeadless'] //测试启动的浏览器
  })
}
