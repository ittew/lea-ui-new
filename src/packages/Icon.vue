<template>
  <svg class="lea-icon">
    <use :xlink:href="`#icon-${name}`"></use>
  </svg>
</template>

<script>
import '../styles/icon.js'
export default {
  name: 'lea-icon',
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
@import '../styles/common.scss';
.lea-icon{
  width: 1.2em;
  height: 1.2em;
}
</style>
