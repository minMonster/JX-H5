<!-- crated：2019-06-23  author：Monster  -->
<template>
    <div class='domestic-services'>
        <div class="tab-container" v-if="tabs.length > 0">
            <div class="tab" v-for="(tab, index) in tabs" :key="index"
                 @click="$router.push({ path: '/on-site-repair', query: {id: tab.id} })">
                <img :src="tab.pic?tab.pic:'http://122.14.208.91:8090/FileCenter/Image/2019-07-15/084b91ea-f4c0-49d6-8123-149dc8383eae.jpg'" alt="" class="logo">
                <p class="name">{{tab.name}}</p>
            </div>
        </div>
        <div class="separator"></div>
        <div class="recommend-container">
            <div class="recommend" @click="$router.push({path: 'domestic-services-detail', query:{id: item.id}})"
                 v-for="(item, index) in lists" :key="index">
                <div class="pic">
                    <img :src="item.pic?item.pic:'http://122.14.208.91:8090/FileCenter/Image/2019-07-15/084b91ea-f4c0-49d6-8123-149dc8383eae.jpg'" alt="" class="thumb">
                </div>
                <div class="content">
                    <p class="title ell">{{item.title}}</p>
                    <p class="desc" v-if="item.serviceScope">服务范围：{{item.serviceScope}}</p>
                    <p class="distance" v-if="item.distance">距离：{{item.distance}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'domestic-services',
    data: function () {
      return {
        // tabs: [
        //   { name: '上门维修', imgSrc: require('../../assets/domestic-services/logo_1_jiazheng_shangmen.png'), path:'/on-site-repair' },
        //   { name: '家电清洗', imgSrc: require('../../assets/domestic-services/logo_2_jiazheng_jiadian.png'), path:'' },
        //   { name: '保姆月嫂', imgSrc: require('../../assets/domestic-services/logo_3_jiazheng_baomu.png'), path:'' },
        //   { name: '家庭保洁', imgSrc: require('../../assets/domestic-services/logo_4_jiazheng_baojie.png'), path:'' }
        // ],
        tabs: [],
        // lists: [
        //   {
        //     imgSrc: require('../../assets/domestic-services/unlock.png'),
        //     title: '华叶防盗门开锁',
        //     desc: '快速上门，110备案安全认证快速上门，110备案安全认证'
        //   },
        //   {
        //     imgSrc: require('../../assets/domestic-services/unlock.png'),
        //     title: '华叶防盗门开锁',
        //     desc: '快速上门，110备案安全认证快速上门，110备案安全认证'
        //   },
        //   {
        //     imgSrc: require('../../assets/domestic-services/unlock.png'),
        //     title: '华叶防盗门开锁',
        //     desc: '快速上门，110备案安全认证快速上门，110备案安全认证'
        //   },
        //   {
        //     imgSrc: require('../../assets/domestic-services/unlock.png'),
        //     title: '华叶防盗门开锁',
        //     desc: '快速上门，110备案安全认证快速上门，110备案安全认证'
        //   }
        // ],
        lists: [],
      };
    },
    methods: {
      getHouseService () {
        this.$api.get('/HouseService/Index?ClassifyCount=4&ServiceCount=100').then(res => {
          this.tabs = res.data.classifyList;
          this.lists = res.data.serviceList;
            }).catch(e => {
          if (e.code) {
            this.$vux.toast(e.message);
          } else {
            this.$vux.toast(e);
          }
        });
      }
    },
    created () {
      this.getHouseService();
    }
  };
</script>
<style rel="stylesheet/less" lang="less">

    @import "../../styles/index.less";
    @import "../../styles/variable";

    .domestic-services {
        .tab-container {
            padding: .4rem .24rem .44rem;
            display: flex;
            justify-content: space-between;

            .tab {
                width: 1.4rem;

                .logo {
                    width: 100%;
                    height: 1.4rem;
                    margin-bottom: .2rem;
                }

                .name {
                    font-size: .24rem;
                    font-family: @FM;
                    font-weight: bold;
                    color: @T1;
                    line-height: .24rem;
                    text-align: center;
                }
            }
        }

        .separator {
            height: .12rem;
            background-color: @L4;
        }

        .recommend-container {
            padding: .44rem .24rem;

            .recommend {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: .28rem;

                .pic {
                    width: 2.4rem;
                    margin-right: .26rem;

                    .thumb {
                        width: 100%;
                        height: 1.62rem;
                        border-radius: .06rem;
                    }
                }

                .content {
                    overflow: hidden;
                    flex: 1;
                    min-height: 1.62rem;
                    border-bottom: .02rem solid @B7;
                    padding: .1rem .52rem .46rem 0;

                    .title {
                        font-size: .32rem;
                        font-family: @FM;
                        font-weight: bold;
                        color: @T1;
                        line-height: .35rem;
                        margin-bottom: .34rem;
                        overflow: hidden;
                    }

                    .desc {
                        font-size: .28rem;
                        font-family: @FR;
                        font-weight: 400;
                        color: @T2;
                        line-height: .35rem;
                        word-break: break-all;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                    }
                }
            }
        }
    }
</style>
