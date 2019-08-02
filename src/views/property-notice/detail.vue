<template>
    <div class="property-notice-detail">
        <div class="title">{{content.title}}</div>
        <div class="time">{{content.time}}</div>
        <div v-html="content.content"></div>
    </div>
</template>

<script>
  export default {
    name: 'property-notice-detail',
    data: function () {
      return {
        content: {}
      };
    },
    created () {
      this.content = JSON.parse(sessionStorage.getItem('propertyNotice'));
      this.$api.get('/HouseManage/appNoticeRead?account=18553536221&noticeId=' + this.$route.query.id);
    }
  };
</script>

<style rel="stylesheet/less" lang="less">
    @import "../../styles/index.less";
    @import "../../styles/variable";

    .property-notice-detail {
        padding: 0 .24rem;
        .title {
            font-size: .34rem;
            text-align: center;
            font-weight: bold;
            padding: .24rem 0;
        }

        .time {
            text-align: center;
            font-size: .24rem;
            padding-bottom: .24rem;
        }
    }
</style>
