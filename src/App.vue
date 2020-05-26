<template>
  <div id="app">
    <h3>普通按钮</h3>
    <lea-button>默认按钮</lea-button>
    <lea-button type="primary">主要按钮</lea-button>
    <lea-button type="success">成功按钮</lea-button>
    <lea-button type="info">信息按钮</lea-button>
    <lea-button type="warning">警告按钮</lea-button>
    <lea-button type="danger">危险按钮</lea-button>
    <h3>带Icon按钮</h3>
    <lea-button type="success" icon="sousuo" icon-position="right">搜索</lea-button>
    <lea-button type="success" icon="sousuo">搜索</lea-button>
    <h3>加载中按钮</h3>
    <lea-button type="success" :loading="isLoading" @click="isLoading=!isLoading">加载中</lea-button>
    <h3>按钮组</h3>
    <lea-button-group />
    <h3>Icon</h3>
    <lea-icon name="eye" />
    <lea-icon name="loading" />
    <lea-icon name="sousuo" />
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      isLoading: true
    }
  }
}
</script>

<style lang="scss">
#app {
  padding: 30px;
  h3{
    padding: 20px 0;
  }
}
</style>
