<!-- crated：2019-06-23  author：Monster  -->
<template>
    <div class='on-site-repair'>
        <div class="sorter-container">
            <div class="sorter">
                综合排序
            </div>
        </div>
        <div class="recommend-container">
            <div class="recommend" v-for="(item, index) in lists" :key="index" @click="$router.push({ path: item.path })">
                <img :src="item.pic" alt="" class="pic">
                <div class="content">
                    <p class="title">{{item.title}}</p>
                    <p class="desc">{{item.content}}</p>
                    <p class="distance">距离{{item.distance}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'on-site-repair',
    data: function () {
      return {
        // lists: [
        //   {
        //     imgSrc: require('../../assets/on-site-repair/unlock.png'),
        //     title: '华叶防盗门开锁',
        //     desc: '快速上门，110备案安全认证快速上门，110备案安全认证',
        //     distance: '3.5km',
        //     path: '/domestic-services-detail'
        //   },
        //   {
        //     imgSrc: require('../../assets/on-site-repair/unlock.png'),
        //     title: '华叶防盗门开锁',
        //     desc: '快速上门，110备案安全认证快速上门，110备案安全认证',
        //     distance: '3.5km',
        //     path: '/domestic-services-detail'
        //   },
        //   {
        //     imgSrc: require('../../assets/on-site-repair/unlock.png'),
        //     title: '华叶防盗门开锁',
        //     desc: '快速上门，110备案安全认证快速上门，110备案安全认证',
        //     distance: '3.5km',
        //     path: '/domestic-services-detail'
        //   },
        //   {
        //     imgSrc: require('../../assets/on-site-repair/unlock.png'),
        //     title: '华叶防盗门开锁',
        //     desc: '快速上门，110备案安全认证快速上门，110备案安全认证',
        //     distance: '3.5km',
        //     path: '/domestic-services-detail'
        //   }
        // ],
        lists: []
      }
    },
    methods: {
      getHouseServiceList () {
        this.$api.get('/HouseService/List?ClassifyID=5&PageSize=4&PageIndex=1').then(res => {
          this.lists = res.data.serviceList
          document.title = res.data.name
        }).catch(e => {
          if (e.code) {
            this.$vux.toast(e.message)
          } else {
            this.$vux.toast(e)
          }
        })
      }
    },
    created () {
      this.getHouseServiceList()
    }
  };
</script>
<style rel="stylesheet/less" lang="less">

    @import "../../styles/index.less";
    @import "../../styles/variable";

    .on-site-repair {
        .sorter-container {
            height: .84rem;
            padding: .26rem .24rem;
            border-bottom: .02rem solid @B7;

            .sorter {
                font-size: .28rem;
                font-family: @FM;
                font-weight: 600;
                color: @T1;
                line-height: .32rem;
            }
        }

        .recommend-container {
            padding: .26rem .24rem;

            .recommend {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: .26rem;

                .pic {
                    width: 2rem;
                    border-radius: .06rem;
                    margin-right: .26rem;
                }

                .content {
                    border-bottom: .02rem solid @B7;
                    padding: .2rem .6rem .2rem 0;

                    .title {
                        font-size: .32rem;
                        font-family: @FM;
                        font-weight: 600;
                        color: @T1;
                        line-height: .32rem;
                        margin-bottom: .3rem;
                    }

                    .desc {
                        font-size: .28rem;
                        font-family: @FR;
                        font-weight: 400;
                        color: @T2;
                        line-height: .28rem;
                        margin-bottom: .38rem;
                        word-break: break-all;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                    }

                    .distance {
                        font-size: .24rem;
                        font-family: @FR;
                        font-weight: 400;
                        color: @T5;
                        line-height: .28rem;
                    }
                }
            }
        }
    }
</style>
