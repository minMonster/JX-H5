<!-- crated：2019/10/14  author：Monster  -->
<template>
  <div class='order'>
    <div style="height: 1px"></div>
    <div class="infoBox">
      <div class="product-detail" v-for="item in orderDetail.detailList" :key="item.id">
        <img :src="item.pic" alt="" class="pic">
        <div class="text">
          <div class="name">{{item.name}}</div>
          <div class="cost">单价：<span class="red">{{item.price}}</span>元</div>
          <div class="cost">数量：<span class="red">{{item.amount}}</span></div>
        </div>
      </div>
    </div>
    <div class="infoBox">
      <div class="title">
        订单信息
        <span class="order-status">{{orderDetail.statusDescribe}}</span>
      </div>
<!--      积分订单，只显示订单编号、收货地址、收货人、联系电话、消耗积分、快递单号-->
      <div class="infos"><label>订单编号</label><span>{{orderDetail.orderNo}}</span></div>
      <div class="infos"><label>快递单号</label><span>{{orderDetail.waybillNo?orderDetail.waybillNo:'暂无快递信息'}}</span></div>
      <div class="infos"><label>收货地址</label><span>{{orderDetail.address}}</span></div>
      <div class="infos"><label>收货人</label><span>{{orderDetail.receiverName}}</span></div>
      <div class="infos"><label>联系电话</label><span>{{orderDetail.receiverPhone}}</span></div>
      <div class="infos"><label>订单总积分</label><span>{{orderDetail.totalScore}}</span></div>
      <template v-if="orderDetail.payType!=='JF'">
        <div class="infos"><label>店铺名称</label><span>{{orderDetail.name}}</span></div>
        <div class="infos"><label>商品总价</label><span>{{orderDetail.totalMoney - orderDetail.deliveryFee}}元</span></div>
        <div class="infos"><label>配送费</label><span>{{orderDetail.deliveryFee}}元</span></div>
        <div class="infos"><label>订单总价</label><span>{{orderDetail.totalMoney}}元</span></div>
        <div class="infos"><label>配送方式</label><span>{{deliveryTypeTxt[orderDetail.deliveryType + '']}}</span></div>
      </template>
    </div>

    <x-button class="confirm-btn" v-if="orderDetail.statusDescribe === '待付款'" @click.native="pay">去支付</x-button>
    <x-button class="confirm-btn" v-if="orderDetail.statusDescribe === '配送中'" @click.native="Receive">确认收货</x-button>

  </div>
</template>

<script>
  import { XButton } from 'vux'

  export default {
    name: 'order',
    data: function () {
      return {
        product: {},
        orderDetail: {},
        deliveryTypeTxt: {
          '1': '配送',
          '2': '自取',
          '3': '配送或自取'
        }
      }
    },
    components: {XButton},
    created () {
      this.product = this.$route.query
      this.$api.get('/Order/Detail?orderId=' + this.product.orderId).then(res => {
        this.orderDetail = res.data
      })
    },
    methods: {
      Receive () {
        this.$api.get('/Order/Receive?orderId=' + this.product.orderId).then(res => {
          this.$vux.toast.text('收货成功')
          this.$router.go(0)
        })
      },
      pay () {
        let that = this
        that.$router.push({path: 'store-pay', query: {...that.product}})
      }
    }
  }
</script>

<style lang='less' type='text/less'>
  @import "../../styles/variable";
  @import "../../styles/index";

  .order {
    background-color: @B7;
    padding-bottom: 10rem;

    .infoBox {
      background-color: #fff;
      padding: .2rem;
      margin: .2rem;
      .title {
        font-size: .3rem;
        border-bottom: 2px solid @B7;
        padding-bottom: .1rem;
        margin-bottom: .1rem;
        span {
          float: right;
        }
      }
      .infos {
        padding-bottom: .1rem;
        label {
          display: inline-block;
          min-width: 1.4rem;
        }
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

    .confirm-btn {
      position: fixed;
      bottom: 0;
      left: .2rem;
      font-size: .32rem;
      font-family: @FM;
      font-weight: 600;
      color: #FFFFFF !important;
      margin-bottom: .4rem;
      background-color: @C3 !important;
    }
  }
</style>
