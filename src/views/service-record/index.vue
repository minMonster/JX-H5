<!-- crated：2019-07-15  author：Monster  -->
<template>
  <div class='service-record'>
    <div class="select" ref="tab" @click="openSelect"><span>{{selectObj.value}}</span></div>
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
    <scroller :on-refresh="refresh" :on-infinite="infinite" noDataText="没有更多数据"
              :style="{height: contentHeight, top: contentTop}" style="width: 100%;">
      <div class="notice-container" @click="$router.push({path: '/service-record-detail', query: {serviceId: item.id, companyId: selectObj.companyId}})" v-for="(item, index) in fakeData" :key="index">
        <!--            <img :src="iconSrc" class="stateIcon" />-->
        <div class="notice">
          <div class="title-box">
            <span class="title">{{item.title?decodeUnicode(item.title):'标题'}}{{item.classfy?'('+item.classfy+')':''}}</span>
            <!--                    <span class="area-name">({{item.areaName}})</span>-->
          </div>
          <p class="content">{{decodeUnicode(item.content)}}</p>
          <p class="time">{{item.savetime}}</p>
          <p class="status" :style="{color: item.statusColor}">{{statusInit(item.processstatus)}}</p>
          <div class="type" :class="{'tousu': item.servicetypetext==='投诉'}">{{item.servicetypetext}}</div>
        </div>
      </div>
    </scroller>
    <div v-if="fakeData.length === 0" style="text-align: center;padding-top: 1rem;">该房屋下暂无记录</div>
  </div>
</template>

<script>
// import * as auth from '@/common/auth'
export default {
  name: 'service-record',
  data: function () {
    return {
      iconSrc: require('../../assets/property-notice/read_state_icon.png'),
      contentHeight: '',
      contentTop: '',
      fakeData: [
        // {
        //   title: '水电线路检修',
        //   areaName: '莒园区',
        //   content: '本月水电线路检修本月水电线路检修本月水电线路检修本月水电线路检修',
        //   time: '2019-07-13 21:45:44'
        // },
        // {
        //   title: '水电线路检修',
        //   areaName: '莒园区',
        //   content: '本月水电线路检修',
        //   time: '2019-07-13 21:45:44'
        // },
        // {
        //   title: '水电线路检修',
        //   areaName: '莒园区',
        //   content: '本月水电线路检修',
        //   time: '2019-07-13 21:45:44'
        // }
      ],
      list1: [],
      loading: true,
      selectObj: {},
      isSelect: false,
      pageSize: 15
    }
  },
  methods: {
    statusInit (status) {
      if (status === 0) {
        return '新增'
      } else if (status === 1 || status === 2) {
        return '进行中'
      } else if (status === 3 || status === 4) {
        return '待结项'
      } else if (status === 5 || status === 6) {
        return '完成'
      }
    },
    refresh (done) {
      this.pageSize = 15
      this.getList(done)
    },
    infinite (done) {
      this.pageSize += 15
      this.getList(done)
    },
    decodeUnicode (str) {
      if (!str) {
        return ''
      }
      console.log(str.replace(/jxt/g, '%'))
      return unescape(str.replace(/jxt/g, '%'))
    },
    openSelect () {
      this.isSelect = true
    },
    selectItem (item) {
      this.selectObj = item
      this.isSelect = false
      this.refresh()
      this.getList().then(() => {
        this.loading = false
      })
    },
    getList (done) {
      let params = {
        pageSize: this.pageSize,
        offset: 0,
        account: JSON.parse(sessionStorage.getItem('userInfo')).phone,
        type: 'list',
        companyId: this.selectObj.companyId
      }
      return this.$api.post('/HouseManage/Visit', {...params}).then(res => {
        if (res.success) {
          this.fakeData = res.data
          this.fakeData = this.fakeData.map((i) => {
            let status = i.processstatus
            if (status === 0) {
              i.statusColor = '#1B8DF6'
            } else if (status === 1 || status === 2) {
              i.statusColor = '#f3676d'
            } else if (status === 3 || status === 4) {
              i.statusColor = '#f9934d'
            } else if (status === 5 || status === 6) {
              i.statusColor = '#999999'
            }
            return i
          })
        }
        if (done) done(true)
      })
    }
  },
  mounted () {
    let tab = this.$refs.tab
    this.contentTop = tab.offsetHeight + 10 + 'px'
    this.contentHeight = document.documentElement.clientHeight - tab.offsetHeight - 10 + 'px'
    document.documentElement.scrollTop = document.body.scrollTop = 0
  },
  created () {
    this.$api.get('/HouseManage/GetBindCompanyQuery').then(res => {
      if (!res.data || res.data.length === 0) {
        this.$vux.alert.show({
          title: '您的账号没有房屋地址',
          content: '点击确定将返回家页面',
          onShow () {
          },
          onHide () {
            setupWebViewJavascriptBridge((bridge) => {
              bridge.callHandler('finish')
            })
          }
        })
      }
      let arr = res.data.map(i => {
        return {
          name: i.reserve1,
          value: i.reserve1,
          id: i.id,
          companyId: i.companyid
        }
      })
      this.list1 = arr
      this.selectObj = this.list1[0]
      this.getList().then(res => {
        this.loading = false
      })
    })
  }
}
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
      padding-left: 1rem;
      padding-bottom: .1rem;
      padding-right: .1rem;
      display: flex;
      align-items: flex-start;
      position: relative;

      &:before {
        content: ' ';
        background-color: @L4;
        height: 1px;
        width: 6.2rem;
        position: absolute;
        bottom: 0;
        left: 1rem;
      }
      .stateIcon {
        width: .8rem;
        margin-right: .3rem;
      }

      .notice {
        position: relative;
        flex: 1;

        .time {
          color: @T4;
          padding-top: .1rem;
          font-size: .24rem;
        }
        .status {
          position: absolute;
          right: .2rem;
          top: 0;
        }

        .title-box {
          vertical-align: baseline;
          margin-bottom: .12rem;

          .title, .area-name {
            font-size: .28rem;
            font-weight: bold;
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

      .type {
        font-size: .2rem;
        position: absolute;
        left: -0.8rem;
        width: .6rem;
        height: .6rem;
        border-radius: 50%;
        text-align: center;
        background: rgba(249,147,77,1);
        top: 0;
        font-weight: 400;
        font-family: @FR;
        color: #fff;
        line-height: .65rem;
        &.tousu {
          background: rgba(243,103,109,1);
        }
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
