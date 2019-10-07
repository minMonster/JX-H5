<template>
    <div class="shopping-cart">
      <ul class="goods">
        <li class="pay-card" v-for="(shop, shopIndex) in list" :key="shopIndex">
          <div class="shop">
            <icon class="shop-icon" @click.native='selectShop(shopIndex)' :type="shopIndex ===  selectGood.shop? 'success' : 'circle'"></icon>
            <span class="shop-name" >{{shop.shopName}}</span>
            <span class="to-shop"  @click="$router.push({path: '/store-list', query: {id: shop.shopID}})">进入店铺</span>
          </div>
          <div class="flex-box" v-for="(item, itemIndex) in shop.shoppingItem" :key="itemIndex">
            <div class="icon-checkbox" @click="select(itemIndex, shopIndex)">
              <icon :type="shopIndex ===  selectGood.shop && selectGood.goods.indexOf(itemIndex) !== -1? 'success' : 'circle'"></icon>
            </div>
            <img class="good-img" :src="item.pic" alt="">
            <div class="info">
              <div class="title">{{item.name}}</div>
              <div class="timer">{{item.des}}</div>
              <div class="good-del-icon icon-del" @click="delGoods(shopIndex, itemIndex)">
                <span>删除</span>
                <svg-icon icon-class="_ionicons_svg_md-trash"></svg-icon>
              </div>
              <div class="good-setting">
                <x-icon type="ios-minus" @click.native="minusGood(shopIndex, itemIndex)" size="30"></x-icon>
                <div class="money-setting">{{item.amount}}</div>
                <x-icon type="ios-plus-outline" @click.native="addGood(shopIndex, itemIndex)" size="30"></x-icon>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="empty-des" v-if="list.length === 0">暂时没有商品</div>
      <footer>
        <div class="money">
          <span>合计</span>
          <span class="pay">￥{{numMoney}}元</span>
        </div>
        <div class="submit" @click="toCreatedOrder">结算</div>
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
        selectGood: {
          shop: null,
          goods: []
        },
        list: []
      }
    },
    methods: {
      delGoods (shopIndex, itemIndex) {
        this.$vux.loading.show()
        this.$api.post('/ShoppingCar/Delete', {
          shoppingCarID: this.list[shopIndex].shoppingItem[itemIndex].id
        }).then(() => {
          this.getCarList()
          this.$vux.loading.hide()
        })
      },
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
        this.selectGood.shop = index
        this.selectGood.goods = []
        for(let i = 0; i < this.list[index].shoppingItem.length; i++) {
          this.selectGood.goods.push(i)
        }
      },
      select (index, shopIndex) {
        if (shopIndex !== this.selectGood.shop) {
          if (this.selectGood.shop === null) {
            this.selectGood.shop = shopIndex
            this.selectGood.goods.push(index)
          } else {
            this.$vux.toast.text('请选择超市')
          }
          return
        }
        let arr = this.selectGood.goods
        if (arr.indexOf(index) !== -1) {
          arr.splice(arr.indexOf(index), 1)
        } else {
          arr.push(index)
        }
        if (arr.length === 0) {
          this.selectGood.shop = null
        }
      },
      minusGood (shopIndex, itemIndex) {
        if (this.list[shopIndex].shoppingItem[itemIndex].amount > 1) {
          this.list[shopIndex].shoppingItem[itemIndex].amount--
          this.$vux.loading.show()
          this.$api.post('/ShoppingCar/Update', {
            shoppingCarID: this.list[shopIndex].shoppingItem[itemIndex].id,
            amount: this.list[shopIndex].shoppingItem[itemIndex].amount
          }).then(() => {
            this.$vux.loading.hide()
          })
        }
      },
      addGood (shopIndex, itemIndex) {
        this.$vux.loading.show()
        this.list[shopIndex].shoppingItem[itemIndex].amount++
        this.$api.post('/ShoppingCar/Update', {
          shoppingCarID: this.list[shopIndex].shoppingItem[itemIndex].id,
          amount: this.list[shopIndex].shoppingItem[itemIndex].amount
        }).then(() => {
          this.$vux.loading.hide()
        })
      },
      toCreatedOrder () {
        if (this.selectGood.shop !== null && this.numMoney > 0) {
          let goods = {}
          goods.shopId = this.list[this.selectGood.shop].shopId
          let arr = this.selectGood.goods
          goods.shoppingItems = []
          arr.forEach(i => {
            goods.shoppingItems.push(this.list[this.selectGood.shop].shoppingItem[i])
          })
          goods.totalMoney = this.numMoney
          goods.shopName = this.list[this.selectGood.shop].shopName
          localStorage.setItem('goods', JSON.stringify(goods))
          this.$router.push({path: '/store-created-order'})
        } else {
          this.$vux.toast.text('至少选择一件商品')
        }
      }
    },
    computed: {
      numMoney () {
        let num = 0
        if (this.selectGood.shop !== null) {
          let arr = this.selectGood.goods
          arr.forEach(i => {
            num += this.list[this.selectGood.shop].shoppingItem[i].price *this.list[this.selectGood.shop].shoppingItem[i].amount
          })
        }
        return num.toFixed(2)
      }
    },
    created () {
      this.getCarList()
    }
  }
</script>

<style rel="stylesheet/less" type="text/less" lang="less">
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
        display: flex;
        align-items: center;
        .shop-name {
          font-size: .28rem;
          font-weight: 600;
          color: #333;
          flex: 1;
        }
        .to-shop {
        }
      }

      .flex-box {
        display: flex;
        padding: .2rem;


        .icon-checkbox {
          padding-top: .6rem;
        }

        img.good-img {
          border: 1px solid #F37D31;
          border-radius: .2rem;
          height: 1.6rem;
          margin-left: .15rem;
          width: 1.6rem;
          margin-right: .2rem;
        }

        .info {
          flex: 1;
          position: relative;

          .title {
            color: #353535;
            font-size: .36rem;
          }

          .timer {
            color: #999999;
            font-size: .28rem;
          }

          .icon-del {
            position: absolute;
            right: 0;
            top: 0;
            font-size: .35rem;
            span {
              font-size: .26rem;
            }
          }

          .good-setting {
            position: absolute;
            right: 0;
            bottom: 0;
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
    .empty-des {
      position: fixed;
      top: 50%;
      font-size: .35rem;
      width: 100vw;
      text-align: center;
    }
  }
</style>
