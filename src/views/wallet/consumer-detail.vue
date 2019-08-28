<template>
  <div class="consumer-detail">
    <div class="list" :key="item.id" v-for="item in list">
      <div class="title">
        {{item.remarks}}
      </div>
      <p class="money">{{item.amount / 100}}</p>
      <p class="time">{{item.busidate}}</p>
      <p class="balance">余额：{{item.balance / 100}}</p>
    </div>
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
      queryMode: '1',
      page: 1,
      pnBusidate: '2019-05-01',
      pnRowRecord: 2,
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
  methods: {
    getAccountDetail () {
      this.$api.post('/Icbc/AccountDetailQuery', {
        mediumId: this.mediumId,
        queryMode: this.queryMode,
        page: this.page,
        pnBusidate: this.pnBusidate,
        pnRowRecord: this.pnRowRecord
      }).then(res => {
        if (res.success) {
          this.list = res.data
        }
      }).catch(e => {
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
