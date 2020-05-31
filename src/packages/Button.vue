<template>
  <button class="lea-button" :class="btnClass" @click="$emit('click')">
    <lea-icon :name="icon" class="icon" v-if="icon && !loading" />
    <lea-icon name="loading" class="icon loading" v-if="loading" />
    <span v-if="$slots.default" class="content">
      <slot />
    </span>
  </button>
</template>

<script>
export default {
  name: 'lea-button',
  props: {
    type: {
      type: String,
      default: '',
      validator (type) {
        var typeArr = ['warning', 'success', 'info', 'primary', 'danger']
        if (type && !typeArr.includes(type)) {
          console.warn(`type类型必须为${typeArr.join('、')}其中的一种`)
        }
        return true
      }
    },
    icon: {
      type: String
    },
    iconPosition: {
      type: String,
      default: 'left',
      validator (value) {
        if (value && !['left', 'right'].includes(value)) {
          console.warn('iconPosition的属性必须为left或right')
        } else {
          return true
        }
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    btnClass () {
      const classes = []
      this.type && classes.push(`lea-button-${this.type}`)
      this.iconPosition && classes.push(`icon-${this.iconPosition}`)
      return classes
    }
  }
}
</script>

<style lang="scss">
@import '../styles/common.scss';
$height:42px;
$font-size:16px;
$color: #606266;
$border-color: #dcdfe6;
$background: #ecf5ff;
$active-color: #3a8ee6;
.lea-button {
  border-radius: $border-radius;
  border: 1px solid $border-color;
  color: $color;
  background: #fff;
  height: 42px;
  cursor: pointer;
  font-size: $font-size;
  line-height: 1;
  padding: 12px 20px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  outline:none;
  &:hover{
    border-color:$border-color;
    background:$background;
  }
  &:focus,
  &:active{
    color:$active-color;
    border:1px solid $active-color;
    background-color:$background;
  }
  @each $type,$color in(
    primary:$primary,
    success:$success,
    info:$info,
    warning:$warning,
    danger:$danger
   ){
    &-#{$type}{
      background:#{$color};
      border:1px solid #{$color};
      color:#fff;
      fill:#fff
    }
  }
  @each $type,$color in(
    primary:$primary-hover,
    success:$success-hover,
    info:$info-hover,
    warning:$warning-hover,
    danger:$danger-hover
  ){
    &-#{$type}:hover{
      background:#{$color};
      border:1px solid #{$color};
      color:#fff;
      fill:#fff
    }
  }
  @each $type,$color in(
    primary:$primary-active,
    success:$success-active,
    info:$info-active,
    warning:$warning-active,
    danger:$danger-active
  ){
    &-#{$type}:active,
    &-#{$type}:focus{
      background:#{$color};
      border:1px solid #{$color};
      color:#fff;
      fill:#fff
    }
  }
  &.icon-left{
    .icon{
      margin-right: .2em;
      order: 1;
    }
    .content{
      order: 2;
    }
  }
  &.icon-right{
    .icon{
      order: 2;
      margin-right: .2em;
    }
    .content{
      order: 1;
    }
  }
}
.loading{
  animation: spin 2s infinite linear;
}
@keyframes spin{
  0% { transform: rotate(0deg)}
  100% { transform: rotate(360deg)}
}
</style>
