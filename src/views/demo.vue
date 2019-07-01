<!-- crated：2019-07-01  author：Monster  -->
<template>
    <div class='demo'>
        demo
        <x-button>按钮</x-button>
    </div>
</template>

<script>
  import { XButton } from 'vux';

  export default {
    name: 'demo',
    components: {
      XButton
    }
  };
</script>
<style rel="stylesheet/less" lang="less">

    @import "../styles/index.less";

    .demo {
    }
</style>
