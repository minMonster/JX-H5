<template>
    <div class="property-notice">
        <div class="notice-container" @click="toDetail(item)" v-for="(item, index) in noticeList" :key="index">
            <img :src="iconSrc" class="stateIcon" />
            <div class="notice">
                <div class="title-box">
                    <span class="title">{{item.title}}</span>
<!--                    <span class="area-name">({{item.areaName}})</span>-->
                </div>
                <p class="content">{{item.briefcontent}}</p>
                <p class="time">{{item.time}}</p>
            </div>
        </div>
    </div>
</template>

<script>
  import * as auth from '@/common/auth';

  export default {
    name: "property-notice",
    data: function () {
      return {
        unread: true,
        iconSrc: require('../../assets/property-notice/read_state_icon.png'),
        noticeList: [],
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
      }
    },
    created () {
      this.$api.get('/HouseManage/allNoticeQuery?pageSize=10&&offset=0').then(res => {
        this.noticeList = res.data;
      })
       // = this.fakeData
    },
    methods: {
      toDetail (item) {
        sessionStorage.setItem('propertyNotice', JSON.stringify(item));
        this.$router.push({path: 'property-notice-detail', query: {id: item.sid}})
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">
    @import "../../styles/index.less";
    @import "../../styles/variable";

    .property-notice {
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
                flex: 1;

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
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }

            .time {
                font-size: .24rem;
                font-weight: 400;
                font-family: @FR;
                color: @T4;
                line-height: .24rem;
                text-align: right;
                margin-top: .18rem;
            }
        }
    }
</style>
