<!-- crated：2019-06-23  author：Monster  -->
<template>
    <div class='domestic-services'>
        <div class="tab-container">
            <div class="tab" v-for="(tab, index) in tabs" :key="index" @click="$router.push({ path: tab.path })">
                <img :src="tab.imgSrc" alt="" class="logo">
                <p class="name">{{tab.name}}</p>
            </div>
        </div>
        <div class="separator"></div>
        <div class="recommend-container">
            <div class="recommend" v-for="(item, index) in lists" :key="index">
                <img :src="item.imgSrc" alt="" class="pic">
                <div class="content">
                    <p class="title">{{item.title}}</p>
                    <p class="desc">{{item.desc}}</p>
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
        tabs: [
          { name: '上门维修', imgSrc: require('../../assets/domestic-services/logo_1_jiazheng_shangmen.png'), path:'/on-site-repair' },
          { name: '家电清洗', imgSrc: require('../../assets/domestic-services/logo_2_jiazheng_jiadian.png'), path:'' },
          { name: '保姆月嫂', imgSrc: require('../../assets/domestic-services/logo_3_jiazheng_baomu.png'), path:'' },
          { name: '家庭保洁', imgSrc: require('../../assets/domestic-services/logo_4_jiazheng_baojie.png'), path:'' }
        ],
        lists: [
          {
            imgSrc: require('../../assets/domestic-services/unlock.png'),
            title: '华叶防盗门开锁',
            desc: '快速上门，110备案安全认证快速上门，110备案安全认证'
          },
          {
            imgSrc: require('../../assets/domestic-services/unlock.png'),
            title: '华叶防盗门开锁',
            desc: '快速上门，110备案安全认证快速上门，110备案安全认证'
          },
          {
            imgSrc: require('../../assets/domestic-services/unlock.png'),
            title: '华叶防盗门开锁',
            desc: '快速上门，110备案安全认证快速上门，110备案安全认证'
          },
          {
            imgSrc: require('../../assets/domestic-services/unlock.png'),
            title: '华叶防盗门开锁',
            desc: '快速上门，110备案安全认证快速上门，110备案安全认证'
          }
        ]
      }
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
                    margin-bottom: .2rem;
                }

                .name {
                    font-size: .24rem;
                    font-family: @FM;
                    font-weight: 600;
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
                    border-radius: .06rem;
                    margin-right: .26rem;
                }

                .content {
                    border-bottom: .02rem solid @B7;
                    padding: .2rem .52rem .46rem 0;

                    .title {
                        font-size: .32rem;
                        font-family: @FM;
                        font-weight: 600;
                        color: @T1;
                        line-height: .32rem;
                        margin-bottom: .34rem;
                    }

                    .desc {
                        font-size: .28rem;
                        font-family: @FR;
                        font-weight: 400;
                        color: @T2;
                        line-height: .28rem;
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
