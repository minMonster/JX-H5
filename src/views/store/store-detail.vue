<template>
  <div class="store-detail" v-if="goodDetail">
    <swiper :show-dots="false" v-model="swiperItemIndex">
      <swiper-item class="swiper-demo-img good-img" v-for="(item, index) in goodDetail.pics" :key="index">
        <img :src="item">
      </swiper-item>
    </swiper>
    <div class="good-info">
      <div class="money">￥{{goodDetail.price}}/{{goodDetail.standard}}</div>
      <p class="good-name">{{goodDetail.name}}</p>
      <p class="good-des">{{goodDetail.describe}}</p>
      <p class="good-amount">剩余 {{goodDetail.amount}}/{{goodDetail.standard}}</p>
      <p class="good-amount">已售 {{goodDetail.saleAmount}}/{{goodDetail.standard}}</p>
    </div>
    <div class="good-det" v-if="goodDetail.code || goodDetail.brand || goodDetail.weight || goodDetail.productionPlace || goodDetail.productionCompany || goodDetail.material">
      <div class="label">商品参数</div>
      <div class="params" v-if="goodDetail.code">
        <span class="label-params">编码</span>
        <span class="label-des">{{goodDetail.code}}</span>
      </div>
      <div class="params" v-if="goodDetail.brand">
        <span class="label-params">品牌</span>
        <span class="label-des">{{goodDetail.brand}}</span>
      </div>
      <div class="params" v-if="goodDetail.weight">
        <span class="label-params">重量</span>
        <span class="label-des">{{goodDetail.weight}}</span>
      </div>
      <div class="params" v-if="goodDetail.wrapper">
        <span class="label-params">包装</span>
        <span class="label-des">{{goodDetail.wrapper}}</span>
      </div>
      <div class="params" v-if="goodDetail.productionPlace">
        <span class="label-params">产地</span>
        <span class="label-des">{{goodDetail.productionPlace}}</span>
      </div>
      <div class="params" v-if="goodDetail.productionCompany">
        <span class="label-params">生产公司</span>
        <span class="label-des">{{goodDetail.productionCompany}}</span>
      </div>
      <div class="params" v-if="goodDetail.material">
        <span class="label-params">材质</span>
        <span class="label-des">{{goodDetail.material}}</span>
      </div>
    </div>
    <div class="good-det">
      <div class="label">商品详情</div>
      <div class="good-html" v-html="goodDetail.describe">
        <!--图文详情's'd-->
        <!--图文详情's'd-->
        <!--图文详情's'd-->
        <!--图文详情's'd-->
        <!--<img src="../../assets/logo.png" alt="">-->
        <!--图文详情's'd-->
        <!--<img src="../../assets/logo.png" alt="">-->
      </div>
    </div>
    <div class="good-operation">
      <div class="buttons">
        <div @click="shoucang">
          <svg-icon v-if="true" icon-class="shoucang" class="icon-close"></svg-icon>
          <svg-icon v-else icon-class="shoucang1" class="icon-close"></svg-icon>
          <p>收藏</p>
        </div>
        <div class="car" @click="$router.push({path: '/shopping-cart'})">
          <svg-icon icon-class="_ionicons_svg_md-cart" class="icon-close"></svg-icon>
          <p>购物车</p>
          <div class="carCount">{{carCount}}</div>
        </div>
      </div>
      <button class="button-good yellow" @click="payShop">立即购买</button>
      <button class="button-good orange" @click="addToCar">加入购物车</button>
    </div>
  </div>
</template>

<script>
  import { XButton, Swiper, SwiperItem } from 'vux'
  export default {
    name: 'store-detail',
    components: {
      XButton, Swiper, SwiperItem
    },
    data: function () {
      return {
        goodDetail: {},
        id: 'asdsad',
        swiperItemIndex: 0,
        carCount: 0
      }
    },
    methods: {
      getCommodity () {
        if (!this.$route.query.id) {
          this.id = JSON.parse(localStorage.getItem('storeDetail')).id
        } else {
          this.id = this.$route.query.id
        }
        let id = this.$route.query.id
        this.$api.get('/Commodity/' + this.id).then(res => {
          this.goodDetail = res.data
          this.goodDetail.pics = JSON.parse(res.data.pics)
        })
      },
      payShop () {
        this.addToCar().then(() => {
          this.$router.push({path: '/shopping-cart'})
        })
      },
      getCarCount () {
        this.$api.get('/ShoppingCar/Count').then(res => {
          this.carCount = res.data
        })
      },
      shoucang () {
        this.$api.get('/UserFavorite/InFavorite?foreignID=' + this.goodDetail.id + '&type=commodity').then((res) => {
          if (res.data) {
            this.$api.post('/UserFavorite/Add', {
              type: 'commodity',
              'foreignID': this.goodDetail.id,
              'title': this.goodDetail.name,
              'pic': this.goodDetail.pic,
              'content': 'string'
            }).then(() => {
              this.$vux.toast.text('收藏成功')
            }).catch(() => {
              this.$vux.toast.text('收藏失敗')
            })
          } else {
            this.$vux.toast.text('您已经收藏过该商品')
          }
        })
      },
      addToCar () {
        return this.$api.post('/ShoppingCar/Add', {
          shopID: this.goodDetail.shopID,
          commodityID: this.goodDetail.id,
          amount: 1,
          price: this.goodDetail.price,
          useScore: 0,
          name: this.goodDetail.name,
          pic: this.goodDetail.pic,
          versionID: this.goodDetail.versionID
        }).then(() => {
          this.$vux.toast.text('加入购物车成功')
          this.getCarCount()
        }).catch(() => {
          this.$vux.toast.text('提交失败')
        })
      }
    },
    mounted () {
      this.getCommodity()
    },
    created () {
      // this.getCommodity()
      this.getCarCount()
    }
  }
</script>

<style rel="stylesheet/less" type="text/less" lang="less">
  .store-detail {
    background-color: #F3F5F6;
    .good-img {
      background-color: #fff;
      width: 100vw;
      height: 4rem;
      img {
        width: 100vw;
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
      justify-content: flex-start;
      align-items: center;
      height: 1.2rem;
      background-color: #fff;
      padding-right: .1rem;
      .buttons {
        display: flex;
        height: 1rem;
        width: 3rem;
        justify-content: center;
        align-items: center;
        padding-left: .2rem;
        div {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .svg-icon {
            font-size: .36rem;
            fill: #F05A23;
            color: #F05A23;
          }
        }
        .car {
          position: relative;
          .carCount {
            position: absolute;
            right: .3rem;
            top: -.2rem;
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
          margin-left: .6rem;
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
