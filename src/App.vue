<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'app',
  created () {
    this.$api.get('/UserInfo/GetUserInfo').then(res => {
      sessionStorage.setItem('userInfo', JSON.stringify(res.data))
    })
  }
}
</script>
<style lang="less">
  @import "./styles/index";
</style>
