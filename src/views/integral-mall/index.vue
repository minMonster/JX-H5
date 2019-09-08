<template>
  <div class="integral-mall">
    <scroller :on-refresh="refresh" :on-infinite="infinite" noDataText="没有更多数据"
              :style="{height: contentHeight, top: 0}" style="width: 100%;">
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
          <div class="product" @click="$router.push({path: '/integral-mall/detail', query: {id: product.id}})" v-for="product in products" :key="product.id">
            <img :src="product.pic" alt="" class="product-img">
            <span class="product-name">{{product.name}}</span>
            <div class="info">
              <div class="cost"><span class="red">{{product.score}}</span>积分</div>
              <span class="rest">剩余{{product.amount}}</span>
            </div>
          </div>
          <div class="no-data" v-if="!totalCount">暂无商品数据</div>
      </div>
    </div>
    </scroller>
  </div>
</template>

<script>
  export default {
    name: 'integral-mall',
    data: function () {
      return {
        totalCount: 0,
        currentIntegral: 0,
        contentHeight: '', // 容器高度
        contentTop: '',
        products: [
          // {
          //   imgSrc: require('../../assets/store/ic_shop_product_1.png'),
          //   name: '时尚床上用品',
          //   cost: 4000,
          //   rest: 12,
          //   path: ''
          // },
          // {
          //   imgSrc: require('../../assets/store/ic_shop_product_2.png'),
          //   name: '时尚床上用品',
          //   cost: 3000,
          //   rest: 20,
          //   path: ''
          // },
          // {
          //   imgSrc: require('../../assets/store/ic_shop_product_2.png'),
          //   name: '时尚床上用品',
          //   cost: 6666,
          //   rest: 0,
          //   path: ''
          // },
          // {
          //   imgSrc: require('../../assets/store/ic_shop_product_1.png'),
          //   name: '时尚床上用品',
          //   cost: 7777,
          //   rest: 18,
          //   path: ''
          // }
        ],
        pageOptions: {
          pageIndex: 1,
          pageSize: 100
        }
      }
    },
    mounted () {
      this.contentHeight = document.documentElement.clientHeight
      this.contentTop = 0
    },
    methods: {
      refresh (done) {
        this.foods = []
        this.pageOptions.pageSize = 15
        this.getCommodityList(done)
      },
      infinite (done) {
        this.pageOptions.pageSize += 15
        this.getCommodityList(done)
      },
      getCommodityList (done) {
        this.$api.get('/Commodity/List?pageIndex=' + this.pageOptions.pageIndex + '&pageSize=' + this.pageOptions.pageSize).then(res => {
          this.products = res.data.list
          this.totalCount = res.data.totalCount
          // document.title = this.$route.query.title || '莒e通'
          if (done) {
            done(true)
          }
        }).catch(err => {
          if (done) {
            done(true)
          }
          if (err.code) {
            this.$vux.toast(err.message)
          } else {
            this.$vux.toast(err)
          }
        })
      }
    },
    created () {
      this.currentIntegral = JSON.parse(sessionStorage.getItem('userInfo')).totalScore
      this.getCommodityList()
    }
  }
</script>

<style rel="stylesheet/less" lang="less">
  @import "../../styles/variable";
  @import "../../styles/index";

  .integral-mall {
    min-height: 100vh;
    ._v-container {
      background-color: #F3F5F6;
    }
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
        }
      }

      .convert-record {
        font-size: .28rem;
        font-family: @FM;
        font-weight: 600;
        color: @T3;
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
            border-bottom: 1px solid @B7;
            margin-bottom: 2px;
            border-radius: .06rem;
          }

          .product-name {
            font-size: .28rem;
            font-family: @FR;
            font-weight: 400;
            color: @T1;
          }

          .info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 2px;

            .cost {
              font-size: .2rem;
              font-family: @FR;
              font-weight: 400;
              color: @T3;

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
            }
          }
        }

        .no-data {
          width: 100%;
          font-size: .24rem;
          font-family: @FR;
          font-weight: 400;
          color: @T3;
          text-align: center;
        }
      }
    }
  }
</style>
