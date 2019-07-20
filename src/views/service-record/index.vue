<!-- crated：2019-07-15  author：Monster  -->
<template>
    <div class='service-record'>
        <div class="notice-container" v-for="(item, index) in fakeData" :key="index">
<!--            <img :src="iconSrc" class="stateIcon" />-->
            <div class="notice">
                <div class="title-box">
                    <span class="title">{{item.title?item.titel:'标题'}}{{item.classfy?'('+item.classfy+')':''}}</span>
                    <!--                    <span class="area-name">({{item.areaName}})</span>-->
                </div>
                <p class="content">{{item.description}}</p>
                <p class="time">{{item.createTime}}</p>
                <div class="type">{{item.currentState}}</div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'service-record',
    data: function () {
      return {
        iconSrc: require('../../assets/property-notice/read_state_icon.png'),
        fakeData: [
          {
            title: '水电线路检修',
            areaName: '莒园区',
            content: '本月水电线路检修本月水电线路检修本月水电线路检修本月水电线路检修',
            time: '2019-07-13 21:45:44'
          },
          {
            title: '水电线路检修',
            areaName: '莒园区',
            content: '本月水电线路检修',
            time: '2019-07-13 21:45:44'
          },
          {
            title: '水电线路检修',
            areaName: '莒园区',
            content: '本月水电线路检修',
            time: '2019-07-13 21:45:44'
          }
        ]
      };
    },
    methods: {
      decodeUnicode (str) {
        str = str.replace(/banc/g, '%');
        return unescape(str);
      },
    },
    created () {
      this.$api.get('/HouseManage/allCprQuery?pageSize=100&offset=0').then(res => {
        this.fakeData = res.data;
      })
    }
  };
</script>
<style rel="stylesheet/less" lang="less">

    @import "../../styles/index.less";

    .service-record {
        .notice-container {
            padding: .38rem .24rem .2rem;
            display: flex;
            align-items: flex-start;
            border-bottom: .02rem solid @L4;

            .stateIcon {
                width: .8rem;
                margin-right: .3rem;
            }

            .notice {
                position: relative;
                flex: 1;
                .type {
                    position: absolute;
                    right: 0;
                    top: 0;
                    color: #F05A23;
                    font-size: .24rem;
                }
                .title-box {
                    vertical-align: baseline;
                    margin-bottom: .12rem;

                    .title, .area-name {
                        font-size: .28rem;
                        font-weight: 600;
                        font-family: @FM;
                        color: @T1;
                        line-height: .28rem;
                    }

                    .area-name {
                        font-size: .26rem;
                        color: red;
                        margin-left: .2rem;
                    }
                }
            }

            .content {
                font-size: .26rem;
                font-weight: 400;
                font-family: @FR;
                color: @T3;
                line-height: .32rem;
            }

            .time {
                font-size: .24rem;
                font-weight: 400;
                font-family: @FR;
                color: @T4;
                line-height: .24rem;
                text-align: left;
                margin-top: .18rem;
            }
        }
    }
</style>
