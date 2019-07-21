<template>
  <div class="wallet">
    <tab :line-width=3 active-color='#067BF8' default-color="#333333" bar-active-color="#067BF8">
      <tab-item :active-class="'active'" :selected="current===index" v-for="(item, index) in list" @click.native="current = index" :key="index">
        <img :src="item.pic" alt="" class="logo">
        <span class="name">{{item.name}}</span>
      </tab-item>
    </tab>
    <consumer-detail v-if="current===0"></consumer-detail>
    <jufubao v-if="current===1"></jufubao>
    <bankcard v-if="current===2"></bankcard>
  </div>
</template>

<script>
import Jufubao from './jufubao'
import ConsumerDetail from './consumer-detail'
import Bankcard from './bankcard'
import { Tab, TabItem } from 'vux'
export default {
  name: 'wallet',
  components: {
    Tab,
    TabItem,
    Jufubao,
    ConsumerDetail,
    Bankcard
  },
  data: function () {
    return {
      current: 0,
      list: [
        { name: '消费明细', pic: '' },
        { name: '莒蚨宝', pic: '' },
        { name: '银行卡', pic: ''}
      ]
    }
  },
  methods: {
  },
  created () {
  }
}
</script>

<style rel="stylesheet/less" lang="less">
@import "../../styles/index.less";
@import "../../styles/variable";
  .wallet {
    min-height: 100vh;
    display: flex;
    flex-direction: column;

    /*.vux-tab {*/
      /*background: linear-gradient(180deg, @C6 0%, @C1 100%);*/
    /*}*/

    .vux-tab-item {
      opacity: 0.65;
    }

    .active {
      opacity: 1;
    }

    .vux-swiper {
      height: auto !important;
    }
  }
</style>
