<!-- crated：2019-06-23  author：Monster  -->
<template>
    <div class='store'>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide"><img src="../../assets/shopping-in-jx/product.png" alt=""></div>
<!--                <div class="swiper-slide"><img src="../../assets/happy-in-jx/fun-1.jpg" alt=""></div>-->
<!--                <div class="swiper-slide"><img src="../../assets/eat-in-jx/food-1.jpg" alt=""></div>-->
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
        </div>
        <div class="tab-container">
            <div class="tab" @click="$router.push({path: '/entertainment'})" v-for="tab in tabs" :key="tab.id">
                <img :src="tab.imgSrc" alt="" class="tab-img">
                <span class="tab-name">{{tab.name}}</span>
            </div>
        </div>
        <div class="product-container">
            <div class="product" v-for="product in products" :key="product.id">
                <img :src="product.imgSrc" alt="" class="product-img">
                <div class="desc">
                    <span class="product-name">{{product.name}}</span>
                    <span class="product-price">￥{{product.price}}</span>
                </div>
                <span class="sold-count">已售{{product.sold}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import Swiper from 'swiper'

export default {
  name: 'store',
  data: function () {
    return {
      tabs: [
        {
          imgSrc: require('../../assets/store/ic_shop_market.png'),
          name: '超市',
          path: 'market'
        },
        {
          imgSrc: require('../../assets/store/ic_shop_food.png'),
          name: '美食',
          path: 'food'
        },
        {
          imgSrc: require('../../assets/store/ic_shop_hotel.png'),
          name: '酒店',
          path: 'hotel'
        },
        {
          imgSrc: require('../../assets/store/ic_shop_entertainment.png'),
          name: '娱乐',
          path: 'entertainment'
        }
      ],
      products: [
        {
          imgSrc: require('../../assets/store/ic_shop_product_1.png'),
          name: '时尚床上用品',
          price: 399.9,
          sold: 1234,
          path: ''
        },
        {
          imgSrc: require('../../assets/store/ic_shop_product_2.png'),
          name: '时尚床上用品',
          price: 399.9,
          sold: 1234,
          path: ''
        },
        {
          imgSrc: require('../../assets/store/ic_shop_product_2.png'),
          name: '时尚床上用品',
          price: 399.9,
          sold: 1234,
          path: ''
        },
        {
          imgSrc: require('../../assets/store/ic_shop_product_1.png'),
          name: '时尚床上用品',
          price: 399.9,
          sold: 1234,
          path: ''
        },
        {
          imgSrc: require('../../assets/store/ic_shop_product_2.png'),
          name: '时尚床上用品',
          price: 399.9,
          sold: 1234,
          path: ''
        }
      ]
    }
  },
  mounted () {
    new Swiper('.swiper-container', {
      loop: true,
      // 如果需要分页器
      pagination: '.swiper-pagination',
      // 如果需要前进后退按钮
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      // 如果需要滚动条
      scrollbar: '.swiper-scrollbar',
    });
  }
};
</script>
<style rel="stylesheet/less" lang="less">

    @import "../../styles/index.less";
    @import "../../styles/variable";

    .store {
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
        background-color: @B7;
        min-height: 100vh;

        .carousel {
            height: 3.4rem;
            background-color: grey;
        }

        .tab-container {
            height: 1.88rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: @B2;

            .tab {
                width: 1.76rem;
                height: 1.36rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                .tab-img {
                    width: .92rem;
                    height: .92rem;
                    border-radius: .12rem;
                    margin-bottom: .08rem;
                }

                .tab-name {
                    font-size: .26rem;
                    font-family: @FR;
                    font-weight: 400;
                    color: @T1;
                    line-height: .26rem;
                }
            }
        }

        .product-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            padding: .36rem .24rem 0;

            .product {
                width: 3.4rem;
                height: 4.12rem;
                background-color: @B2;
                padding: .12rem;
                border-radius: .12rem;
                margin-bottom: .22rem;

                .product-img {
                    width: 3.16rem;
                    height: 3rem;
                    margin-bottom: .13rem;
                    border-bottom: 1px solid @B7;
                }

                .desc {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: .08rem;

                    .product-name {
                        font-size: .28rem;
                        font-family: @FR;
                        font-weight: 400;
                        color: @T1;
                        line-height: .28rem;
                    }

                    .product-price {
                        font-size: .3rem;
                        font-family: DINAlternate-Bold;
                        font-weight: bold;
                        color: #F05A23;
                        line-height: .28rem;
                    }
                }

                .sold-count {
                    font-size: .2rem;
                    font-family: @FR;
                    font-weight: 400;
                    color: @T3;
                    line-height: .2rem;
                }
            }
        }
    }
</style>
