<template>
  <div class="consumer-detail">
    <div class="list" :key="item.id" v-for="item in list">
      <div class="title">
        {{item.remarks}}
      </div>
      <p class="money">{{item.drcrf === '1'? '-': '+'}}{{item.amount / 100}}</p>
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
      page: '1',
      pnBusidate: '2019-06-29',
      pnRowRecord: '1',
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
      height: 1.2rem;
      position: relative;
      border-bottom: 1px solid #ebebeb;
      padding: .2rem .15rem;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .time {
        position: absolute;
        right: .15rem;
        top: .2rem;
      }
      .money {
        position: absolute;
        right: .15rem;
        bottom: .2rem;
      }
    }
  }
</style>
