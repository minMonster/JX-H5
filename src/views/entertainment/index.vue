<template>
  <div class="entertainment">
    <div class="sorter-container">
      <div class="sorter" v-for="(sorter, index) in sorters" :key="index">
        <span class="name">{{sorter.name}}</span>
        <div class="triangle"></div>
      </div>
    </div>
    <div class="entertainment-project" @click="$router.push({path: '/store-list'})" v-for="(item, index) in lists" :key="index">
      <img :src="item.pic" alt="" class="pic">
      <div class="info-container">
        <p class="name">{{item.name}}</p>
        <div class="star">
          <div class="star-single" v-for="(star, id) in 5" :key="id">
            <img src="../../assets/entertainment/star_bright.png" alt="" class="star-thumb" v-if="item.stars>id">
            <img src="../../assets/entertainment/star_dark.png" alt="" class="star-thumb" v-else>
          </div>
        </div>
        <div class="footer">
          <span class="address">{{item.address}}</span>
          <span class="distance">{{item.distance}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'entertainment',
  data: function () {
    return {
      sorters: [
        { name: '距离' },
        { name: '价格' },
        { name: '评价' }
      ],
      lists: [
        {
          name: '芒果KTV',
          pic: require('../../assets/entertainment/project_thumb.jpg'),
          stars: 3,
          address: '青年路附近青年路附近青年路附近青年路附近',
          distance: '4.8km'
        },
        {
          name: '沃德量版式KTV',
          pic: require('../../assets/entertainment/project_thumb.jpg'),
          stars: 0,
          address: '莒县中心城区',
          distance: '3.7km'
        },
        {
          name: '芒果KTV',
          pic: require('../../assets/entertainment/project_thumb.jpg'),
          stars: 4,
          address: '青年路附近青年路附近青年路附近青年路附近',
          distance: '4.8km'
        },
        {
          name: '沃德量版式KTV',
          pic: require('../../assets/entertainment/project_thumb.jpg'),
          stars: 2,
          address: '莒县中心城区',
          distance: '3.7km'
        },
        {
          name: '芒果KTV',
          pic: require('../../assets/entertainment/project_thumb.jpg'),
          stars: 1,
          address: '青年路附近青年路附近青年路附近青年路附近',
          distance: '4.8km'
        },
        {
          name: '芒果KTV',
          pic: require('../../assets/entertainment/project_thumb.jpg'),
          stars: 5,
          address: '青年路附近青年路附近青年路附近青年路附近',
          distance: '4.8km'
        }
      ]
    }
  },
  created () {
    this.$api.get('/Shop/List')
  }
}
</script>

<style rel="stylesheet/less" lang="less">
@import "../../styles/index.less";
@import "../../styles/variable";
  .entertainment {
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
      height: 2.12rem;
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
        flex: 1;
        flex-direction: column;

        .name {
          font-size: .28rem;
          font-family: @FM;
          font-weight: 600;
          color: @T1;
          line-height: .28rem;
          margin-top: .11rem;
          margin-bottom: .18rem;
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
