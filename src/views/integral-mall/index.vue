<template>
  <div class="integral-mall">
    <img src="../../assets/integral-mall/integral-banner@2x.png" alt="" class="banner">
    <div class="nav">
      <div class="integral">
        <img src="../../assets/integral-mall/integral-logo@2x.png" alt="" class="logo">
        <span class="current-integral">{{currentIntegral}}积分</span>
      </div>
      <div class="convert-record" @click="$router.push({path: '/integral-mall/record'})">兑换记录</div>
    </div>
    <div class="integral-convert">
      <img src="../../assets/integral-mall/integral-title@2x.png" alt="" class="title">
      <div class="product-container">
        <div class="product" v-for="product in products" :key="product.id">
          <img :src="product.imgSrc" alt="" class="product-img">
          <span class="product-name">{{product.name}}</span>
          <div class="info">
            <div class="cost"><span class="red">{{product.cost}}</span>积分</div>
            <span class="rest">剩余{{product.rest}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'integral-mall',
    data: function () {
      return {
        currentIntegral: 880,
        products: [
          {
            imgSrc: require('../../assets/store/ic_shop_product_1.png'),
            name: '时尚床上用品',
            cost: 4000,
            rest: 12,
            path: ''
          },
          {
            imgSrc: require('../../assets/store/ic_shop_product_2.png'),
            name: '时尚床上用品',
            cost: 3000,
            rest: 20,
            path: ''
          },
          {
            imgSrc: require('../../assets/store/ic_shop_product_2.png'),
            name: '时尚床上用品',
            cost: 6666,
            rest: 0,
            path: ''
          },
          {
            imgSrc: require('../../assets/store/ic_shop_product_1.png'),
            name: '时尚床上用品',
            cost: 7777,
            rest: 18,
            path: ''
          },
          // {
          //   imgSrc: require('../../assets/store/ic_shop_product_2.png'),
          //   name: '时尚床上用品',
          //   cost: 1234,
          //   rest: 0,
          //   path: ''
          // }
        ]
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">
  @import "../../styles/variable";
  @import "../../styles/index";

  .integral-mall {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    .banner {
      display: block;
      width: 100%;
    }

    .nav {
      height: 1.04rem;
      padding: .1rem .24rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .integral {
        display: flex;
        align-items: center;

        .logo {
          width: .56rem;
          height: .56rem;
          margin-right: .24rem;
        }

        .current-integral {
          font-size: .32rem;
          font-family: @FM;
          font-weight: 600;
          color: @T1;
          line-height: .32rem;
        }
      }

      .convert-record {
        font-size: .28rem;
        font-family: @FM;
        font-weight: 600;
        color: @T3;
        line-height: .32rem;
      }
    }

    .integral-convert {
      padding: .36rem .24rem;
      background-color: @B7;
      flex: 1;

      .title {
        width: 2.8rem;
        margin: 0 auto .4rem;
        display: block;
      }

      .product-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

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
            margin-bottom: .12rem;
            border-bottom: 1px solid @B7;
          }

          .product-name {
            font-size: .28rem;
            font-family: @FR;
            font-weight: 400;
            color: @T1;
            line-height: .28rem;
          }

          .info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: .12rem;

            .cost {
              font-size: .2rem;
              font-family: @FR;
              font-weight: 400;
              color: @T3;
              line-height: .2rem;

              .red {
                color: @C4;
                margin-right: .06rem;
              }
            }

            .rest {
              font-size: .2rem;
              font-family: @FR;
              font-weight: 400;
              color: @T3;
              line-height: .2rem;
            }
          }
        }
      }
    }
  }
</style>
