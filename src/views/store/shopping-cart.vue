<template>
    <div class="shopping-cart">
      <ul class="goods">
        <li class="pay-card" v-for="(item, index) in list" :key="item.id">
          <div class="icon-checkbox" @click="select(index)">
            <icon :type="item.active?'success':'circle'"></icon>
          </div>
          <img class="good-img" :src="item.shoppingItem.pic" alt="">
          <div class="info">
            <div class="title">{{item.shoppingItem.name}}</div>
            <div class="timer">{{item.shoppingItem.des}}</div>
          </div>
          <div class="good-setting">
            <x-icon type="ios-minus" @click.native="minusGood(index)" size="30"></x-icon>
            <div class="money-setting">{{item.shoppingItem.amount}}</div>
            <x-icon type="ios-plus-outline" @click.native="addGood(index)" size="30"></x-icon>
          </div>
          <div class="money">¥{{item.shoppingItem.price * item.shoppingItem.amount}}</div>
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

  export default {
    name: 'shopping-cart',
    components: {
      Icon
    },
    data: function () {
      return {
        numberMoney: 0,
        list: []
        // list: [
        //   {
        //     num: 1,
        //     active: true,
        //     name: '商品1',
        //     des: '描述',
        //     money: 123
        //   },
        //   {
        //     num: 1,
        //     active: true,
        //     name: '商品2',
        //     des: '描述',
        //     money: 123
        //   },
        //   {
        //     num: 1,
        //     active: false,
        //     name: '商品3',
        //     des: '描述',
        //     money: 123
        //   },
        //   {
        //     num: 1,
        //     active: true,
        //     name: '商品4',
        //     des: '描述',
        //     money: 123
        //   }
        // ]
      }
    },
    methods: {
      getCarList () {
        this.$api.get('/ShoppingCar/List').then(res => {
          // this.list = res.data
          console.log(res)
        })
      },
      select (index) {
        this.list[index].active = !this.list[index].active
        this.initNumberMoney()
      },
      initNumberMoney () {
        this.numberMoney = 0
        this.list.forEach(i => {
          if (i.active) {
            this.numberMoney += i.num * i.money
          }
        })
      },
      minusGood (index) {
        if (this.list[index].num > 0) {
          this.list[index].num--
          this.initNumberMoney()
        }
      },
      addGood (index) {
        this.list[index].num++
        this.initNumberMoney()
      }
    },
    created () {
      this.getCarList()
      this.initNumberMoney()
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
    .pay-card {
      margin: .2rem;
      position: relative;
      margin-top: 0;
      background-color: #fff;
      padding: .2rem .2rem;
      display: flex;
      border-radius: .2rem;

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
</style>
