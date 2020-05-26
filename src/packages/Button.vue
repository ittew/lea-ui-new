<template>
  <button class="lea-button" :class="btnClass">
    <lea-icon :name="icon" class="icon" v-if="icon" />
    <span v-if="$slots.default">
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
    }
  },
  computed: {
    btnClass () {
      const classes = []
      this.type && classes.push(`lea-button-${this.type}`)
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
  vertical-align: middle;
  &:hover{
    border-color:$border-color;
    background:$background;
  }
  &:focus,
  &:active{
    color:$active-color;
    border:1px solid $active-color;
    background-color:$background;
    outline:none
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
  .icon{
    vertical-align: middle;
  }
}
</style>
