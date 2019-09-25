<template>
  <div class="integral-convert-confirm">
    <div class="product-detail">
      <img :src="product.pic" alt="" class="pic">
      <div class="text">
        <div class="name">{{product.name}}</div>
        <div class="cost"><span class="red">{{product.score}}</span>积分</div>
      </div>
    </div>
    <div class="receive-info default-info" @click="selectAddress = index" :class="{active: index === selectAddress}" :key="item.id" v-for="(item, index) in receiveInfoList">
      <div class="flex-box">
        <div class="left">
          <span class="name">{{item.name}}</span>
          <span class="phone">{{item.phone}}</span>
        </div>
        <div class="change-address">
          <span class="tip" @click="toAddress">修改地址</span>
          <img src="../../assets/integral-mall/arrow@2x.png" alt="" class="arrow">
        </div>
      </div>
      <p class="address">{{item.address}}</p>
    </div>
    <div class="receive-info empty" @click="toAddress" v-if="receiveInfoList.length === 0">
      <div class="write-link">
        <span class="tip">请填写收货信息</span>
        <img src="../../assets/integral-mall/arrow@2x.png" alt="" class="arrow">
      </div>
    </div>
    <x-button class="confirm-btn" @click.native="createScoreOrder">立即兑换</x-button>
  </div>
</template>

<script>
  import { XButton } from 'vux'
  import {setupWebViewJavascriptBridge} from '@/common/jsbridge'

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
        receiveInfoList: [],
        selectAddress: 0
      }
    },
    methods: {
      toAddress () {
        setupWebViewJavascriptBridge((bridge) => {
          bridge.callHandler('toAddress', {}, function (res) {})
        })
      },
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
      getAddress () {
        this.$api.get('/Address/List').then(res => {
          if (res.data.length === 0) {
            this.receiveInfo = null
          } else {
            this.receiveInfoList = res.data.map((i, index) => {
              if (i.isDefault) {
                this.selectAddress = index
              }
              return {
               name: i.receiver,
               active: false,
               phone: i.phone,
               address: i.area + i.address
             }
            })
          }
        })
      },
      createScoreOrder () {
        if (this.receiveInfo === null) {
          this.$vux.toast.text('请选择收获地址')
          return
        }
        let that = this
        this.$vux.confirm.show({
          title: '本次兑换您需扣除' + this.product.score + '积分，是否继续兑换？',
          content: '',
          onConfirm  () {
            that.$api.post('/Order/CreateScoreOrder', {
              'userId': sessionStorage.getItem('userInfo').id,
              'commodityID': that.$route.query.id,
              'count': 1,
              'totalScore': that.product.score,
              'totalMoney': that.product.price,
              'remark': '',
              'address': that.receiveInfoList[that.selectAddress].address,
              'receiverName': that.receiveInfoList[that.selectAddress].name,
              'receiverPhone': that.receiveInfoList[that.selectAddress].phone
            }).then(res => {
              that.$vux.alert.show({
                title: '兑换成功',
                content: '点击确定将返回积分商城首页',
                onShow () {
                },
                onHide () {
                  that.$router.go(-2)
                  // setupWebViewJavascriptBridge((bridge) => {
                  //   bridge.callHandler('finish')
                  // })
                }
              })
            })
          },
          onCancel  () {
          }
        })
      }
    },
    created () {
      this.getAddress()
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
      position: relative;
      &.active {
        background-color: rgba(243, 125, 49, 0.1);
      }
      &.active:before {
        content: ' ';
        position: absolute;
        left: 0;
        top: 0;
        width: 0;
        height: 0;
        border-width: 0 15px 15px;
        border-style: solid;
        border-color: #F37D31 transparent transparent #F37D31;
      }
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
