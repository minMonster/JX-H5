<template>
  <div class="bankcard-verification">
    <group>
      <x-input :title="cardNumber.title"
               :placeholder="cardNumber.placeholder"
               v-model="cardNumber.value"
               :show-clear="false"
      ></x-input>
    </group>
    <group :title="reminder">
      <x-input v-for="(item, index) of info" :key="index"
               :title="item.title"
               :placeholder="item.placeholder"
               v-model="item.value"
               :show-clear="false"
      ></x-input>
    </group>
    <div class="btn-container">
      <x-button class="bind-btn">确认绑定</x-button>
    </div>
    <p class="reminder">信息加密处理，仅用于银行验证及实名认证</p>
  </div>
</template>

<script>
import { Group, XInput, XButton } from 'vux'
export default {
  name: 'bankcard-verification',
  components: {
    Group,
    XInput,
    XButton
  },
  data: function () {
    return {
      reminder: '提醒：当前只支持绑定中国银行、农业银行、建设银行、交通银行、邮政储蓄银行、工商银行与持卡人信息一致的银行卡',
      cardNumber: {
        value: '',
        title: '卡号',
        placeholder: '请输入银行卡号'
      },
      info: [
        {
          value: '',
          title: '持卡人',
          placeholder: '持卡人姓名'
        },
        {
          value: '',
          title: '身份证',
          placeholder: '请输入证件号码'
        },
        {
          value: '',
          title: '手机号',
          placeholder: '银行预留手机号'
        },
        {
          value: '',
          title: '密码',
          placeholder: '请输入6位支付密码'
        }
      ]
    }
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/less" lang="less">
@import "../../styles/index.less";
@import "../../styles/variable";
  .bankcard-verification {
    height: 100vh;
    background-color: @B6;
    .vux-x-input {
      padding: .3rem;
      &::before {
        border: none;
      }
    }
    .weui-cells__title, .reminder {
      font-size: .24rem;
      font-family: @FR;
      font-weight: 400;
      color: @T3;
      line-height: .32rem;
      text-align: justify;
      margin: 0;
      padding: .2rem .24rem .24rem;
    }
    .weui-label {
      width: .88rem !important;
      text-align: justify;
      text-align-last: justify;
      margin-right: .6rem;
      font-size: .28rem;
      font-family: @FM;
      font-weight: 600;
      line-height: .28rem;
      color: @T1;
    }
    .weui-input {
      font-size: .28rem;
      font-family: @FR;
      font-weight: 400;
      color: @T2;
      line-height: .28rem;
      &::placeholder {
        color: @T3;
      }
    }
    .weui-cells {
      margin-top: 0;
      &::before {
        border: none;
      }
      &::after {
        border: none;
      }
    }
    .btn-container {
      padding: 0 .24rem;
      margin: .6rem 0 .2rem;
    }
    .weui-btn {
      height: .84rem;
      background: linear-gradient(178deg,rgba(74,180,254,1) 0%,rgba(27,141,246,1) 64%,rgba(6,123,248,1) 100%);
      border-radius: .99rem;
    }
    .bind-btn {
      font-size: .28rem;
      font-family: @FM;
      font-weight: 600;
      line-height: .28rem;
      color: #fff !important;
    }
    .reminder {
      text-align: center;
      padding: 0;
    }
  }
</style>
