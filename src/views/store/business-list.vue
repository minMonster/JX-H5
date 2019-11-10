<template>
  <div class="business-list">
<!--    <div class="sorter-container" ref="header">-->
<!--      <div class="sorter" v-for="(sorter, index) in sorters" :key="index">-->
<!--        <span class="name">{{sorter.name}}</span>-->
<!--        <div class="triangle"></div>-->
<!--      </div>-->
<!--    </div>-->
    <scroller :on-refresh="refresh" :on-infinite="infinite" noDataText="没有更多数据"
              :style="{height: contentHeight, top: contentTop}" style="width: 100%;">
      <div class="entertainment-project" @click="$router.push({path: '/store-list', query: {id: item.id,deliveryMinAmount: item.deliveryMinAmount}})" v-for="(item, index) in lists" :key="index">
        <img :src="item.pic" alt="" class="pic">
        <div class="info-container">
          <p class="name">{{item.name}}</p>
<!--          <div class="star">-->
<!--            <div class="star-single" v-for="(star, id) in 5" :key="id">-->
<!--              <img src="../../assets/entertainment/star_bright.png" alt="" class="star-thumb" v-if="true">-->
<!--              <img src="../../assets/entertainment/star_dark.png" alt="" class="star-thumb" v-else>-->
<!--            </div>-->
<!--          </div>-->
          <p><label>起送价：</label>{{item.deliveryMinAmount}}</p>
          <div class="icon-text" v-if="item.deliveryType !== 3">{{item.deliveryType === 1? '商家配送': '自取'}}</div>
          <div class="icon-text" style="width: 1.8rem" v-else>配送或自取</div>
<!--          <p><label>销量：</label>{{item.deliveryFreeAmount}}</p>-->
          <div class="footer">
            <span class="address">{{item.address}}</span>
            <span class="distance">{{item.distance}}</span>
          </div>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
  export default {
    name: 'business-list',
    data: function () {
      return {
        contentHeight: '',
        contentTop: '',
        sorters: [
          { name: '距离' },
          { name: '价格' },
          { name: '评价' }
        ],
        lists: [],
        // lists: [
        //   {
        //     name: '芒果KTV',
        //     pic: require('../../assets/entertainment/project_thumb.jpg'),
        //     stars: 3,
        //     address: '青年路附近青年路附近青年路附近青年路附近',
        //     distance: '4.8km'
        //   }
        // ]
        pageOptions: {
          pageIndex: 1,
          pageSize: 20,
          id: 0
        }
      }
    },
    methods: {
      getShopList (done) {
        this.$api.get('/Shop/List?pageIndex=' + this.pageOptions.pageIndex + '&pageSize=' + this.pageOptions.pageSize).then(res => {
          this.lists = res.data.list
          if (done) done(true)
        })
      },
      refresh (done) {
        this.lists = []
        this.pageOptions.pageSize = 15
        this.getShopList(done)
      },
      infinite (done) {
        this.pageOptions.pageSize += 15
        this.getShopList(done)
      }
    },
    mounted () {
      // let header = this.$refs.header
      // this.contentHeight = document.documentElement.clientHeight - header.offsetHeight - 10 + 'px'
      // this.contentTop = header.offsetHeight + 10 + 'px'
      this.contentHeight = document.documentElement.clientHeight + 'px'
      this.contentTop = 0
      document.documentElement.scrollTop = document.body.scrollTop = 0
    }
  }
</script>

<style rel="stylesheet/less" lang="less">
  @import "../../styles/index.less";
  @import "../../styles/variable";
  .business-list {
    position: relative;
    min-height: 100vh;
    background-color: @B7;
    padding: 1.12rem .24rem .38rem;
    .sorter-container {
      position: fixed;
      top: 0;
      left: 0;
      height: .86rem;
      width: 100%;
      background-color: @B2;
      display: flex;
      justify-content: space-around;
      align-items: center;

      .sorter {
        padding: .2rem;
        display: flex;

        .name {
          font-size: .28rem;
          font-family: @FM;
          font-weight: 600;
          color: @T1;
          line-height: .32rem;
          margin-right: .16rem;
        }

        .triangle {
          width: 0;
          height: 0;
          border-width: .1rem;
          border-style: solid;
          border-color: #D3D7D9 transparent transparent transparent;
          margin-top: .12rem;
        }
      }
    }

    .entertainment-project {
      padding: .25rem .2rem .26rem .27rem;
      margin-bottom: .24rem;
      background-color: @B2;
      border-radius: .04rem;
      display: flex;
      &:last-child {
        margin-bottom: 0;
      }

      .pic {
        width: 2.88rem;
        height: 1.61rem;
        border-radius: .04rem;
        margin-right: .13rem;
      }

      .info-container {
        display: flex;
        position: relative;
        flex: 1;
        flex-direction: column;

        .name {
          font-size: .30rem;
          font-family: @FM;
          font-weight: 600;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 3rem;
          color: @T1;
          margin-top: .11rem;
          margin-bottom: .18rem;
        }
        .icon-text {
          position: absolute;
          right: 0;
          top: 0;
          height: .4rem;
          font-size: .24rem;
          line-height: .4rem;
          padding: 0 .1rem;
          color: #6595F4;
          text-align: center;
          width: 1.4rem;
        }
        .star {
          display: flex;
          flex: 1;
          margin-left: .08rem;

          .star-single {
            margin-right: .12rem;
            width: .24rem;
            height: .22rem;
          }
        }

        .footer {
          display: flex;
          justify-content: space-between;

          .address {
            font-size: .24rem;
            font-family: @FR;
            font-weight: 400;
            color: @T2;
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-all;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
          }

          .distance {
            font-size: .2rem;
            font-family: @FR;
            font-weight:400;
            color: @T3;
            margin-left: .2rem;
          }
        }
      }
    }
  }
</style>
