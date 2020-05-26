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
