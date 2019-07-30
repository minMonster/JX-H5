<template>
  <div class="jufubao">
    <img src="../../assets/wallet/money_icon.png" alt="" class="icon">
    <span class="tip">我的余额</span>
    <div class="balance"><span class="big">{{balance/100}}</span><span class="small">元</span></div>
    <x-button class="bank-btn" :link="'/wallet/bankcard-verification'" v-if="!mediumId">开户</x-button>
    <x-button class="charge-btn" @click.native="toUp" v-if="mediumId">充值</x-button>
    <x-button class="withdraw-btn"
              @click.native="toDown"
              v-if="mediumId">提现
    </x-button>
  </div>
</template>

<script>
import { XButton } from 'vux'
export default {
  name: 'jufubao',
  components: {
    XButton
  },
  props: {
    balance: {
      default: ''
    },
    mediumId: {
      default: ''
    },
    bindMedium: {
      default: ''
    }
  },
  data: function () {
    return {
      // balance: '0.00',
      // mediumId: '',
      // bindMedium: ''
    }
  },
  methods: {
    toUp () {
      if (this.bindMedium === '') {
        this.$vux.toast.text('请先绑定银行卡')
      } else {
        this.$router.push({path: '/wallet/to-up', query: {mediumId: this.mediumId, bindMedium: this.bindMedium[0].bind_medium, type: 'to-up'}})
      }
    },
    toDown () {
      if (this.bindMedium === '') {
        this.$vux.toast.text('请先绑定银行卡')
      } else {
        this.$router.push({path: '/wallet/to-up', query: {mediumId: this.mediumId, bindMedium: this.bindMedium[0].bind_medium, type: 'to-down'}})
      }
    }
  },
  created () {
    // console.log(Bus.$emit('getMediumId'))
    // Bus.$emit('getMediumId', res => {
    //   this.mediumId = res;
    // })
    // this.getAccountStatus();
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
      background: linear-gradient(178deg, rgba(74, 180, 254, 1) 0%, rgba(27, 141, 246, 1) 64%, rgba(6, 123, 248, 1) 100%);
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
