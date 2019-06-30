<!-- crated：2019-06-18  author：Monster  -->
<template>
    <div class='shopping-in-jx'>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide"><img src="../../assets/store/ic_shop_product_1.png" alt=""></div>
                <div class="swiper-slide"><img src="../../assets/happy-in-jx/fun-1.jpg" alt=""></div>
                <div class="swiper-slide"><img src="../../assets/eat-in-jx/food-1.jpg" alt=""></div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
        </div>
        <div class="product-list">
            <div class="product" v-for="product in products" :key="product.id">
                <img :src="product.src" class="pic" alt="">
                <div class="info">
                    <p class="name">{{product.name}}</p>
                    <div class="desc">{{product.desc}}</div>
                    <a :href="product.href" class="check-more">查看更多></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css';
  import Swiper from 'swiper';

  export default {
    name: 'shopping-in-jx',
    data: function () {
      return {
        products: [
          {
            src: require('../../assets/shopping-in-jx/product-1.png'),
            name: '嗡嗡乐蜂蜜',
            desc: '想买蜂蜜,但市面上产品众多不知怎样选择?带你品尝真正的土蜂蜜想买蜂蜜,但市面上产品众多不知怎样选择?带你品尝真正的土蜂蜜....',
            href: '#'
          },
          {
            src: require('../../assets/shopping-in-jx/product-1.png'),
            name: '嗡嗡乐蜂蜜',
            desc: '想买蜂蜜,但市面上产品众多不知怎样选择?带你品尝真正的土蜂蜜想买蜂蜜,但市面上产品众多不知怎样选择?带你品尝真正的土蜂蜜....',
            href: '#'
          },
          {
            src: require('../../assets/shopping-in-jx/product-1.png'),
            name: '嗡嗡乐蜂蜜',
            desc: '想买蜂蜜,但市面上产品众多不知怎样选择?带你品尝真正的土蜂蜜想买蜂蜜,但市面上产品众多不知怎样选择?带你品尝真正的土蜂蜜....',
            href: '#'
          }
        ]
      };
    },
    created () {
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

    .shopping-in-jx {
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
        .product-list {
            width: 100vw;
            padding: .24rem;

            .product {
                width: 100%;
                height: 1.92rem;
                display: flex;
                justify-content: space-between;
                margin-bottom: .32rem;

                &:last-child {
                    margin-bottom: 0;
                }

                .pic {
                    width: 2.78rem;
                    border-radius: .08rem;
                    margin-right: .3rem;
                }

                .info {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;

                    .name {
                        font-size: .28rem;
                        font-family: @FM;
                        font-weight: 600;
                        color: @T2;
                        line-height: .44rem;
                        margin-bottom: .14rem;
                    }

                    .desc {
                        font-size: .24rem;
                        font-family: @FR;
                        font-weight: 400;
                        color: @T2;
                        line-height: .36rem;
                        overflow: hidden;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        word-break: break-all;
                        text-overflow: ellipsis;
                        text-align: justify;
                    }

                    .check-more {
                        font-size: .2rem;
                        font-family: @FR;
                        font-weight: 400;
                        color: @T4;
                        line-height: .2rem;
                        text-align: right;
                        margin: .4rem 0 .04rem;
                    }
                }
            }
        }
    }
</style>
