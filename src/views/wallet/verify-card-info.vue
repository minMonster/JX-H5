<!-- crated：2019-07-21  author：Monster  -->
<template>
  <div class="bankcard-verification">
    <group :title="'已将验证码发送至：' + phone">
      <x-input type="tel" :placeholder="cardNumber.placeholder"
               v-model="cardNumber.value"
               :show-clear="false"
      ></x-input>
      <div @click="startInterval"  :class="{'disabled': !disable || isOne}" class="reset-code">
        {{codeText}}
      </div>
    </group>
    <div class="btn-container">
      <x-button class="bind-btn" :disabled="cardNumber.value.length !== 6" @click.native="checkCode">验证</x-button>
    </div>
  </div>
</template>

<script>
  import { Group, XInput, XButton } from 'vux';

  export default {
    name: 'bankcard-verification',
    components: {
      Group,
      XInput,
      XButton
    },
    data: function () {
      return {
        mediumId: '',
        codeText: '60s',
        codeInterval: null,
        codeNum: 60,
        phone: '',
        disable: true,
        isOne: true,
        cardNumber: {
          value: '',
          placeholder: '请输入验证码'
        }
      };
    },
    methods: {
      checkCode () {
        this.$api.post('/Icbc/AccountSCodeVerify', {
          smsSendNo: this.$route.query.smsSendNo,
          corpSerno: this.$route.query.corpSerno,
          userId: ''
        }).then(res => {
          if (res.message === '上送的户名与系统记录的户名不一致') {
            this.$vux.toast.text('手机号与银行预留手机号不一致')
          } else {
            this.$vux.toast.text('开户成功');
            this.$router.push({path: '/wallet'});
          }
        })
      },
      startInterval () {
        let that = this;
        if (!this.disable) return;
        if(!this.isOne) {
          this.$api.post('/Icbc/AccountSCodeSend', {
            userId: '',
            corpSerno: this.$route.query.corpSerno
          })
        }
        this.codeInterval = setInterval(function () {
          that.disable = false;
          if (that.codeNum < 1) {
            that.codeText = '重新获取';
            that.codeNum = 60;
            that.disable = true;
            that.isOne = false;
            clearInterval(that.codeInterval);
          } else {
            that.codeNum--;
            that.codeText = that.codeNum + 's';
          }
        }, 1000);
      }
    },
    created () {
      this.phone = this.$route.query.phone;
      this.startInterval();
    }
  };
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

      position: relative;

      .reset-code {
        position: absolute;
        width: 1.6rem;
        right: .3rem;
        top: 50%;
        margin-top: -.3rem;
        text-align: center;
        font-size: .26rem;
        line-height: .6rem;
        height: .6rem;
        color: #fff;
        background: linear-gradient(left, #4AB4FE, #067BF8);
        &.disabled {
          color: #2b2b2b;
          background: #ebebeb;
        }
      }
    }

    .btn-container {
      padding: 0 .24rem;
      margin: .6rem 0 .2rem;
    }

    .weui-btn {
      height: .84rem;
      border-radius: .99rem;
    }

    .bind-btn {
      font-size: .28rem;
      font-family: @FM;
      font-weight: 600;
      line-height: .28rem;
      color: #fff !important;
      background: linear-gradient(left, #4AB4FE, #067BF8);
      &:disabled {
        background: #ebebeb;
      }
    }
  }
</style>
