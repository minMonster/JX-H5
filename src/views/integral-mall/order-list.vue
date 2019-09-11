<!-- crated：2019-07-15  author：Monster  -->
<template>
  <div class='order-list'>
    <scroller :on-refresh="refresh" :on-infinite="infinite" noDataText="没有更多数据"
              :style="{height: contentHeight, top: contentTop}" style="width: 100%;">
      <div class="notice-container"  v-for="item in lists" :key="item.id">
        <!--            <img :src="iconSrc" class="stateIcon" />-->
        <div class="notice">
          <div class="title-box">
            <span class="title">{{item.name}}</span>
            <!--                    <span class="area-name">({{item.areaName}})</span>-->
          </div>
          <p class="content">content</p>
          <p class="time">{{item.payDate}}</p>
          <p class="status">status</p>
          <div class="type">积分</div>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
  // import * as auth from '@/common/auth'
  export default {
    name: 'service-record',
    data: function () {
      return {
        contentHeight: '',
        contentTop: 0,
        lists: [],
        loading: true,
        pageSize: 15
      }
    },
    methods: {
      refresh (done) {
        this.pageSize = 15
        this.getList(done)
      },
      infinite (done) {
        this.pageSize += 15
        this.getList(done)
      },
      getList (done) {
        done(true)
        this.$api.get('/Order/List', {
          params: {
            UserId: JSON.parse(sessionStorage.getItem('userInfo')).id,
            PageSize: 100,
            PageIndex: 1
          }
        }).then(res => {
          this.lists = res.data.list
        })
      }
    },
    mounted () {
      this.contentHeight = document.documentElement.clientHeight + 'px'
    },
    created () {
    }
  }
</script>
<style rel="stylesheet/less" lang="less">

  @import "../../styles/index.less";

  .order-list {
    background-color: #F3F5F6;
    height: 100vh;
    padding-top: .8rem;

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
  }
</style>
