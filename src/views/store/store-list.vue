<template>
  <div class="store-list">
    <ul class="tabs">
      <li v-for="item in 10">
        <img src="" alt="">
        <p>商品描述</p>
      </li>
    </ul>
    <ul class="goods">
      <li v-for="item in 100">
        <img class="good-img" src="../../assets/Uncertified.png" alt="">
        <p class="good-name">商品名称</p>
        <p class="good-des">商品描述</p>
        <div class="good-operation">
          <div class="pay">
            <span>￥</span>62
          </div>
          <div class="add-cart">
            <svg-icon icon-class="_ionicons_svg_md-add" class="icon-close"></svg-icon>
          </div>
        </div>
      </li>
    </ul>
    <footer>
      <div class="money">
        <svg-icon icon-class="_ionicons_svg_md-cart" class="cart_ionicons_svg_md"></svg-icon>
        <span class="pay">￥123元</span>
        <span class="des">100元起送</span>
      </div>
      <div class="submit">结算</div>
    </footer>
  </div>
</template>

<script>
  import { Icon } from 'vux'

  export default {
    name: 'store-list',
    components: {
      Icon
    }
  }
</script>

<style rel="stylesheet/less" lang="less">
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
        .good-img {
          width: 3rem;
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
