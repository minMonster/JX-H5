<!-- crated：2019-07-28  author：Monster  -->
<template>
    <div class='qrcode'>
      <qriously class="code-img" :value="$route.query.codeUrl" :size="200" />
    </div>
</template>

<script>
import Vue from 'vue'
import VueQriously from 'vue-qriously'
Vue.use(VueQriously)
export default {
  name: 'qrcode'
}
</script>
<style rel="stylesheet/less" lang="less">

    @import "../../styles/index.less";

    .qrcode {
      .code-img {
        padding-top: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
</style>
