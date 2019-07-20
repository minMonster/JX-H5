<template>
  <div class="jufubao">
    <img src="../../assets/wallet/money_icon.png" alt="" class="icon">
    <span class="tip">我的余额</span>
    <div class="balance"><span class="big">{{balance}}</span><span class="small">元</span></div>
    <x-button class="bank-btn" :link="'/wallet/bankcard-verification'">开户</x-button>
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
      balance: '0.00'
    }
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

    .bank-btn {
      font-size: .28rem;
      font-family: @FM;
      font-weight: 600;
      line-height: .28rem;
      color: #fff !important;
      letter-spacing: .2rem;
      margin-top: 1.4rem;
    }
  }
</style>
