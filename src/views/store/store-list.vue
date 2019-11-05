<template>
  <div class="store-list">
    <scroller :on-refresh="refresh" :on-infinite="infinite" noDataText="没有更多数据"
              :style="{height: contentHeight, top: contentTop}" style="width: 100%;">
      <ul class="tabs">
        <li :class="{active: item.id === pageOptions.typeId}" @click="selectType(item.id)" v-for="item in shops" :key="item.id">
          <img :src="item.pic" alt="">
          <p>{{item.name}}</p>
        </li>
      </ul>
      <ul class="goods">
        <!--<li @click="$router.push({path: 'store-detail', query: {id: item.id}})" v-for="(item, index) in commodityList" :key="index">-->
        <li v-for="(item, index) in commodityList" :key="index">
          <div class="good-img-box" @click="$router.push({path: 'store-detail', query: {id: item.id}})">
            <img class="good-img" :src="item.pic" alt="">
          </div>
          <p class="good-name" @click="$router.push({path: 'store-detail', query: {id: item.id}})">{{item.name}}</p>
          <p class="good-des ell2" @click="$router.push({path: 'store-detail', query: {id: item.id}})">{{item.describe}}</p>
          <p class="good-info">销量： {{item.saleAmount}}</p>
          <div class="good-operation">
            <div class="pay" @click="$router.push({path: 'store-detail', query: {id: item.id}})">
              <span>￥</span>{{item.price}}/{{item.standard}}
            </div>
            <div class="add-cart" @click.prevent="addToCar(index)">
              <svg-icon icon-class="_ionicons_svg_md-add" class="icon-close"></svg-icon>
            </div>
          </div>
        </li>
      </ul>
    </scroller>
    <footer>
      <div class="money">
        <!--<svg-icon @click.native="$router.push({path: '/shopping-cart'})" icon-class="_ionicons_svg_md-cart" class="cart_ionicons_svg_md"></svg-icon>-->
        <!--<span class="pay">￥123元</span>-->
        <span class="des">{{$route.query.deliveryMinAmount}}元起送</span>
      </div>
      <div class="submit" @click="$router.push({path: '/shopping-cart'})">
        <svg-icon icon-class="_ionicons_svg_md-cart" class="cart_ionicons_svg_md"></svg-icon>
        购物车
      </div>
    </footer>
  </div>
</template>

<script>
  import { Icon } from 'vux'

  export default {
    name: 'store-list',
    components: {
      Icon
    },
    data: function () {
      return {
        shops: [],
        contentHeight: 0,
        contentTop: 0,
        totalCount: 0,
        commodityList: [],
        pageOptions: {
          pageIndex: 1,
          pageSize: 20,
          typeId: 0,
          shopId: 1
        }
      }
    },
    mounted () {
      this.contentHeight = document.documentElement.clientHeight + 'px'
      this.contentTop = 0
      document.documentElement.scrollTop = document.body.scrollTop = 0
    },
    methods: {
      selectType (type) {
        if (this.pageOptions.typeId === type) {
          this.pageOptions.typeId = 0
        } else {
          this.pageOptions.typeId = type
        }
        this.pageOptions.pageSize = 15
        this.getCommodityList()
      },
      refresh (done) {
        this.lists = []
        this.pageOptions.typeId = 0
        this.pageOptions.pageSize = 15
        this.getCommodityList(done)
      },
      infinite (done) {
        this.pageOptions.pageSize += 15
        this.getCommodityList(done)
      },
      getCommodityList (done) {
        this.$api.get('/Commodity/List', {
          params: {
            ...this.pageOptions
          }
        }).then(res => {
          this.commodityList = res.data.list
          if (done) done(true)
        })
      },
      getShopCategory () {
        this.$api.get('/ShopCategory/GetCategory?shopID=' + this.pageOptions.shopId).then(res => {
          this.shops = res.data
        })
      },
      addToCar (index) {
        this.$api.post('/ShoppingCar/Add', {
          shopID: this.$route.query.id,
          commodityID: this.commodityList[index].id,
          amount: 1,
          price: this.commodityList[index].price,
          useScore: 0,
          name: this.commodityList[index].name,
          pic: this.commodityList[index].pic
          // versionID: this.commodityList[index].versionID
        }).then(() => {
          this.$vux.toast.text('加入购物车成功')
        }).catch(() => {
          this.$vux.toast.text('提交失败')
        })
      }
    },
    created () {
      this.pageOptions.shopId = this.$route.query.id
      this.getShopCategory()
      this.$api.get('/shop/getById?id=' + this.$route.query.id).then(res => {
        document.title = res.data.name
      })
    }
  }
</script>

<style rel="stylesheet/less" lang="less">
  @import "../../styles/index.less";
  @import "../../styles/variable";

  .store-list {
    background-color: #F3F5F6;
    height: 100vh;
    .tabs {
      height: 1.8rem;
      width: 100vw;
      overflow-x: scroll;
      display: flex;
      margin-bottom: .1rem;
      background-color: #fff;
      li {
        display: flex;
        min-width: 1.2rem;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        &.active {
          background: rgba(240, 90, 35, 0.1);
        }
        img {
          width: .8rem;
          height: .8rem;
          border-radius: 50%;
          background-color: pink;
        }
        p {
          padding-top: .1rem;
          font-size: .18rem;
        }
      }
    }
    .goods {
      background-color: #F3F5F6;
      display: flex;
      flex-wrap: wrap;
      li {
        padding: .2rem;
        margin: .2rem;
        margin-top: .1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-bottom: .1rem;
        width: 3.45rem;
        background-color: #fff;
        &:nth-child(even) {
          margin-left: 0;
        }
        .good-img-box {
          width: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
          max-height: 2.8rem;
          min-height: 2.8rem;
          overflow: hidden;
          img {
            height: auto;
            width: 100%;
          }
        }
        p.good-name {
          padding-top: .2rem;
          width: 3rem;
          font-size: .3rem;
        }
        p.good-des {
          width: 3rem;
          font-size: .18rem;
          color: #999999;
        }
      }
      .good-info {
        padding-top: .1rem;
        text-align: left;
        width: 100%;
      }
      .good-operation {
        padding-top: .2rem;
        display: flex;
        width: 3rem;
        justify-content: center;
        align-items: center;
        .pay {
          color: #F05A23;
          flex: 1;
          width: 3rem;
          font-size: .36rem;
          span {
            font-size: .2rem;
          }
        }
        .add-cart {
          height: .42rem;
          width: .42rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #F05A23;
          color: #fff;
          font-size: .3rem;
          border-radius: .21rem;
        }
      }
    }
    footer {
      padding: .2rem;
      position: fixed;
      bottom: 0;
      width: 100vw;
      height: 1.4rem;
      background-color: #FFF;
      display: flex;
      .money {
        font-size: .36rem;
        padding-left: .2rem;
        flex: 1;
        line-height: 1rem;
        .cart_ionicons_svg_md {
          font-size: .6rem;
          color: #F05A23;
        }
        .pay {
          color: #F05A23;
        }
        .des {
          color: #999999;
          font-size: .32rem;
        }
      }
      .submit {
        background-color: #F05A23;
        width: 3rem;
        border-radius: .5rem;
        text-align: center;
        color: #fff;
        font-size: .36rem;
        line-height: 1rem;
      }
    }
  }
</style>
