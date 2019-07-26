<template>
  <div class="wallet" v-if="!loading">
    <tab :line-width=3 active-color='#067BF8' default-color="#333333" bar-active-color="#067BF8">
      <tab-item :active-class="'active'" :selected="current===index" v-for="(item, index) in list"
                @click.native="current = index" :key="index">
        <img :src="item.pic" alt="" class="logo">
        <span class="name">{{item.name}}</span>
      </tab-item>
    </tab>
    <consumer-detail :mediumId="mediumId" v-if="current===0"></consumer-detail>
    <jufubao :mediumId="mediumId" :balance="balance" :bindMedium="bindMedium" v-if="current===1"></jufubao>
    <bankcard :bindMedium="bindMedium" :mediumId="mediumId" v-if="current===2"></bankcard>
  </div>
</template>

<script>
import Jufubao from './jufubao';
import ConsumerDetail from './consumer-detail';
import Bankcard from './bankcard';
import { Tab, TabItem } from 'vux';
import Bus from './bus';

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
      current: 1,
      loading: true,
      list: [
        {name: '消费明细', pic: ''},
        {name: '莒蚨宝', pic: ''},
        {name: '银行卡', pic: ''}
      ],
      mediumId: '',
      bindMedium: [],
      balance: ''
    };
  },
  methods: {
    getAccountBalance () {
      this.$api.post('/Icbc/AccountBalanceQuery', {
        mediumId: this.mediumId
      }).then(res => {
        this.balance = res.data.accountBalance || 0;
      }).catch(e => {
        if (e.code) {
          this.$vux.toast(e.message);
        } else {
          this.$vux.toast(e);
        }
      });
    },
    getAccountStatus () {
      this.$api.get('/Icbc/AppGetOpenAccountStatus', {
        params: {
          userId: ''
        }
      }).then(res => {
        let data = res.data;
        if (res.success) {
          this.mediumId = data;
          this.$api.post('/Icbc/BindingQuery', {
            mediumId: data
          }).then(res => {
            if (res.data.length > 0) {
              this.bindMedium = res.data;
              this.loading = false;
              this.getAccountBalance();
            }
          });
        } else {
          this.loading = false;
        }
      }).catch(err => {
        if (err.code) {
          this.$vux.toast(err.message);
        } else {
          this.$vux.toast(err);
        }
      });
    }
  },
  created () {
    Bus.$on('getAccountBalance', () => {
      this.getAccountBalance();
    });
    this.getAccountStatus();
  }
};
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
