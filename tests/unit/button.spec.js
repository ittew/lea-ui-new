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
