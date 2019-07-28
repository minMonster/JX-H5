<template>
  <div class="bankcard">
    <div class="card-pocket">
      <div class="card" v-for="item in bindMedium" :key="item.bindMedium">
        <div class="name">
          <img src="../../assets/gongshang-icon.jpeg" alt="">
          <span>工商银行</span>
        </div>
        <div class="nums">
          <span>****</span>
          <span>****</span>
          <span>****</span>
          <span>{{item.bind_medium.substring(item.bind_medium.length-4)}}</span>
        </div>
      </div>
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
    padding: .24rem .24rem;

    .weui-btn {
      position: fixed;
      bottom: .2rem;
      width: 7rem;
      left: .25rem;
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
    .name {
      display: flex;
      align-items: center;
      img {
        display: block;
        width: .6rem;
        height: .6rem;
        border-radius: .3rem;
        margin-right: .3rem;
      }
    }
    .card-pocket {
      flex: 1;
    }
    .card {
      color: #fff;
      font-size: .32rem;
      border-radius: .2rem;
      padding: .3rem .4rem;
      background: linear-gradient(left, #ff8165 , #ff3556);
      .nums {
        padding-top: .4rem;
        padding-left: .8rem;
        font-size: .4rem;
      }
    }
  }
</style>
