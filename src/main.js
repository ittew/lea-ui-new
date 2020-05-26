import Vue from 'vue'
import App from './App.vue'
import leaUi from './packages/index'
// 全局组件
Vue.use(leaUi) // 默认调用install方法

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
