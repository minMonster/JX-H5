<template>
  <div class="immediate-pay">
    <div class="coupon">
      <div class="coupon-top">
        <span class="address">{{$route.query.roomName}}</span>
        <div class="price">
          <span class="small symbol">¥</span>
          <span class="big">{{$route.query.numMoney}}</span>
          <!--                    <span class="small decimal">.00</span>-->
        </div>
        <!--                <span class="company">物业公司：{{$route.query.roomName}}</span>-->
      </div>
      <div class="coupon-bottom">
        <p class="tip">支付方式</p>
        <div class="selection" v-for="(item, index) in selections" :key="index" @click="current=index">
          <div class="left">
            <img :src="item.logo" alt="" class="logo">
            <span class="pay-type">{{item.name}}</span>
          </div>
          <div class="right">
            <img src="../../assets/immediate-pay/checked.png" alt="" class="checkbox checked" v-if="current==index">
            <img src="../../assets/immediate-pay/unchecked.png" alt="" class="checkbox unchecked" v-else>
          </div>
        </div>
      </div>
    </div>
    <x-button class="pay-btn" @click.native="pay">立即支付</x-button>
  </div>
</template>

<script>
import { XButton } from 'vux'
import * as auth from '@/common/auth'
import { setupWebViewJavascriptBridge } from '@/common/jsbridge'

export default {
  name: 'immediate-pay',
  components: {XButton},
  data: function () {
    return {
      current: 0,
      info: {
        address: '仪琳雅竹小区4号楼3单元301',
        price: 288,
        company: '欣欣物业'
      },
      selections: [
        {name: '微信', logo: require('../../assets/immediate-pay/logo_1_weixin.png')},
        {name: '支付宝', logo: require('../../assets/immediate-pay/logo_2_zhifubao.png')},
        {name: '莒蚨宝', logo: require('../../assets/immediate-pay/logo_3_jufubao.png')}
      ]
    }
  },
  methods: {
    pay () {
      if (this.current === 1) {
        this.$api.post('/HouseManage/DoPayAndroid?payType=ZFB&orderId=' +
            this.$route.query.orderId +
            '&companyId=' +
            this.$route.query.companyId +
            '&dbName=' +
            this.$route.query.dbName +
            '&token=' +
            auth.getToken()
        ).then(res => {
          if (res.success) {
            let that = this
            setupWebViewJavascriptBridge((bridge) => {
              bridge.callHandler('payment', {payType: 1, orderInfo: res.aliParam}, function (res) {
                that.$vux.toast.text('支付成功')
              })
            })
          }
        })
      }
      if (this.current === 2) {
        this.$api.post('/HouseManage/AppAccountTransfer', {
          orderId: this.$route.query.orderId,
          dbName: this.$route.query.dbName,
          token: auth.getToken()
        }).then(res => {
          if (res.success) {
            this.$vux.toast.text('支付成功')
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
  @import "../../styles/variable";

  .immediate-pay {
    background-color: #F5F6F8;
    padding: .26rem .24rem .3rem;
    min-height: 100vh;

    .coupon {
      background-color: #F5F6F8;
      padding: 0 .24rem;
      background-image: radial-gradient(circle at .08rem 2.40rem, transparent .08rem, #fff 0, #fff 0, #fff 100%);
      background-position: -0.08rem .08rem;
      background-size: 100% 100%;
      margin-bottom: .6rem;

      .coupon-top {
        height: 2.50rem;
        padding-top: .4rem;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;

        &::after {
          position: absolute;
          content: '';
          bottom: 0;
          left: -.08rem;
          right: -.08rem;
          height: .02rem;
          background-image: linear-gradient(to right, @T6 0%, @T6 50%, transparent 50%);
          background-size: .15rem .02rem;
          background-repeat: repeat-x;
        }

        .address {
          font-size: .24rem;
          font-family: @FM;
          font-weight: 600;
          color: #595961;
          line-height: .24rem;
          margin-bottom: .3rem;
        }

        .price {
          .small {
            font-size: .30rem;
            color: @T1;
            line-height: .3rem;
          }

          .symbol {
            font-family: DINAlternate-Bold;
            font-weight: bold;
          }

          .decimal {
            font-family: PingFangSC-Semibold;
            font-weight: 600;
          }

          .big {
            font-size: .84rem;
            font-family: DINAlternate-Bold;
            font-weight: bold;
            color: @T1;
            line-height: .84rem;
          }
        }

        .company {
          font-size: .24rem;
          font-family: @FM;
          font-weight: 600;
          color: #595961;
          line-height: .24rem;
          margin-top: .22rem;
        }
      }

      .coupon-bottom {
        padding: .28rem 0 .42rem;

        .tip {
          font-size: .24rem;
          font-family: @FM;
          font-weight: 600;
          color: #595961;
          line-height: .24rem;
          margin-bottom: .36rem;
        }

        .selection {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: .46rem;

          &:last-child {
            margin-bottom: 0;
          }

          .left {
            display: flex;
            align-items: center;

            .logo {
              width: .32rem;
              height: .32rem;
              margin-right: .16rem;
            }

            .pay-type {
              font-size: .28rem;
              font-family: @FM;
              font-weight: 600;
              color: #595961;
              line-height: .28rem;
            }
          }

          .right {
            .checkbox {
              width: .24rem;
              height: .24rem;
            }

            .checked {

            }
          }
        }
      }
    }

    .weui-btn {
      height: .84rem;
      background: linear-gradient(178deg, rgba(74, 180, 254, 1) 0%, rgba(27, 141, 246, 1) 64%, rgba(6, 123, 248, 1) 100%);
      border-radius: .06rem;

      &.weui-btn_default {
        box-shadow: none;
      }
    }

    .pay-btn {
      font-size: .28rem;
      font-family: @FM;
      font-weight: 600;
      line-height: .28rem;
      color: #fff !important;
    }
  }

</style>
