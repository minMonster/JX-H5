<!-- crated：2019-07-15  author：Monster  -->
<template>
  <div class='service-record' v-if="!loading">
    <div class="select" @click="openSelect"><span>{{selectObj.value}}</span></div>
    <transition name="fade">
      <div class="select-list" v-if="isSelect">
        <div class="list" @click="selectItem(item)" :class="{'active': selectObj.id === item.id}" v-for="item in list1"
             :key="item.id">{{item.name}}
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="make" @click="isSelect = false" v-if="isSelect"></div>
    </transition>

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
    <div v-if="fakeData.length === 0" style="text-align: center;padding-top: 1rem;">该房屋下暂无记录</div>
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
        ],
        list1: [],
        loading: true,
        selectObj: {},
        isSelect: false
      };
    },
    methods: {
      decodeUnicode (str) {
        str = str.replace(/banc/g, '%');
        return unescape(str);
      },
      openSelect () {
        this.isSelect = true;
      },
      selectItem (item) {
        this.selectObj = item;
        this.isSelect = false;
        this.getList();
      },
      getList () {
        return this.$api.post('/HouseManage/AppCprQuery', {
          pageSize: 100,
          offset: 0,
          tsbxlx: '',
          companyId: this.selectObj.companyId
        }).then(res => {
          this.fakeData = res.data;
        });
      }
    },
    created () {
      this.$api.get('/HouseManage/AllBindRoomQuery?isCertifi=已认证').then(res => {
        if (!res.data || res.data.length === 0) {
          this.$vux.alert.show({
            title: '您的账号没有房屋地址',
            content: '点击确定将返回家页面',
            onShow () {
            },
            onHide () {
              setupWebViewJavascriptBridge((bridge) => {
                bridge.callHandler('finish');
              });
            }
          });
        }
        let arr = res.data.map(i => {
          return {
            name: i.roomNum,
            value: i.roomNum,
            id: i.roomId,
            companyId: i.companyId
          };
        });
        this.list1 = arr;
        this.selectObj = this.list1[0];
        this.getList().then(res => {
          this.loading = false;
        })
      });
    }
  };
</script>
<style rel="stylesheet/less" lang="less">

  @import "../../styles/index.less";

  .service-record {
    background-color: #F3F5F6;
    height: 100vh;
    padding-top: .8rem;

    .select {
      position: fixed;
      z-index: 11;
      top: 0;
      width: 100vw;
      height: .6rem;
      text-align: center;
      background-color: #fff;
      font-size: .26rem;
      margin-bottom: .2rem;
      border-bottom: 1px solid #F3F5F6;
      line-height: .6rem;

      span {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
      }

      span:after {
        margin-top: .1rem;
        content: '  ';
        height: 0;
        width: 0;
        overflow: hidden;
        font-size: 0;
        line-height: 0;
        border-color: black transparent transparent transparent;
        border-style: solid;
        border-width: .1rem;
      }
    }

    .select-list {
      z-index: 11;
      position: fixed;
      top: .6rem;
      width: 100vw;
      background-color: #fff;

      .list {
        font-size: .26rem;
        height: .7rem;
        border-bottom: 1px solid #F3F5F6;
        text-align: center;
        line-height: .7rem;

        &.active {
          color: #067BF8;
        }
      }
    }

    .make {
      position: fixed;
      z-index: 10;
      background-color: rgba(0, 0, 0, .3);
      height: 100vh;
      width: 100vw;
    }

    .notice-container {
      background-color: #fff;
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

    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
  }
</style>
