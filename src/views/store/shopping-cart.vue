<template>
    <div class="shopping-cart">
      <ul class="goods">
        <li class="pay-card" v-for="(shop, shopIndex) in list" :key="shop.id">
          <div class="shop">
            <icon class="shop-icon" @click.native='selectShop(shopIndex)' :type="shop.active? 'success' : 'circle'"></icon>
            <span class="shop-name" >{{shop.shopName}} 起送价：{{shop.deliveryMinAmount}}</span>
            <span class="to-shop"  @click="$router.push({path: '/store-list', query: {id: shop.shopId, deliveryMinAmount: shop.deliveryMinAmount}})">进入店铺</span>
          </div>
          <div class="flex-box" v-for="(item, itemIndex) in shop.shoppingItem" :key="item.id">
            <div class="icon-checkbox" @click="select(itemIndex, shopIndex)">
              <icon :type="item.active? 'success' : 'circle'"></icon>
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
        <div class="submit" @click="toCreatedOrder" :class="{disable: numMoney < deliveryMinAmount}">结算</div>
      </footer>
    </div>
</template>

<script>
  import { Icon } from 'vux'
  export default {
    name: 'shopping-cart',
    components: {
      Icon
    },
    data: function () {
      return {
        selectShopIndex: null,
        numberMoney: 0,
        selectGood: {
          shop: null,
          goods: []
        },
        list: [],
        numMoney: 0,
        deliveryMinAmount: 10
      }
    },
    methods: {
      delGoods (shopIndex, itemIndex) {
        this.$vux.loading.show()
        if(this.selectGood.shop === shopIndex) {
          let goodsIndex = this.selectGood.goods.indexOf(itemIndex)
          this.selectGood.goods.splice(goodsIndex, 1)
        }
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
            let promiseArr = []

            this.list.forEach(i => {
              i.active = false
              i.shoppingItem.forEach(k => {
                k.active = false
              })
              promiseArr.push(this.$api.get('/shop/getById?id=' + i.shopId))
            })
            Promise.all(promiseArr).then(res => {
              console.log(res)
              this.list.forEach(i => {
                res.forEach(k => {
                  if (i.id === k.data.shopId) {
                    i.deliveryMinAmount = k.data.deliveryMinAmount
                  }
                })
              })
              this.list = JSON.parse(JSON.stringify(this.list))
            })
          }
        })
      },
      selectShop (index) {
        this.selectGood.shop = index
        this.list.forEach((i, listIndex) => {
          if (index === listIndex) {
            this.list[index].active = !i.active
            i.shoppingItem.forEach(e => {
              e.active = i.active
            })
            this.$set(this.list, listIndex, this.list[index]);
          } else {
            i.active = false
            i.shoppingItem.forEach(e => {
              e.active = false
            })
            this.$set(this.list, listIndex, i);
          }
        })
        this.computedMoney()
      },
      select (index, shopIndex) {
        if (this.list[shopIndex].active) {
          let swSelct = false
          this.list[shopIndex].shoppingItem[index].active = !this.list[shopIndex].shoppingItem[index].active
          this.list[shopIndex].shoppingItem.forEach(e => {
            if (e.active) {
              swSelct = true
            }
          })
          if (!swSelct) {
            this.list[shopIndex].active = false
          }
          this.$set(this.list, shopIndex, this.list[shopIndex]);
        } else {
          this.$vux.toast.text('请选择超市')
        }
        this.computedMoney()
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
            this.computedMoney()
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
          this.computedMoney()
        })
      },
      toCreatedOrder () {
        if (this.numMoney < this.deliveryMinAmount) {
          this.$vux.toast.text('未达到起送价格')
          return
        }
        let swReturn = null
        this.list.forEach(i => {
          if (i.active) {
            swReturn = i
          }
        })
        if (swReturn === null) {
          this.$vux.toast.text('至少选择一件商品')
        } else {
          let goods = {}
          goods.shopId = swReturn.shopId
          let arr = swReturn.shoppingItem
          goods.shoppingItems = []
          arr.forEach(i => {
            if (i.active) {
              goods.shoppingItems.push(i)
            }
          })
          goods.totalMoney = this.numMoney
          goods.shopName = swReturn.shopName
          localStorage.setItem('goods', JSON.stringify(goods))
          console.log(goods)
          this.$router.replace({path: '/store-created-order'})
        }
      },
      computedMoney () {
        let num = 0
        this.list.forEach((i) => {
          if (i.active) {
            this.deliveryMinAmount = i.deliveryMinAmount
            i.shoppingItem.forEach(e => {
              if (e.active) {
                num += e.price * e.amount
              }
            })
          }
        })
        this.numMoney = num
        this.numMoney = Number(this.numMoney.toFixed(2))
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
        &.disable {
          background-color: #999999;
          color: #fff;
        }
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
