<template>
  <div class="integral-convert-record">
    <div class="convert-record-item" v-for="order in convertList" :key="order.id">
      <div class="left">
        <img :src="order.detailList.pic" alt="" class="logo">
        <div class="name">{{order.detailList.name}}</div>
      </div>
      <div class="right">
        <span class="red">-{{order.detailList.score}}</span>
        积分
      </div>
    </div>
    <div class="no-data" v-if="!convertList">暂无记录</div>
  </div>
</template>

<script>
  export default {
    name: 'integral-convert-record',
    data: function () {
      return {
        convertList: [
          // {
          //   name: '时尚床上用品',
          //   cost: 4000,
          //   logo: require('../../assets/integral-mall/integral-product@2x.png')
          // },
          // {
          //   name: '时尚床上用品',
          //   cost: 4000,
          //   logo: require('../../assets/integral-mall/integral-product@2x.png')
          // },
          // {
          //   name: '时尚床上用品',
          //   cost: 4000,
          //   logo: require('../../assets/integral-mall/integral-product@2x.png')
          // },
          // {
          //   name: '时尚床上用品',
          //   cost: 4000,
          //   logo: require('../../assets/integral-mall/integral-product@2x.png')
          // },
          // {
          //   name: '时尚床上用品',
          //   cost: 4000,
          //   logo: require('../../assets/integral-mall/integral-product@2x.png')
          // }
        ],
        pageOptions: {
          pageIndex: 1,
          pageSize: 10
        }
      }
    },
    methods: {
      getOrderList () {
        let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
        this.$api.get('/Order/List?userId=' + userInfo.id + '&status=UnReceive&pageIndex=' + this.pageOptions.pageIndex + '&pageSize=' + this.pageOptions.pageSize).then(res => {
          res.data.list.forEach(order => {
            this.convertList.push(order.detailList)
          })
        }).catch(err => {
          if (err.code) {
            this.$vux.toast(err.message)
          } else {
            this.$vux.toast(err)
          }
        })
      }
      // getList () {
      //   this.$api.get('/UserSign/UserList').then(res => {
      //     console.log(res)
      //   })
      // }
    },
    created () {
      this.getOrderList()
      // this.getList()
      // console.log(123)
      // console.log(this.convertList)
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
        }
      }

      .right {
        margin-right: .2rem;
        font-size: .2rem;
        font-family: @FR;
        font-weight: 400;
        color: @T3;
        margin-bottom: -.05rem;

        .red {
          font-size: .32rem;
          font-weight: 600;
          color: @C4;
          vertical-align: bottom;
        }
      }
    }
    
    .no-data {
      font-size: .28rem;
      font-family: @FM;
      font-weight: 600;
      color: @T3;
      text-align: center;
      margin-top: .36rem;
    }
  }
</style>
