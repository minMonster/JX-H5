<template>
    <div class="shopping-cart">
      <ul class="goods">
        <li class="pay-card" v-for="(shop, shopIndex) in list" :key="shopIndex">
          <div class="shop">
            <icon class="shop-icon" @click.native='selectShop(shopIndex)' :type="shop.active ? 'success' : 'circle'"></icon>
            <span class="shop-name"  @click="$router.push({path: '/store-list', query: {id: shop.shopID}})">{{shop.shopName}} ></span>
          </div>
          <div class="flex-box" v-for="(item, itemIndex) in shop.shoppingItem" :key="itemIndex">
            <div class="icon-checkbox" @click="select(shopIndex, itemIndex)">
              <icon :type="item.active ? 'success' : 'circle'"></icon>
            </div>
            <img class="good-img" :src="item.pic" alt="">
            <div class="info">
              <div class="title">{{item.name}}</div>
              <div class="timer">{{item.des}}</div>
            </div>
            <div class="good-setting">
              <x-icon type="ios-minus" @click.native="minusGood(shopIndex, itemIndex)" size="30"></x-icon>
              <div class="money-setting">{{item.amount}}</div>
              <x-icon type="ios-plus-outline" @click.native="addGood(shopIndex, itemIndex)" size="30"></x-icon>
            </div>
          </div>
          <div class="money">¥{{initShopNumberMoney(shopIndex)}}</div>
        </li>
      </ul>
      <footer>
        <div class="money">
          <span>合计</span>
          <span class="pay">￥{{numberMoney}}元</span>
        </div>
        <div class="submit">结算</div>
      </footer>
    </div>
</template>

<script>
  import { Icon } from 'vux'
  import Vue from 'vue'
  export default {
    name: 'shopping-cart',
    components: {
      Icon
    },
    data: function () {
      return {
        selectShopIndex: null,
        numberMoney: 1909,
        list: []
      }
    },
    methods: {
      getCarList () {
        this.$api.get('/ShoppingCar/List').then(res => {
          this.list = res.data
          if (this.list) {
            this.list.forEach(i => {
              i.active = false
              i.shoppingItem.forEach(k => {
                k.active = false
              })
            })
          }
        })
      },
      selectShop (index) {
        if (!this.list[index].active) {
          this.list[index].shoppingItem = this.list[index].shoppingItem.map(i => {
            i.active = true
            return i
          })
        } else {
          this.list[index].shoppingItem = this.list[index].shoppingItem.map(i => {
            i.active = false
            return i
          })
        }
        this.list[index].active = !this.list[index].active
        let obj = JSON.parse(JSON.stringify(this.list[index]))
        Vue.set(this.list, index, obj)
        this.initShopNumberMoney(index)
      },
      select (shopIndex, itemIndex) {
        let obj = JSON.parse(JSON.stringify(this.list[shopIndex]))
        obj.shoppingItem[itemIndex].active = !obj.shoppingItem[itemIndex].active
        Vue.set(this.list, shopIndex, obj)
        this.initShopNumberMoney(shopIndex)
      },
      // initNumberMoney (index) {
      //   this.numberMoney = 0
      //   this.list.forEach(i => {
      //     if (i.shoppingItem[index].active) {
      //       this.numberMoney += i.shoppingItem[index].amount * i.shoppingItem[index].price
      //     }
      //   })
      // },
      initShopNumberMoney (shopIndex) {
        let shopNumberMoney = 0
        for (let item of this.list[shopIndex].shoppingItem) {
          if (item.active) {
            shopNumberMoney += item.amount * item.price
          }
        }
        return shopNumberMoney
      },
      minusGood (shopIndex, itemIndex) {
        if (this.list[shopIndex].shoppingItem[itemIndex].amount > 1) {
          this.list[shopIndex].shoppingItem[itemIndex].amount--
          // this.initNumberMoney(itemIndex)
          this.initShopNumberMoney(shopIndex)
        }
      },
      addGood (shopIndex, itemIndex) {
        this.list[shopIndex].shoppingItem[itemIndex].amount++
        // this.initNumberMoney(itemIndex)
        this.initShopNumberMoney(shopIndex)
      }
    },
    created () {
      this.getCarList()
      // this.initNumberMoney()
      // this.initShopNumberMoney()
    }
  }
</script>

<style rel="stylesheet/less" lang="less">
  .shopping-cart {
    background-color: #F3F5F6;
    padding-bottom: 1.6rem;
    .goods {
      min-height: 100vh;
    }
    .shop-icon.weui_icon_success {
      color: #F37D31;
    }
    .pay-card {
      margin: .2rem;
      position: relative;
      margin-top: 0;
      background-color: #fff;
      padding: .2rem .2rem;
      display: flex;
      flex-direction: column;
      border-radius: .2rem;

      .shop {
        padding: 0 0 .24rem;
        border-bottom: 1px solid #ccc;

        .shop-name {
          font-size: .28rem;
          font-weight: 600;
          color: #333;
        }
      }

      .flex-box {
        display: flex;
        padding: .2rem;

        .good-setting {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: -.4rem;
          fill: #F37D31;
          font-size: .3rem;
          .money-setting {
            width: .6rem;
            text-align: center;
          }
        }
        .icon-checkbox {
          padding-top: .6rem;
        }

        img.good-img {
          border-radius: .2rem;
          height: 1.6rem;
          margin-left: .15rem;
          width: 1.6rem;
          margin-right: .2rem;
        }

        .info {
          flex: 1;

          .title {
            color: #353535;
            font-size: .36rem;
            padding-top: .24rem;
            padding-bottom: .24rem;
          }

          .timer {
            color: #999999;
            font-size: .28rem;
          }
        }

        .money {
          position: absolute;
          bottom: .2rem;
          right: .2rem;
          color: #F37D31;
          font-size: .36rem;
        }

        .weui-icon {
          font-size: .4rem;
        }

        .weui-icon-success {
          color: #F37D31;
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
        .pay {
          color: #F05A23;
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
