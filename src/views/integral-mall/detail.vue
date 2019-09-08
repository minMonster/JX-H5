<template>
  <div class="integral-convert-detail">
    <div class="carousel">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in pics" :key="item.id"><img :src="item" alt=""></div>
          <!--                <div class="swiper-slide"><img src="../../assets/happy-in-jx/fun-1.jpg" alt=""></div>-->
          <!--                <div class="swiper-slide"><img src="../../assets/eat-in-jx/food-1.jpg" alt=""></div>-->
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <div class="product-info">
      <div class="left">
        <div class="name">{{product.name}}</div>
        <div class="more">
          <div class="cost"><span class="red">-{{product.score}}</span>积分</div>
          <span class="rest">仅剩{{product.amount}}份</span>
        </div>
      </div>
      <x-button class="convert-btn right" @click.native="goConvert">兑换</x-button>
    </div>
    <div class="product-detail">
      <p class="title">商品介绍</p>
      <div class="detail">{{detail}}</div>
    </div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  import { XButton } from 'vux'
  export default {
    name: 'integral-convert-detail',
    components: {
      XButton
    },
    data: function () {
      return {
        product: {},
        detail: '',
        pics: []
      }
    },
    mounted () {
      this.getCommodity().then((res) => {
        this.product = res.data
        this.detail = res.data.describe
        this.pics[0] = res.data.pic
        if (res.data.pics) {
          this.pics = JSON.parse(res.data.pics)
        } else {
          this.pics[0] = res.data.pic
        }
        this.$nextTick(() => {
          new Swiper('.swiper-container', {
            loop: true,
            // 如果需要分页器
            pagination: '.swiper-pagination',
            // 如果需要前进后退按钮
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            // 如果需要滚动条
            scrollbar: '.swiper-scrollbar',
          })
        })
      })
    },
    methods: {
      goConvert () {
        let userScore = JSON.parse(sessionStorage.getItem('userInfo')).totalScore
        if (this.product.score > userScore) {
          this.$vux.toast.text('积分不足')
        } else {
          this.$router.push({path: '/integral-mall/confirm', query: {id: this.product.id}})
        }
      },
      getCommodity () {
        return this.$api.get('/Commodity/' + this.$route.query.id)
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">
  @import "../../styles/variable";
  @import "../../styles/index";

  .integral-convert-detail {
    background-color: @B7;
    .swiper-container {
      width: 100vw;
      height: 3rem;
      .swiper-slide {
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .carousel {
      height: 3rem;
      background-color: #fff;
      margin-bottom: 2px;
    }

    .product-info {
      height: 1.4rem;
      background-color: #fff;
      padding: .2rem .24rem;
      margin-bottom: .24rem;
      display: flex;
      justify-content: space-between;

      .left {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .name {
          width: 4rem;
          font-size: .36rem;
          font-family: @FM;
          font-weight: 600;
          color: @T1;
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }

        .more {
          display: flex;
          align-items: flex-end;

          .cost {
            font-size: .20rem;
            font-family: @FR;
            font-weight: 400;
            color: @T3;
            margin-right: .38rem;

            .red {
              font-size: .32rem;
              font-weight: 600;
              color: @C4;
              vertical-align: bottom;
              margin-right: 2px;
              margin-left: .06rem;
            }
          }

          .rest {
            font-size: .2rem;
            font-family: @FR;
            font-weight: 400;
            color: @T4;
          }
        }
      }

      .weui-btn {
        width: 1.12rem;
        height: .52rem;
        margin: 0;
        background-color: @C3;
        border-radius: .3rem;

        &:active {
          background-color: @C3 !important;
          color: #FFFFFF !important;
        }
      }

      .convert-btn {
        font-size: .24rem;
        font-family: @FR;
        font-weight: 400;
        color: #FFFFFF;
        line-height: .24rem;
      }
    }

    .product-detail {
      background-color: #fff;
      padding: .28rem .24rem .36rem;

      .title {
        font-size: .28rem;
        font-family: @FR;
        font-weight: 400;
        color: @T1;
        margin-bottom: .36rem;
      }
    }
  }
</style>
