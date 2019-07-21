<template>
  <div class="consumer-detail">
    <div class="test"></div>
  </div>
</template>

<script>
export default {
  name: 'consumer-detail',
  data: function () {
    return {
      mediumId: '',
      queryMode: '',
      page: '',
      pnBusidate: '',
      pnRowRecord: ''
    }
  },
  methods: {
    getAccountDetail () {
      this.$api.post('/Icbc/AccountDetailQuery', {
        mediumId: this.mediumId,
        queryMode: this.queryMode,
        page: this.page,
        pnBusidate: this.pnBusidate,
        pnRowRecord: this.pnRowRecord
      }).then(() => {
        console.log('success')
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
    this.getAccountDetail()
  }
}
</script>

<style rel="stylesheet/less" lang="less">

</style>
