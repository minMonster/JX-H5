<template>
  <div class="bankcard">
    <div class="card-pocket">
      <div class="card" v-for="item in bindMedium" :key="item.bindMedium">工商银行{{item.bind_medium}}</div>
    </div>
    <x-button class="add-card-btn" :link="mediumId?'/wallet/bankcard-verification?type=bind&mediumId=' + mediumId: '/wallet/bankcard-verification'">+&nbsp;&nbsp;添加银行卡</x-button>
  </div>
</template>

<script>
import { XButton } from 'vux'
export default {
  name: 'bankcard',
  components: {
    XButton
  },
  props: {
    bindMedium: {
      default: []
    },
    mediumId: {
      default: ''
    }
  },
  data: function () {
    return {
      isMediumId: false
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less">
@import "../../styles/index.less";
@import "../../styles/variable";
  .bankcard {
    padding: .46rem .24rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap-reverse;
    justify-content: space-between;
    align-items: center;

    .weui-btn {
      height: 0.94rem;
      border-radius: .18rem;
      &.weui-btn_default {
        box-shadow: none;
        background-color: @T4;
        &:active {
          background-color: #F5F6F8 !important;
        }
      }
    }

    .add-card-btn {
      font-size: .28rem;
      font-family: @FM;
      font-weight: 600;
      line-height: .28rem;
      color: @T3 !important;
    }
  }
</style>
