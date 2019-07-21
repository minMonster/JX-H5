<template>
  <div class="jufubao">
    <img src="../../assets/wallet/money_icon.png" alt="" class="icon">
    <span class="tip">我的余额</span>
    <div class="balance"><span class="big">{{balance}}</span><span class="small">元</span></div>
    <x-button class="bank-btn" :link="'/wallet/bankcard-verification'" v-if="!mediumId">开户</x-button>
    <x-button class="charge-btn" v-if="mediumId">充值</x-button>
    <x-button class="withdraw-btn" v-if="mediumId">提现</x-button>
  </div>
</template>

<script>
import { XButton } from 'vux'
export default {
  name: 'jufubao',
  components: {
    XButton
  },
  data: function () {
    return {
      balance: '0.00',
      mediumId: ''
    }
  },
  methods: {
    getAccountStatus () {
      this.$api.post('/Icbc/AppGetOpenAccountStatus', {
        userId: '13756325465'
      }).then(res => {
        console.log('success', res)
        let data = res.data
        if (data.mediumId) {
          this.mediumId = data.mediumId
          this.getAccountBalance()
        }
      }).catch(err => {
        if (err.code) {
          this.$vux.toast(err.message)
        } else {
          this.$vux.toast(err)
        }
      })
    },
    getAccountBalance () {
      this.$api.get('/Icbc/AccountBalanceQuery', {
        params: {
          mediumId: this.mediumId
        }
      }).then(res => {
        this.balance = res.data.accountBalance
      }).catch(e => {
        if (e.code) {
          this.$vux.toast(e.message)
        } else {
          this.$vux.toast(e)
        }
      })
    }
  },
  created () {
    this.getAccountStatus()
  }
}
</script>

<style rel="stylesheet/less" lang="less">
@import "../../styles/index.less";
@import "../../styles/variable";
  .jufubao {
    padding: .6rem .24rem .3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon {
      width: 1.5rem;
      height: 1.5rem;
      margin-bottom: .3rem;
    }

    .tip {
      font-size: .3rem;
      font-family: @FM;
      font-weight: 600;
      color: @T3;
      line-height: .3rem;
      margin-bottom: .48rem;
    }

    .balance {
      .big {
        font-size: .6rem;
        font-family: DINAlternate-Bold;
        font-weight: bold;
        color: @T1;
        line-height: .5rem;
        vertical-align: bottom;
        margin-right: .24rem;
      }

      .small {
        font-size: .46rem;
        font-family: PingFangSC-Semibold;
        font-weight: 400;
        line-height: .5rem;
      }
    }

    .weui-btn {
      height: .84rem;
      background: linear-gradient(178deg,rgba(74,180,254,1) 0%,rgba(27,141,246,1) 64%,rgba(6,123,248,1) 100%);
      border-radius: .99rem;
      &.weui-btn_default {
        box-shadow: none !important;
      }
    }

    .bank-btn, .charge-btn, .withdraw-btn {
      font-size: .28rem;
      font-family: @FM;
      font-weight: 600;
      line-height: .28rem;
      color: #fff !important;
      letter-spacing: .2rem;
      margin-top: 1.4rem;
    }

    .withdraw-btn {
      margin-top: .28rem;
    }
  }
</style>
