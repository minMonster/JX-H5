<template>
  <div class="my-collection">
    <scroller :on-refresh="refresh" :on-infinite="infinite" noDataText="没有更多数据"
              :style="{height: contentHeight, top: contentTop}" style="width: 100%;">
      <div class="product-container">
        <div @click="toDetail(product)" class="product" v-for="product in products" :key="product.id">
          <img :src="product.pic" alt="" class="product-img">
          <div class="desc">
            <span class="product-name">{{product.title}}</span>
<!--            <span class="product-price">￥{{product.price}}</span>-->
          </div>
          <span @click.stop="cancelShou(product)" class="sold-count">取消收藏</span>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  import { setupWebViewJavascriptBridge } from '@/common/jsbridge'

  export default {
    name: 'myCollection',
    data: function () {
      return {
        contentHeight: '',
        contentTop: '',
        products: [],
        // products: [
        //   {
        //     imgSrc: require('../../assets/store/ic_shop_product_1.png'),
        //     name: '时尚床上用品',
        //     price: 399.9,
        //     sold: 1234,
        //     path: ''
        //   },
        //   {
        //     imgSrc: require('../../assets/store/ic_shop_product_2.png'),
        //     name: '时尚床上用品',
        //     price: 399.9,
        //     sold: 1234,
        //     path: ''
        //   },
        //   {
        //     imgSrc: require('../../assets/store/ic_shop_product_2.png'),
        //     name: '时尚床上用品',
        //     price: 399.9,
        //     sold: 1234,
        //     path: ''
        //   },
        //   {
        //     imgSrc: require('../../assets/store/ic_shop_product_1.png'),
        //     name: '时尚床上用品',
        //     price: 399.9,
        //     sold: 1234,
        //     path: ''
        //   },
        //   {
        //     imgSrc: require('../../assets/store/ic_shop_product_2.png'),
        //     name: '时尚床上用品',
        //     price: 399.9,
        //     sold: 1234,
        //     path: ''
        //   }
        // ]
        pageOptions: {
          pageIndex: 1,
          pageSize: 20,
          id: 0
        }
      }
    },
    mounted () {
      this.contentHeight = document.documentElement.clientHeight
      this.contentTop = 0
    },
    methods: {
      toDetail (item) {
        // let that = this
        localStorage.setItem('storeDetail', JSON.stringify({
          id: item.foreignID
        }))
        let url = 'native-route?data={"page": "storeDetail"}'
        this.$router.push({path: url})
        // setupWebViewJavascriptBridge((bridge) => {
        //   bridge.callHandler('openH5', {
        //     path: 'storeDetail'
        //   }, function () {})
        // })
      },
      getCommodityList (done) {
        this.$api.get('/UserFavorite/List?pageIndex=' + this.pageOptions.pageIndex + '&pageSize=' + this.pageOptions.pageSize).then(res => {
          this.products = res.data.list
          if (done) done(true)
        })
      },
      refresh (done) {
        this.products = []
        this.pageOptions.pageSize = 15
        this.getCommodityList(done)
      },
      infinite (done) {
        this.pageOptions.pageSize += 15
        this.getCommodityList(done)
      },
      cancelShou (item) {
        this.$api.post('/UserFavorite/Delete?id=' + item.id, {id: item.id}).then(res => {
          this.$vux.toast.text('取消收藏成功')
          this.getCommodityList()
        })
      }
    },
    created () {
      this.getCommodityList()
    }
  }
</script>

<style lang="less">
  @import "../../styles/index.less";
  @import "../../styles/variable";
  .my-collection {
      background-color: @B7;
      min-height: 100vh;

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
