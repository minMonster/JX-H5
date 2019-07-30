<!-- crated：2019-07-22  author：Monster  -->
<template>
  <div class='to-up'>
    <div class="up-card">
      <div class="select-cards">
        <div class="label">储蓄卡</div>
        <div class="check-card">
          <p class="card-type"><img src="../../assets/gongshang-icon.jpeg" alt="">工商银行（{{smallBindMedium}}）</p>
          <p class="tip">单日交易额¥2000000.00</p>
        </div>
      </div>
      <div class="select-cards">
        <div class="label">充值金额</div>
      </div>
      <div class="card-num-inputs">
        <sleep-x-input @on-click-clear-icon="payOptions.amount = ''" type="number" label-width="1"
                       v-model="payOptions.amount"
                       title="¥"></sleep-x-input>
      </div>
      <div class="buttons">
        <x-button @click.native="paySuumit">下一步</x-button>
      </div>
    </div>
    <jx-dialog class="dialog-to-up" @handleOk="submit" @handleNo="showDialog = false" v-model="showDialog">
      <div slot="content">
        <div class="check-card">
          <p class="card-type"><img src="../../assets/gongshang-icon.jpeg" alt="">工商银行（{{smallBindMedium}}）</p>
          <p class="tip">单日交易额¥2000000.00</p>
        </div>
        <sleep-x-input type="password" @on-click-clear-icon="payOptions.password = ''" placeholder="请输入6位交易密码"
                       label-width="1" v-model="payOptions.password"></sleep-x-input>
      </div>
    </jx-dialog>
  </div>
</template>

<script>
import SleepXInput from '@/components/input/sleep-x-input.vue'
import { XButton, TransferDomDirective as TransferDom, XDialog } from 'vux'
import JxDialog from '@/components/jx-dialog'

export default {
  name: 'to-up',
  components: {
    SleepXInput, XButton, XDialog, JxDialog
  },
  directives: {
    TransferDom
  },
  data: function () {
    return {
      showDialog: false,
      passwordMoney: '',
      type: 'to-up',
      payOptions: {
        mediumId: '',
        bindMedium: '',
        password: '',
        userId: '',
        amount: 0
      }
    }
  },
  computed: {
    smallBindMedium () {
      let a = this.payOptions.bindMedium
      return a.substr(a.length - 4)
    }
  },
  created () {
    this.payOptions = {
      mediumId: this.$route.query.mediumId,
      bindMedium: this.$route.query.bindMedium,
      password: this.passwordMoney,
      userId: '',
      amount: 0
    }
    this.type = this.$route.query.type
    if (this.type === 'to-up') {
      document.title = '充值'
    } else {
      document.title = '提现'
    }
  },
  methods: {
    paySuumit () {
      if (Number(this.payOptions.amount) > 0) {
        this.showDialog = true
      }
    },
    submit () {
      if (this.payOptions.password.length < 6) {
        this.$vux.toast.text('请输入6位交易密码')
        return
      }
      let amount = this.payOptions.amount * 100
      if (this.type === 'to-down') {
        this.$api.post('/Icbc/accountWithdraw', {...this.payOptions, amount: amount}).then(res => {
          if (res.success) {
            this.$vux.toast.text('提现成功')
            this.showDialog = false
            this.$router.push({path: '/wallet'})
          } else {
            this.$vux.toast.text(res.message)
          }
        })
      } else {
        this.$api.post('/Icbc/AccountRecharge', {...this.payOptions, amount: amount}).then(res => {
          if (res.success) {
            this.$vux.toast.text('充值成功')
            this.showDialog = false
            this.$router.push({path: '/wallet'})
          } else {
            this.$vux.toast.text(res.message)
          }
        })
      }
    }
  }
}
</script>
<style rel="stylesheet/less" lang="less">

  @import "../../styles/index.less";
  @import '~vux/src/styles/close';

  .to-up {
    padding-top: .2rem;
    background-color: #F3F5F6;
    height: 100vh;

    .up-card {
      border-radius: .3rem;
      padding: .3rem;
      margin: .2rem;
      background-color: #fff;

      .card-num-inputs {
        padding-bottom: .3rem;
        border-bottom: 1px solid #F3F5F6;
        margin-bottom: .5rem;

        .vux-x-input {
          padding: 0;
          font-size: .5rem;
          font-weight: 600;

          .weui-label {
            width: .4rem;
            overflow: hidden;
          }
        }
      }

      .buttons {
        button {
          height: .84rem;
          background: linear-gradient(178deg, rgba(74, 180, 254, 1) 0%, rgba(27, 141, 246, 1) 64%, rgba(6, 123, 248, 1) 100%);
          border-radius: .99rem;
          color: #fff;
        }
      }

      .select-cards {
        display: flex;

        .label {
          font-size: .3rem;
          width: 2rem;
        }

        margin-bottom: .3rem;

        .check-card {
          flex: 1;
          position: relative;

          .card-type {
            display: flex;
            align-content: center;
            padding-bottom: .1rem;

            img {
              width: .3rem;
              height: .3rem;
              margin-right: .2rem;
            }
          }

          &:before {
            /*content: " ";*/
            display: inline-block;
            height: 6px;
            width: 6px;
            border-width: 2px 2px 0 0;
            border-color: #c8c8cd;
            border-style: solid;
            -webkit-transform: matrix(.71, .71, -.71, .71, 0, 0);
            transform: matrix(.71, .71, -.71, .71, 0, 0);
            position: relative;
            top: -2px;
            position: absolute;
            top: 50%;
            margin-top: -4px;
            right: 2px;
          }
        }
      }
    }
  }

  .dialog-to-up {
    button.weui-btn.weui-btn_primary {
      background: linear-gradient(178deg, #4ab4fe 0%, #1b8df6 64%, #067bf8 100%);
    }

    button.weui-btn.weui-btn_default {
      font-size: #067bf8;
    }

    .vux-x-input {
      font-size: .3rem;
      padding-top: .6rem;
      padding-bottom: .6rem;
    }

    .weui-dialog {
      padding-top: .4rem !important;
    }

    .check-card {
      flex: 1;
      position: relative;
      padding: .2rem .3rem;

      .tip {
        text-align: left;
      }

      .card-type {
        display: flex;
        align-content: center;
        padding-bottom: .1rem;

        img {
          width: .3rem;
          height: .3rem;
          margin-right: .2rem;
        }
      }

      &:before {
        /*content: " ";*/
        display: inline-block;
        height: 6px;
        width: 6px;
        border-width: 2px 2px 0 0;
        border-color: #c8c8cd;
        border-style: solid;
        -webkit-transform: matrix(.71, .71, -.71, .71, 0, 0);
        transform: matrix(.71, .71, -.71, .71, 0, 0);
        position: absolute;
        top: 50%;
        margin-top: -4px;
        right: .3rem;
      }
    }
  }

</style>
