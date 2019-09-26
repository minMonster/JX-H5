<template>
  <div class="store-detail" v-if="goodDetail">
    <div class="good-img">
      <img :src="goodDetail.pic" alt="">
    </div>
    <div class="good-info">
      <div class="money">￥{{goodDetail.price}}/{{goodDetail.standard}}</div>
      <p class="good-name">{{goodDetail.name}}</p>
      <p class="good-des">{{goodDetail.describe}}</p>
      <p class="good-amount">剩余 {{goodDetail.amount}}/{{goodDetail.standard}}</p>
      <p class="good-amount">已售 {{goodDetail.saleAmount}}/{{goodDetail.standard}}</p>
    </div>
    <div class="good-det">
      <div class="label">商品参数</div>
      <div class="params">
        <span class="label-params">大小</span>
        <span class="label-des">156mm*120mm</span>
      </div>
      <div class="params">
        <span class="label-params">大小</span>
        <span class="label-des">156mm*120mm</span>
      </div>
    </div>
    <div class="good-det">
      <div class="label">商品详情</div>
      <div class="good-html">
        图文详情's'd
        图文详情's'd
        图文详情's'd
        图文详情's'd
        <img src="../../assets/logo.png" alt="">
        图文详情's'd
        <img src="../../assets/logo.png" alt="">
      </div>
    </div>
    <div class="good-operation">
      <div class="buttons" @click="$router.push({path: '/shopping-cart'})">
        <div>
          <svg-icon icon-class="_ionicons_svg_md-cart" class="icon-close"></svg-icon>
          <p>购物车</p>
        </div>
      </div>
      <button class="button-good yellow">立即购买</button>
      <button class="button-good orange" @click="addToCar">加入购物车</button>
    </div>
  </div>
</template>

<script>
  import { XButton } from 'vux'
  export default {
    name: 'store-detail',
    components: {
      XButton
    },
    data: function () {
      return {
        goodDetail: {}
      }
    },
    methods: {
      getCommodity () {
        this.$api.get('/Commodity/' + this.$route.query.id).then(res => {
          this.goodDetail = res.data
        })
      },
      addToCar () {
        debugger
        this.$api.post('/ShoppingCar/Add', {
          shopID: this.goodDetail.shopID,
          commodityID: this.goodDetail.id,
          amount: this.goodDetail.amount,
          price: this.goodDetail.price,
          useScore: 0,
          name: this.goodDetail.name,
          pic: this.goodDetail.pic,
          versionID: this.goodDetail.versionID
        }).then(res => {
          if (res.success) {
            this.$vux.toast.text('加入购物车成功')
          }
        }).catch(() => {
          this.$vux.toast.text('提交失败')
        })
      }
    },
    created () {
      this.getCommodity()
    }
  }
</script>

<style rel="stylesheet/less" lang="less">
  .store-detail {
    background-color: #F3F5F6;
    .good-img {
      background-color: #fff;
      width: 100vw;
      img {
        width: 100vw;
        height: 5rem;
      }
    }
    .good-info {
      background-color: #fff;
      margin-top: .2rem;
      margin-bottom: .2rem;
      padding: .2rem;
      .money {
        font-size: .4rem;
        color: #F05A23;
      }
      .good-name {
        font-size: .36rem;
      }
    }
    .good-operation {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100vw;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 1.2rem;
      background-color: #fff;
      padding-right: .1rem;
      .buttons {
        display: flex;
        height: 1rem;
        justify-content: center;
        align-items: start;
        flex-direction: column;
        padding-left: .2rem;
        flex: 1;
        div {
          display: flex;
          width: 3rem;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .svg-icon {
            font-size: .36rem;
            color: #F05A23;
          }
        }
      }
      .button-good {
        min-width: 1.7rem;
        margin-right: .1rem;
        border: none;
        height: .8rem;
        color: #fff;
        background: linear-gradient(to left, rgba(250, 199, 61, 1) , rgba(246, 151, 48, 1));
        &.yellow {
          border-top-left-radius: .2rem;
          border-bottom-left-radius: .2rem;
          margin-right: 0;
        }
        &.orange {
          border-top-right-radius: .2rem;
          border-bottom-right-radius: .2rem;
          background: linear-gradient(to left, rgba(247, 120, 41, 1) , rgba(249, 81, 33, 1));
        }
      }
    }
    .good-det {
      background-color: #fff;
      margin-bottom: .2rem;
      padding: .2rem;
      .label {
        font-size: .36rem;
      }
    }
  }
</style>
