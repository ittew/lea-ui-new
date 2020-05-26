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