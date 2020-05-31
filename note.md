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

## 编写button组件测试用例
```js
import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Button from '../../src/packages/Button'
import Icon from '../../src/packages/Icon'

describe('Button.vue', () => { // 划分作用域
  // 测试 slot
  it('测试button能否正常显示slot中的内容', () => { // 三种情况相等  不相等  是否包含
    //
    const wrapper = shallowMount(Button, {
      slots: {
        default: 'lea-ui'
      }
    })
    expect(wrapper.text()).to.eq('lea-ui')
  })
  // 测试 Icon
  it('测试icon传入是否显示正常', () => {
    const wrapper = shallowMount(Button, {
      stubs: { // 替换功能  将 button中 的 lea-iocn替换成 Icon组件
        'lea-icon': Icon
      },
      propsData: {
        icon: 'sousuo'
      }
    })
    // console.log(wrapper.html()) // 打印html结构
    expect(wrapper.find('use').attributes('href')).to.eq('#icon-sousuo')
  })
  // 测试Icon位置
  it('按钮传入position是否正常显示', () => {
    const wrapper = shallowMount(Button, {
      attachToDocument: true, // 在浏览器上测试
      stubs: { // 替换功能
        'lea-icon': Icon
      },
      slots: {
        default: 'lea-ui'
      },
      propsData: {
        icon: 'eye',
        iconPosition: 'left'
      }
    })
    // 用vue实例获取span
    const ele = wrapper.vm.$el.querySelector('span')
    expect(getComputedStyle(ele).order).to.eq('2')
    wrapper.setProps({ iconPosition: 'right' })
    // 设置props 必须在下一个事件循环中取值 类似react的  setState
    return wrapper.vm.$nextTick().then(() => {
      expect(getComputedStyle(ele).order).to.eq('1')
    })
  })
  // 测试点击事件
  it('测试按钮能否正常点击', () => {
    const wrapper = shallowMount(Button, {})
    wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click').length).to.eq(1)
  })
})
```

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


## 使用 VuePress 
1. 安装 `npm install vuepress -D`
2. 新建 vue-press npm init -y 初始化 package.json 配置scripts
```js
{
  "docs:dev": "vuepress dev docs",
  "docs:build": "vuepress build docs"
}
```
3. 初始化docs vue-press/docs/README.MD
新建docs文件夹，在docs下增加入口页面README.MD
```
---
home: true
actionText: 欢迎 →
actionLink: /components/button
features:
- title: 搭建自己的组件库
  details: 从0搭建自己的组件库
---
```
4. 配置导航 新建 .vuepress文件夹
新建 .vuepress/config.js
```js
module.exports = {
  title: 'lea-ui', // 设置网站标题
  description: 'ui 库', //描述
  dest: './build', // 设置输出目录
  port: 1234, //端口
  themeConfig: { //主题配置
    nav: [{
        text: '主页',
        link: '/'
      } // 导航条
    ],
    // 为以下路由添加侧边栏
    sidebar: {
      '/components/': [{
          collapsable: true,
          children: ['button']
        }
      ]
    }
  }
}
```
5. 初始化配置文件 
新建 .vuepress/enhanceApp.js
安装  npm install element-ui highlight.js node-sass sass-loder -S
```js
import Vue from 'vue';
import Element from 'element-ui'; // 引入elementUi
import 'element-ui/lib/theme-chalk/index.css'

import hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css' //样式文件

import Button from '../../../src/packages/Button'
import Icon from '../../../src/packages/Icon'
Vue.component(Button.name,Button)
Vue.component(Icon.name,Icon)
Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block)=>{
    hljs.highlightBlock(block)
  })
})
export default ({
  Vue
}) => {
  Vue.use(Element);
}
```
6. 覆盖默认样式 新建样式文件 styles/palette.styl
```
$codeBgColor = #fafafa // 代码背景颜色

$accentColor = #3eaf7c
$textColor = #2c3e50

$borderColor = #eaecef
$arrowBgColor = #ccc
$badgeTipColor = #42b983
$badgeWarningColor = darken(#ffe564, 35%)
$badgeErrorColor = #DA5961

.content pre{  margin: 0!important;}

.theme-default-content:not(.custom){
  max-width: 1000px !important;
}
```
7. 创建 .vuepress/components/
创建button展示组件 test1 test2 test3
```
<template>
  <div>
      <zf-button>默认按钮</zf-button>
      <zf-button type="primary">主要按钮</zf-button>
      <zf-button type="success">成功按钮</zf-button>
      <zf-button type="info">信息按钮</zf-button>
      <zf-button type="warning">警告按钮</zf-button>
      <zf-button type="danger">危险按钮</zf-button>
  </div>
</template>
```
创建demo-block可收缩代码块
```
<template>
  <div class="demo-block">
    <div style="padding:24px">
        <slot name="source"></slot>
    </div>
    <div class="meta" ref="meta" v-show="isExpanded">
      <div class="description" v-if="$slots.default">
        <slot></slot>
      </div>
      <div class="highlight " v-highlight >
        <slot name="highlight"></slot>
      </div>
    </div>
    <div
      class="demo-block-control"
      ref="control"
      @click="isExpanded = !isExpanded">
      <i :class="[iconClass, { 'hovering': hovering }]"></i>
      {{controlText}}
    </div>
  </div>
</template>

<style lang="scss">
.demo-block-control{
  -webkit-user-select: none;
}
  .demo-block {
    border: solid 1px #ebebeb;
    border-radius: 3px;
    transition: .2s;
    &.hover {
      box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5);
    }

    code {
      font-family: Menlo, Monaco, Consolas, Courier, monospace;
    }

    .demo-button {
      float: right;
    }

    .source {
      padding: 24px;
    }

    .meta {
      background-color: #fafafa;
      border-top: solid 1px #eaeefb;
    }

    .description {
      padding: 20px;
      box-sizing: border-box;
      border: solid 1px #ebebeb;
      border-radius: 3px;
      font-size: 14px;
      line-height: 22px;
      color: #666;
      word-break: break-word;
      margin: 10px;
      background-color: #fff;

      p {
        margin: 0;
        line-height: 26px;
      }

      code {
        color: #5e6d82;
        background-color: #e6effb;
        margin: 0 4px;
        display: inline-block;
        padding: 1px 5px;
        font-size: 12px;
        border-radius: 3px;
        height: 18px;
        line-height: 18px;
      }
    }

    .highlight {
      pre {
        margin: 0;
      }

      code.hljs {
        margin: 0;
        border: none;
        max-height: none;
        border-radius: 0;
        line-height: 1.8;
        color:black;
        &::before {
          content: none;
        }
      }
    }

    .demo-block-control {
      border-top: solid 1px #eaeefb;
      height: 44px;
      box-sizing: border-box;
      background-color: #fff;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      text-align: center;
      margin-top: -1px;
      color: #d3dce6;
      cursor: pointer;
      position: relative;

      &.is-fixed {
        position: fixed;
        bottom: 0;
        width: 868px;
      }

      i {
        font-size: 16px;
        line-height: 44px;
        transition: .3s;
        &.hovering {
          transform: translateX(-40px);
        }
      }

      > span {
        position: absolute;
        transform: translateX(-30px);
        font-size: 14px;
        line-height: 44px;
        transition: .3s;
        display: inline-block;
      }

      &:hover {
        color: #409EFF;
        background-color: #f9fafc;
      }

      & .text-slide-enter,
      & .text-slide-leave-active {
        opacity: 0;
        transform: translateX(10px);
      }

      .control-button {
        line-height: 26px;
        position: absolute;
        top: 0;
        right: 0;
        font-size: 14px;
        padding-left: 5px;
        padding-right: 25px;
      }
    }
  }
</style>

<script type="text/babel">
  export default {
    data() {
      return {
        hovering: false,
        isExpanded: false,
        fixedControl: false,
        scrollParent: null,
        langConfig: {
          "hide-text": "隐藏代码",
          "show-text": "显示代码",
        }
      };
    },
    computed:{
      iconClass() {
        return this.isExpanded ? 'el-icon-caret-top' : 'el-icon-caret-bottom';
      },
      controlText() {
        return this.isExpanded ? this.langConfig['hide-text'] : this.langConfig['show-text'];
      },
    }
  };
</script>
```
8. 编写对应的.md文件 docs/components/button.md
```

```