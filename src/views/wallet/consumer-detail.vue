<template>
  <div class="consumer-detail">
    <scroller :on-refresh="refresh" :on-infinite="infinite" :style="{height: contentHeight + 'px'}" noDataText="没有更多数据" style="width: 100%;margin-top: 44px">
      <div class="list" :key="item.id" v-for="item in list">
        <div class="title">
          {{item.remarks}}
        </div>
        <p class="money">{{item.amount / 100}}</p>
        <p class="time">{{item.busidate}}</p>
        <p class="balance">余额：{{item.balance / 100}}</p>
      </div>
    </scroller>
  </div>
</template>

<script>
  export default {
    name: 'consumer-detail',
    props: {
      mediumId: {
        default: ''
      }
    },
    data: function () {
      return {
        queryMode: 1,
        contentTop: 44,
        page: 1,
        pnBusidate: '',
        pnRowRecord: '',
        contentHeight: 0,
        list: []
      }
    },
    watch: {
      // mediumId (val) {
      //   if (val !== '') {
      //     this.getAccountDetail()
      //   }
      // }
    },
    mounted () {
      this.contentHeight = document.documentElement.clientHeight - 44
    },
    methods: {
      refresh (done) {
        this.queryMode = 1
        this.page = 1
        this.getAccountDetail(done)
      },
      infinite (done) {
        if (this.list.length !== 0) {
          this.queryMode = 3
          this.page++
          this.pnBusidate = this.list[this.list.length - 1].busidate
          this.pnRowRecord = this.list[this.list.length - 1].rowRecord
          this.getAccountDetail(done)
        } else {
          done(true)
        }
      },
      getAccountDetail (done) {
        return this.$api.post('/Icbc/AccountDetailQuery', {
          mediumId: this.mediumId,
          queryMode: this.queryMode,
          page: this.page,
          pnBusidate: this.pnBusidate,
          pnRowRecord: this.pnRowRecord
        }).then(res => {
          if (res.success) {
            if (this.queryMode === 1) {
              this.list = res.data
            } else {
              res.data.forEach((i) => {
                this.list.push(i)
              })
            }
          }
          if (done) done(true)
        }).catch(e => {
          if (done) done(true)
          if (e.code) {
            console.log(e.message)
          } else {
            console.log(e)
          }
        })
      }
    },
    created () {
      if (this.mediumId) {
        this.getAccountDetail()
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">
  .consumer-detail {
    overflow: hidden;
    .list {
      font-size: .28rem;
      height: 1.4rem;
      position: relative;
      border-bottom: 1px solid #ebebeb;
      padding: .2rem 0;
      margin: 0 .24rem;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .title {
        font-size: .3rem;
        color: #333333;
        font-weight: bold;
      }

      .balance {
        color: #8b9199;
        font-size: .24rem;
      }

      .time {
        position: absolute;
        color: #8b9199;
        font-size: .24rem;
        right: 0rem;
        bottom: .2rem;
      }

      .money {
        font-size: .3rem;
        color: #333333;
        position: absolute;
        right: 0rem;
        top: .2rem;
      }
    }
  }
</style>
