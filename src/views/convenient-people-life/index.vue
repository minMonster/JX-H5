<!-- crated：2019-06-18  author：Monster  -->
<template>
    <div class='convenient-people-life'>
        <img src="../../assets/convenient-people-life/banner.png" class="banner" alt="">
        <div class="tab-container">
            <div class="tab" v-for="(tab, index) in tabs" :key="index" @click="$router.push({path: tab.path})">
                <img :src="tab.imgSrc" alt="" class="logo">
                <p class="name">{{tab.name}}</p>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'convenient-people-life',
    data: function () {
      return {
        tabs: [
          { name: '家政服务', imgSrc: require('../../assets/convenient-people-life/logo_1_jiazheng.png'), path:'/domestic-services' },
          { name: '交易市场', imgSrc: require('../../assets/convenient-people-life/logo_2_jiaoyi.png'), path:'' },
          { name: '求职招聘', imgSrc: require('../../assets/convenient-people-life/logo_3_zhaopin.png'), path:'' },
          { name: '房屋租赁', imgSrc: require('../../assets/convenient-people-life/logo_4_fangwuzulin.png'), path:'' },
          { name: '违章查询', imgSrc: require('../../assets/convenient-people-life/logo_5_weizhang.png'), path:'' },
          { name: '客运查询', imgSrc: require('../../assets/convenient-people-life/logo_6_keyun.png'), path:'' },
          { name: '中考查询', imgSrc: require('../../assets/convenient-people-life/logo_7_zhongkao.png'), path:'' },
          { name: '重名查询', imgSrc: require('../../assets/convenient-people-life/logo_8_chongming.png'), path:'' }
        ]
      }
    }
  };
</script>
<style rel="stylesheet/less" lang="less">

    @import "../../styles/index.less";
    @import "../../styles/variable";

    .convenient-people-life {
        .banner {
            width: 100%;
        }

        .tab-container {
            padding: .38rem .14rem;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            .tab {
                width: 1.4rem;
                margin: 0 .1rem .6rem;

                .logo {
                    width: 1.4rem;
                    margin-bottom: .18rem;
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
    }
</style>
