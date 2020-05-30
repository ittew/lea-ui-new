## 基础
* packages 存放所有组件 
* index.js 入口 引入所有组件并注册
* main.js 引入index.js入口文件
```js
// main.js
import leaUi from './packages/index'
Vue.use(leaUi) // 调用 install 方法注册所有全局组件
// index.js中 install 方法 注册所有组件为全局组件
const install = (vue) => {
  // 注册所有全局组件 require.context wenpack 获取特定上下文 实现自动化导入
  // require.context(读取文件路径, 是否遍历文件子目录, 匹配文件正则表达式)
  const requireComponent = require.context('./', true, /\.vue/)
  console.log(requireComponent.keys()) // 获取到的匹配文件
  requireComponent.keys().forEach(filename => {
    const config = requireComponent(filename)
    console.log(config)
    vue.component(config.default.name, config.default)
  })
}
export default {
  install
}
// App.vue 使用
<lea-button />
<lea-button-group />
<lea-icon />
``` 

## 单元测试
1. 为核心功能编写测试， 保障项目的可靠性
2. 强迫开发者， 编写更容易被测试的代码， 提高代码的质量
3. 编写测试有文档的作用， 方便维护

## 常见测试框架
* karma 为前端自动化测提供跨浏览器测试的工具， 可以在浏览器中执行测试用例
* Mocha chai sinon
* Jest jsdom 不能再浏览器中测试

## karma 测试
* 安装 npm install -D @vue/test-utils karma karma-chai karma-chrome-launcher karma-mocha karma-sourcemap-loader karma-spec-reporter karma-webpack mocha
* 新建 karma.conf.j文件
```js
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
```
* 在test/unit下 编写测试文件 button.spec.js
```js
import { expect } from 'chai'
describe('Button.vue', () => { // 划分作用域
  it('1+1是否等于2', () => {
    expect(1+1).to.eq(2)
  })
})
```
* 在package.json中添加 script  test:'karma start'
* 测试是否成功 npm run test 出现 Button.vue √ 1+1是否等于2 对勾则说明成功


## button组件
* 内容 slot
* 传入icon 是否显示icon
* icon位置 display:flex  order属性调换顺序
* 将svg写成icon组件
* 添加loading及动画
* 给lea-button添加事件 `@click="$emit('click')"`
* button-group slot
* 按钮组border问题 margin-left：-1px
* 按钮组元素检查