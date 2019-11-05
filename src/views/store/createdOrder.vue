<template>
  <div class="created-order">
    <div style="margin: .2rem;padding-top: .2rem;margin-top: 0;">
      <div class="stop-name">{{product.shopName}} <span v-if="product.deliveryType === 1 || product.deliveryType === 3">起送价：{{product.deliveryMinAmount}}</span></div>
      <div class="product-detail" v-for="item in product.shoppingItems" :key="item.id">
        <img :src="item.pic" alt="" class="pic">
        <div class="text">
          <div class="name">{{item.name}}</div>
          <div class="cost">单价：<span class="red">{{item.price}}</span>元</div>
          <div class="cost">数量：<span class="red">{{item.amount}}</span></div>
        </div>
      </div>
<!--      <div class="receive-info default-info" @click="selectAddress = index" :class="{active: index === selectAddress}" :key="item.id" v-for="(item, index) in receiveInfoList">-->
<!--        <div class="flex-box">-->
<!--          <div class="left">-->
<!--            <span class="name">{{item.name}}</span>-->
<!--            <span class="phone">{{item.phone}}</span>-->
<!--          </div>-->
<!--          <div class="change-address">-->
<!--            <span class="tip" @click="toAddress">修改地址</span>-->
<!--            <img src="../../assets/integral-mall/arrow@2x.png" alt="" class="arrow">-->
<!--          </div>-->
<!--        </div>-->
<!--        <p class="address">{{item.address}}</p>-->
<!--      </div>-->
    </div>
    <div class="receive-info empty" @click="toAddress" v-if="receiveInfoList.length === 0">
      <div class="write-link">
        <span class="tip">请填写收货信息</span>
        <img src="../../assets/integral-mall/arrow@2x.png" alt="" class="arrow">
      </div>
    </div>
    <group>
      <popup-picker :title="'配送方式'" :columns='1' show-name :data="dataList" v-model="value2" :placeholder="'选择'"
                    @on-change="pickerChange2"></popup-picker>
<!--      <sleep-x-input title="标题" v-model="titleInfo"></sleep-x-input>-->
    </group>
    <group v-if="receiveInfoList.length !== 0">
    <popup-radio v-if="receiveInfoList.length !== 0" class="asdfasdf" @on-hide="radioOnHide" title="选择收获地址" :options="receiveInfoList.map((i, index) => {return {key: index, value: i.address}})" v-model="selectAddress">
      <p slot="popup-header" class="vux-1px-b demo3-slot">请选择收获地址</p>
      <template slot-scope="props" slot="each-item"><!-- use scope="props" when vue < 2.5.0 -->
        <div  class="created-order-popup-radio" >
        <div class="receive-info default-info" @click="selectAddress = index">
          <div class="flex-box">
            <div class="left">
              <span class="name">{{receiveInfoList[props.index].name}}</span>
              <span class="phone">{{receiveInfoList[props.index].phone}}</span>
            </div>
            <div class="change-address">
              <span class="tip" @click="toAddress">修改地址</span>
              <img src="../../assets/integral-mall/arrow@2x.png" alt="" class="arrow">
            </div>
          </div>
          <p class="address">{{receiveInfoList[props.index].address}}</p>
        </div>
        </div>
      </template>
    </popup-radio>
    </group>
    <x-button class="confirm-btn" @click.native="createScoreOrder">创建订单</x-button>
  </div>
</template>

<script>
  import { XButton, PopupRadio, Group, PopupPicker } from 'vux'
  import {setupWebViewJavascriptBridge} from '@/common/jsbridge'
  export default {
    name: 'integral-convert-confirm',
    components: {
      XButton,
      PopupRadio,
      Group,
      PopupPicker
    },
    data: function () {
      return {
        dataList: [],
        value2: [],
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
      radioOnHide (e) {
        console.log(e)
      },
      toAddress () {
        setupWebViewJavascriptBridge((bridge) => {
          bridge.callHandler('toAddress', {}, function (res) {})
        })
      },
      getCommodityInfo () {
        this.product = JSON.parse(localStorage.getItem('goods'))
        if (this.product.deliveryType === 1) {
          this.dataList = [{name: '配送', value: '1'}]
        }
        if (this.product.deliveryType === 2) {
          this.dataList = [{name: '自取', value: '2'}]
        }
        if (this.product.deliveryType === 3) {
          this.dataList = [{name: '配送', value: '1'}, {name: '自取', value: '2'}]
        }
        if (this.product.deliveryType === 0) {
          this.dataList = [{name: '配送', value: '1'}, {name: '自取', value: '2'}]
        }
        this.value2 = [this.dataList[0].value]
      },
      pickerChange2 () {},
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
          title: '创建订单',
          content: '',
          onConfirm  () {
            let ids = that.product.shoppingItems.map(i => {
              return i.id
            })
            let totalMoney = 0
            if (that.value2[0] === '1') {
              if (that.product > that.product.deliveryFreeAmount) {
                totalMoney = that.product.totalMoney
              } else {
                totalMoney = Number(that.product.totalMoney) + Number(that.product.deliveryFee)
              }
            } else {
              totalMoney = that.product.totalMoney
            }
            let deliveryFee = that.product > that.product.deliveryFreeAmount? 0: Number(that.product.deliveryFee)
            if (that.value2[0] === '2') {
              deliveryFee = 0
            }
            that.$api.post('/Order/CreateShopOrder', {
              'shoppingCarId': ids,
              'shopId': that.product.shopId,
              'totalScore': 0,
              'remark': '',
              totalMoney: totalMoney,
              deliveryFee: deliveryFee,
              'address': that.receiveInfoList[that.selectAddress].address,
              'receiverName': that.receiveInfoList[that.selectAddress].name,
              'receiverPhone': that.receiveInfoList[that.selectAddress].phone,
              deliveryType: that.value2[0]
            }).then(res => {
              that.$router.replace({path: 'store-order',
query: {
                          goodName: that.product.shopName,
                          goodMoney: totalMoney,
                          orderId: res.data.orderID
              }})
            }).catch(e => {
              that.$vux.toast.text(e.message)
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

<style rel="stylesheet/less" type="text/less" lang="less">
  @import "../../styles/variable";
  @import "../../styles/index";

  .created-order {
    min-height: 100vh;
    background-color: @B7;

    .stop-name {
      width: 100vw;
      height: .6rem;
      padding-left: .2rem;
      font-size: .32rem;
      background-color: #fff;
      line-height: .6rem;
      margin-bottom: 1px;
    }

    .product-detail {
      height: 2.48rem;
      background-color: #fff;
      padding: .24rem;
      display: flex;

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
      margin-top: .2rem;
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
      margin-top: .4rem;
      margin-bottom: .4rem;
      background-color: @C3 !important;
    }
  }
  .created-order-popup-radio {
    .default-info {
      height: 1.24rem;
      width: 6.4rem;
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
    .receive-info {
      padding: 0 .24rem;
      background-color: #fff;
      margin-top: .2rem;
    }
  }
  .demo3-slot {
    text-align: center;
    padding: .15rem;
  }
  .asdfasdf {
    .vux-cell-value {
      width: 4rem;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      display: inline-block;
      padding-top: .1rem;
    }
  }

</style>
