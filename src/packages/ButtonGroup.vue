<template>
  <div class="lea-button-group">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'lea-button-group',
  mounted () {
    for (const node of this.$el.children) {
      const nodeName = node.nodeName.toLowerCase()
      if (nodeName !== 'button') {
        console.warn(`lea-button-group 的子元素应该全是 lea-button， 但你写的是${nodeName}`)
      }
    }
  }
}
</script>

<style lang="scss">
@import '../styles/common.scss';
.lea-button-group{
  display: inline-flex;
  .lea-button{
    border-radius: 0;
    &:not(:first-child){
      margin-left: -1px;
    }
    &:first-child{
      border-top-left-radius: $border-radius;
      border-bottom-left-radius: $border-radius;
      border-right-color:rgba(255, 255, 255, .5);
    }
    &:last-child{
      border-top-right-radius: $border-radius;
      border-bottom-right-radius: $border-radius;
      border-left-color:rgba(255, 255, 255, .5);
    }
    &:not(:first-child):not(:last-child){
      border-right-color:rgba(255, 255, 255, .5);
      border-left-color:rgba(255, 255, 255, .5);
    }
  }
}
</style>
