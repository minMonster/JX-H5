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
      <x-input v-if="item.none" v-for="(item, index) of info" :key="index"
               :title="item.title"
               :placeholder="item.placeholder"
               v-model="item.value"
               :show-clear="false"
      ></x-input>
    </group>
    <div class="btn-container">
      <x-button class="bind-btn" @click.native="accountOpen">确认绑定</x-button>
    </div>
    <p class="reminder">信息加密处理，仅用于银行验证及实名认证</p>
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
        reminder: '提醒：当前只支持绑定中国银行、农业银行、建设银行、交通银行、邮政储蓄银行、工商银行与持卡人信息一致的银行卡',
        fromMyBankcard: false,
        type: 'bind',
        cardNumber: {
          value: '6222034000012347971',
          title: '卡号',
          placeholder: '请输入银行卡号'
        },
        info: [
          {
            value: '李轩',
            title: '持卡人',
            placeholder: '持卡人姓名',
            none: true
          },
          {
            value: '132825199506290010',
            title: '身份证',
            placeholder: '请输入证件号码',
            none: true
          },
          {
            value: '15075653544',
            title: '手机号',
            placeholder: '银行预留手机号',
            none: true
          },
          {
            value: '597080',
            title: '密码',
            placeholder: '请输入6位支付密码',
            none: true
          }
        ]
      };
    },
    methods: {
      accountOpen () {
        if (this.cardNumber.value === '') {
          this.$vux.toast.text('请输入银行卡号');
          return;
        }
        if (this.info[0].value === '') {
          this.$vux.toast.text('请输入持卡人姓名');
          return;
        }
        if (this.info[1].value === '') {
          this.$vux.toast.text('请输入身份证号');
          return;
        }
        if (this.info[2].value === '') {
          this.$vux.toast.text('请输入手机号');
          return;
        }
        let params = {};
        let url = '/Icbc/AccountBinding';
        if (this.type !== 'bind') {
          if (this.info[3].value === '') {
            this.$vux.toast.text('请输入6位支付密码');
            return;
          }
          params = {
            bind_medium: this.cardNumber.value,
            cust_name: this.info[0].value,
            cert_no: this.info[1].value,
            mobile_no: this.info[2].value,
            userId: ''
          };
          params.password = this.info[3].value;
          url = '/Icbc/AccountOpen';
        } else {
          params = {
            bindMedium: this.cardNumber.value,
            custName: this.info[0].value,
            certNo: this.info[1].value,
            mobileNo: this.info[2].value,
            userId: '',
            mediumId: this.$route.query.mediumId
          };
        }

        this.$api.post(url, {...params}).then(res => {
          if (!res.data.corpSerno) {
            this.$vux.toast.text('参数错误，请检查您填写的信息');
          } else {
            this.$router.push({
              path: '/wallet/verify-card-info', query: {
                phone: this.info[2].value,
                corpSerno: res.data.corpSerno,
                smsSendNo: res.data.smsSendNo
              }
            });
          }
        });
      },
      addCardVerify () {
        this.$api.post('/Icbc/AccountBinding', {
          mediumId: this.mediumId,
          bindMedium: this.cardNumber.value,
          custName: this.info[0].value,
          certNo: this.info[1].value,
          mobileNo: this.info[2].value,
          userId: this.cardNumber.value
        });
      }
    },
    created () {
      this.type = this.$route.query.type;
      if (this.type === 'bind') {
        this.info[3].none = false;
      }
      // 判断本页面是点击【开户】还是点击【添加银行卡】进来的（不知道该怎么判断）
      // 若为前者，不做操作；否则，将 fromMyBankcard 设为 true
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
    }

    .btn-container {
      padding: 0 .24rem;
      margin: .6rem 0 .2rem;
    }

    .weui-btn {
      height: .84rem;
      background: linear-gradient(178deg, rgba(74, 180, 254, 1) 0%, rgba(27, 141, 246, 1) 64%, rgba(6, 123, 248, 1) 100%);
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
