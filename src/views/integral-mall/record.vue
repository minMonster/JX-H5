<template>
  <div class="integral-convert-record">
    <div class="convert-record-item" v-for="(item, index) in convertList" :key="index">
      <div class="left">
        <img :src="item.logo" alt="" class="logo">
        <div class="name">{{item.name}}</div>
      </div>
      <div class="right">
        <span class="red">-{{item.cost}}</span>
        积分
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'integral-convert-record',
    data: function () {
      return {
        convertList: [
          {
            name: '时尚床上用品',
            cost: 4000,
            logo: require('../../assets/integral-mall/integral-product.png')
          },
          {
            name: '时尚床上用品',
            cost: 4000,
            logo: require('../../assets/integral-mall/integral-product.png')
          },
          {
            name: '时尚床上用品',
            cost: 4000,
            logo: require('../../assets/integral-mall/integral-product.png')
          },
          {
            name: '时尚床上用品',
            cost: 4000,
            logo: require('../../assets/integral-mall/integral-product.png')
          },
          {
            name: '时尚床上用品',
            cost: 4000,
            logo: require('../../assets/integral-mall/integral-product.png')
          }
        ]
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">
  @import "../../styles/variable";
  @import "../../styles/index";

  .integral-convert-record {
    min-height: 100vh;
    border-top: 1px solid @B7;
    padding: .08rem .24rem .36rem;

    .convert-record-item {
      height: 1.32rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid @L4;

      .left {
        display: flex;
        align-items: center;

        .logo {
          width: .72rem;
          height: .72rem;
          margin-right: .18rem;
        }

        .name {
          width: 3rem;
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          font-size: .28rem;
          font-family: @FR;
          font-weight: 400;
          color: @T1;
          line-height: .28rem;
        }
      }

      .right {
        margin-right: .2rem;
        font-size: .2rem;
        font-family: @FR;
        font-weight: 400;
        color: @T3;
        line-height: .2rem;
        margin-bottom: -.05rem;

        .red {
          font-size: .32rem;
          font-weight: 600;
          color: @C4;
          vertical-align: bottom;
        }
      }
    }
  }
</style>
