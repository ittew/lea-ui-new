<template>
  <button class="lea-button" :class="btnClass">
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
    }
  },
  computed: {
    btnClass () {
      let classes = []
      this.type && classes.push(`lea-button-${this.type}`)
      return classes
    }
  },
  created () {
    console.log(this.$slots.default)
  }
}
</script>

<style lang="scss" scoped>

</style>
