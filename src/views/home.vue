<!-- crated：2019-07-12  author：Monster  -->
<template>
    <div class='home'>
        <group>
            <cell v-for="item in routerList" :key="item.id" :link="item.path" :title="item.meta">{{item.name}}</cell>
        </group>
    </div>
</template>

<script>
import Router from '@/router'
import { Group, Cell } from 'vux'

export default {
  name: 'home',
  components: {
    Group, Cell
  },
  data: function () {
    return {
      routerList: []
    }
  },
  created () {
    this.routerList = Router.options.routes
  }
}
</script>
<style rel="stylesheet/less" lang="less">

    @import "../styles/index.less";

    .home {
    }
</style>
