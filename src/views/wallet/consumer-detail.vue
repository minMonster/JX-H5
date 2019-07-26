<template>
  <div class="consumer-detail">
    <div class="list" v-for="item in list">
      <div class="title">{{item.remarks}} {{item.drcrf === '1'? '-': '+'}}{{item.amount / 100}}</div>
      <div class="time">{{item.busidate}}</div>
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

</style>
