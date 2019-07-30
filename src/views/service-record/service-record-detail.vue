<!-- crated：2019-07-30  author：Monster  -->
<template>
    <div class='service-record-detail'>
      <group>
        <cell title="地址">{{options.communityname}}{{options.housenum || '暂无'}}</cell>
        <cell title="提报人">{{options.ownername || '暂无'}}</cell>
        <cell title="提报人电话">{{options.phone || '暂无'}}</cell>
        <cell title="提报时间">{{options.created || '暂无'}}</cell>
        <cell title="服务类型">{{options.servicetypetext || '暂无'}}</cell>
        <cell title="指派人">{{options.visitusername || '暂无'}}</cell>
        <cell title="指派给">{{options.finishusername || '暂无'}}</cell>
        <cell title="处理人电话">{{options.assignphone || '暂无'}}</cell>
      </group>
      <group title="业主描述">
        <cell title="标题">{{options.title || '暂无'}}</cell>
        <cell title="描述">{{options.content || '暂无'}}</cell>
      </group>
    </div>
</template>

<script>
import { Group, Cell } from 'vux'
export default {
  name: 'service-record-detail',
  components: {
    Group, Cell
  },
  data: function () {
    return {
      options: {}
    }
  },
  created () {
    this.$api.post('/HouseManage/VisitDetail', {
      serviceId: this.$route.query.serviceId,
      companyId: this.$route.query.companyId
    }).then(res => {
      this.options = res.data
    })
  }
}
</script>
<style rel="stylesheet/less" lang="less">

    @import "../../styles/index.less";

    .service-record-detail {
      margin-top: -1.17647059em;
      .weui-cell {
        align-items: start;
      }
      .weui-cell__ft {
        max-width: 4.8rem;
        min-width: 4.8rem;
        text-align: left;
      }
    }
</style>
