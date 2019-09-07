<template>
  <div class="integral-convert-confirm">
    <div class="product-detail">
      <img :src="product.pic" alt="" class="pic">
      <div class="text">
        <div class="name">{{product.name}}</div>
        <div class="cost"><span class="red">-{{product.score}}</span>积分</div>
      </div>
    </div>
    <div class="receive-info default-info" v-if="receiveInfo">
      <div class="flex-box">
        <div class="left">
          <span class="name">{{receiveInfo.name}}</span>
          <span class="phone">{{receiveInfo.phone}}</span>
        </div>
        <div class="change-address">
          <span class="tip">更改地址</span>
          <img src="../../assets/integral-mall/arrow@2x.png" alt="" class="arrow">
        </div>
      </div>
      <p class="address">{{receiveInfo.address}}</p>
    </div>
    <div class="receive-info empty" v-else>
      <div class="write-link">
        <span class="tip">请填写收货信息</span>
        <img src="../../assets/integral-mall/arrow@2x.png" alt="" class="arrow">
      </div>
    </div>
    <x-button class="confirm-btn">确定</x-button>
  </div>
</template>

<script>
  import { XButton } from 'vux'
  export default {
    name: 'integral-convert-confirm',
    components: {
      XButton
    },
    data: function () {
      return {
        product: {
          // name: '山东烟台大苹果',
          // cost: 4000,
          // pic: require('../../assets/integral-mall/integral-product@2x.png')
        },
        receiveInfo: {
          name: '华联百货',
          phone: '18709890754',
          address: '山东省 日照市 莒县烟台中路一号713'
        }
      }
    },
    methods: {
      getCommodityInfo () {
        this.$api.get('/Commodity/' + this.$route.query.id).then(res => {
          this.product = res.data
        }).catch(err => {
          if (err.code) {
            this.$vux.toast(err.message)
          } else {
            this.$vux.toast(err)
          }
        })
      },
      getReceiveInfo () {
      
      }
    },
    created () {
      this.getCommodityInfo()
    }
  }
</script>

<style rel="stylesheet/less" lang="less">
  @import "../../styles/variable";
  @import "../../styles/index";

  .integral-convert-confirm {
    min-height: 100vh;
    background-color: @B7;
    padding-top: .26rem;

    .product-detail {
      height: 2.48rem;
      background-color: #fff;
      padding: .24rem;
      display: flex;
      margin-bottom: .12rem;

      .pic {
        width: 2rem;
        height: 2rem;
        margin-right: .36rem;
        border-radius: .06rem;
      }

      .text {
        padding-top: .2rem;
        .name {
          width: 4rem;
          font-size: .36rem;
          font-family: @FM;
          font-weight: 600;
          color: @T1;
          margin-bottom: .24rem;
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }

        .cost {
          font-size: .2rem;
          font-family: @FR;
          font-weight: 400;
          color: @T3;

          .red {
            font-size: .32rem;
            font-family: @FM;
            font-weight: 600;
            color: @C4;
            vertical-align: bottom;
            margin-right: 2px;
            margin-left: .1rem;
          }
        }
      }
    }

    .receive-info {
      padding: 0 .24rem;
      background-color: #fff;
      margin-bottom: .4rem;
    }

    .empty {
      height: 1.08rem;
      display: flex;
      align-items: center;

      .write-link {
        display: flex;
        align-items: center;
        padding: .24rem 1rem .24rem .24rem;

        .tip {
          font-size: .28rem;
          font-family: @FR;
          font-weight: 600;
          color: @C3;
          margin-right: .1rem;
        }

        .arrow {
          width: .18rem;
        }
      }
    }

    .default-info {
      height: 1.74rem;
      padding: .4rem .24rem .4rem .64rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .flex-box {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
          display: flex;
          align-items: flex-end;

          .name {
            max-width: 2rem;
            font-size: .28rem;
            font-family: @FM;
            font-weight: 600;
            color: @T1;
            margin-right: .3rem;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
          }

          .phone {
            font-size: .24rem;
            font-family: @FR;
            font-weight: 400;
            color: @T3;
          }
        }

        .change-address {
          display: flex;
          align-items: center;

          .tip {
            font-size: .28rem;
            font-family: @FM;
            font-weight: 600;
            color: @C3;
            margin-right: .2rem;
          }

          .arrow {
            width: .18rem;
          }
        }
      }

      .address {
        font-size: .24rem;
        font-family: @FR;
        font-weight: 400;
        color: @T1;
        margin-right: .4rem;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }
    }

    .weui-btn {
      width: 7rem;
      height: .84rem;
      margin: 0 auto;
      border-radius: .04rem;
      &:active {
        background-color: @C3 !important;
        color: #FFFFFF !important;
      }
    }

    .confirm-btn {
      font-size: .32rem;
      font-family: @FM;
      font-weight: 600;
      color: #FFFFFF !important;
      background-color: @C3 !important;
    }
  }
</style>
