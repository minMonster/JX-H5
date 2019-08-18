<!-- crated：2019-07-30  author：Monster  -->
<template>
    <div class='service-record-detail'>
      <group>
        <cell title="地址">{{housenum}}</cell>
        <cell title="提报人">{{options.ownername || '暂无'}}</cell>
        <cell title="提报人电话">{{options.phone || '暂无'}}</cell>
        <cell title="提报时间">{{options.created || '暂无'}}</cell>
        <cell title="服务类型">{{options.servicetypetext || '暂无'}}</cell>
        <cell title="指派人">{{options.visitusername || '暂无'}}</cell>
        <cell title="指派给">{{options.receivername || '暂无'}}</cell>
        <cell title="处理人电话">{{options.assignphone || '暂无'}}</cell>
      </group>
      <group title="业主描述">
        <cell title="标题">{{options.title || '暂无'}}</cell>
        <cell title="描述">{{options.content || '暂无'}}</cell>
      </group>
      <group title="物业反馈">
        <cell title="反馈人">{{options.backName || '暂无'}}</cell>
        <cell title="描述">{{options.backConcent || '暂无'}}</cell>
      </group>
      <group title="反馈资料">
        <img :key="item.id" v-for="item in options.picList" class="img-list" :src="item.filename" alt="">
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
  computed: {
    housenum () {
      if (this.options.communityname && this.options.unit && this.options.buildingnum && this.options.housenum) {
        return this.options.communityname + '-' + this.options.unit + '号楼-' + this.options.buildingnum + '单元-' + this.options.housenum
      } else {
        return '暂无'
      }
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
      .img-list {
        width: 100vw;
        margin-top: .1rem;
      }
    }
</style>
