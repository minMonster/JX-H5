<!-- crated：2019-06-23  author：Monster  -->
<template>
  <div class='local-shop-detail'>
    <img :src="detail.pic" v-if="detail.pic" alt="" class="banner">
    <p class="title">商家简介</p>
    <div class="info" v-if="detail.name">
      <span class="label">商家名称</span>
      <span class="dec">{{detail.name}}</span>
    </div>
    <div class="info" v-if="detail.labels">
      <span class="label">商家标签</span>
      <span class="dec">{{detail.labels}}</span>
    </div>
    <div class="info" v-if="detail.address">
      <span class="label">商家地址</span>
      <span class="dec">{{detail.address}}</span>
    </div>
    <div class="info" v-if="detail.phone">
      <span class="label">联系电话</span>
      <span class="dec">{{detail.phone}}</span>
    </div>
    <div class="info" v-if="detail.serviceTime">
      <span class="label">服务时间</span>
      <span class="dec">{{detail.serviceTime}}</span>
    </div>
    <div class="info" v-if="detail.serviceScope">
      <span class="label">服务范围</span>
      <span class="dec">{{detail.serviceScope}}</span>
    </div>
    <div class="info content" v-if="detail.introduce">
      <span class="label">服务内容</span>
      <span class="dec">{{detail.introduce}}</span>
    </div>
    <x-button class="book" @click.native="show=true">联系商家</x-button>
    <confirm
      v-model="show"
      confirm-text="呼叫"
      @on-confirm="call"
    >
      <img src="../../assets/domestic-services-detail/tel_logo.png" alt="" class="tel-logo">
      <span class="tel">{{detail.phone}}</span>
    </confirm>
  </div>
</template>

<script>
  import { setupWebViewJavascriptBridge } from '@/common/jsbridge'
  import { XButton, Confirm } from 'vux'

  export default {
    name: 'local-shop-detail',
    components: {
      XButton,
      Confirm
    },
    data: function () {
      return {
        show: false,
        // detail: {
        //   name: '防盗门开锁',
        //   desc: '快速上门，110备案安全认证…',
        //   company: '快开开开锁公司',
        //   businessHours: '09:00-17:00'
        // },
        detail: {}
      };
    },
    methods: {
      call () {
        setupWebViewJavascriptBridge((bridge) => {
          bridge.callHandler('callPhone', {phone: this.detail.phone});
        });
      },
      getHouseServiceDetail () {
        this.$api.post('/LocalShop/Detail?id=' + this.$route.query.id).then(res => {
          this.detail = res.data;
        }).catch(e => {
          if (e.code) {
            this.$vux.toast(e.message);
          } else {
            this.$vux.toast(e);
          }
        });
      }
    },
    created () {
      this.getHouseServiceDetail();
    }
  };
</script>
<style rel="stylesheet/less" lang="less">

  @import "../../styles/index.less";
  @import "../../styles/variable";

  .local-shop-detail {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 0 .24rem;
    padding-bottom: 1.24rem;

    .banner {
      margin: .18rem 0;
      display: block;
      height: 4.73rem;
    }

    .title {
      color: #333333;
      font-weight: bold;
      font-size: .32rem;
      padding-bottom: .4rem;
    }

    .info {
      display: flex;
      padding-bottom: .24rem;
      font-size: .28rem;
      color: #353535;

      .label {
        width: 1.52rem;
        color: rgba(53, 53, 53, 1);
      }

      .dec {
        flex: 1;
      }
      &.content {
        flex-direction: column;
        .label {
          font-size: .32rem;
          font-weight: bold;
          padding-bottom: .2rem;
        }
      }
    }

    .weui-dialog {
      max-width: 7rem;
      width: 100%;
      margin: auto;
    }

    .weui-dialog__bd {
      display: flex;
      align-items: center;
      justify-content: center;

      &:first-child {
        padding: .44rem .2rem .36rem;
      }
    }

    .tel-logo {
      width: .4rem;
      margin-right: .06rem;
    }

    .tel {
      font-size: .32rem;
      font-family: @FM;
      font-weight: bold;
      color: @T1;
      line-height: .32rem;
    }

    .weui-dialog__ft {
      font-size: .32rem;
      font-family: @FM;
      font-weight: bold;
      color: #1B8DF6;

      &:after {
        left: .3rem;
        right: .3rem;
        border-top: .02rem solid @B7;
      }

      .weui-dialog__btn_default {
        color: #90959D;
      }
    }

    .weui-dialog__btn:after {
      top: .32rem;
      bottom: .3rem;
      border-left: .02rem solid @B7;
    }

    .weui-btn.book {
      position: fixed;
      bottom: .24rem;
      width: 7rem;
      height: .84rem;
      font-size: .32rem;
      font-family: @FM;
      font-weight: bold;
      color: @B2;
      line-height: .32rem;
      background-color: @C3;
      border-radius: .06rem;
      box-shadow: none;

      &:active {
        background-color: @C4 !important;
        color: @B2 !important;
      }
    }

  }
</style>
