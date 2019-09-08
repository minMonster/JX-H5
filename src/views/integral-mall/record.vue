<template>
  <div class="integral-convert-record">
    <scroller :on-refresh="refresh" :on-infinite="infinite" noDataText="没有更多数据"
              :style="{height: contentHeight, top: 0}" style="width: 100%;">
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
      <!--<div class="no-data" v-if="!convertList.length">暂无记录</div>-->
    </scroller>
  </div>
</template>

<script>
  export default {
    name: 'integral-convert-record',
    data: function () {
      return {
        contentHeight: '',
        contentTop: '',
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
      refresh (done) {
        this.convertList = []
        this.pageOptions.pageSize = 15
        this.getOrderList(done)
      },
      infinite (done) {
        this.pageOptions.pageSize += 15
        this.getOrderList(done)
      },
      getOrderList (done) {
        // let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
        this.$api.get('/UserScore/ExchangeRecord?' + 'pageIndex=' + this.pageOptions.pageIndex + '&pageSize=' + this.pageOptions.pageSize).then(res => {
          this.convertList = res.data.list
          console.log(this.convertList)
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
    mounted () {
      this.contentHeight = document.documentElement.clientHeight
      this.contentTop = 0
    },
    created () {
      this.getOrderList()
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
