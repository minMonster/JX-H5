<!-- crated：2019-06-23  author：Monster  -->
<template>
    <div class='detailed-showcase'>
    </div>
</template>

<script>
  export default {
    name: 'detailed-showcase',
    props: {
      imageUrl: {
        type: String,
        default: ''
      },
      infoHtml: {
        type: String,
        default: ''
      }
    }
  };
</script>
<style rel="stylesheet/less" lang="less">

    @import "../../styles/index.less";

    .detailed-showcase {
    }
</style>
