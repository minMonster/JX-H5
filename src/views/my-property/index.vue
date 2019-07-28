<!-- crated：2019-07-28  author：Monster  -->
<template>
    <div class='my-property'>
      <div class="card" v-for="item in list" :key="item.id">
        <p>{{item.roomNum}}</p>
        <p>{{item.isCertifi}}</p>
        <span class="unbind-button" @click="unbind(item)">解绑</span>
      </div>
      <x-button class="next-button" @click.native="$router.push({path: '/add-my-property'})" type="primary">添加房屋</x-button>
    </div>
</template>

<script>
import { XButton } from 'vux'
export default {
  name: 'my-property',
  components: {
    XButton
  },
  data: function () {
    return {
      list: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.$api.get('/HouseManage/AllBindRoomQuery').then(res => {
        this.list = res.data
      })
    },
    unbind (item) {
      console.log(item)
      this.$api.get('/HouseManage/AppUnBindRoom', {
        params: {
          companyId: item.companyId,
          roomId: item.roomId,
          phone: JSON.parse(sessionStorage.getItem('userInfo')).phone
        }
      }).then(res => {
        if (res.success) {
          this.$vux.toast.text('解绑成功')
          this.getList()
        }
      })
    }
  }
}
</script>
<style rel="stylesheet/less" lang="less">

    @import "../../styles/index.less";

    .my-property {
      height: 100vh;
      padding-bottom: 1.3rem;
      .card {
        font-size: .32rem;
        position: relative;
        padding: .2rem;
        border-bottom: 1px solid #ebebeb;
      }
      .unbind-button {
        width: 1rem;
        position: absolute;
        top: 50%;
        margin-top: -.3rem;
        right: .2rem;
        height: .6rem;
        color: #fff;
        font-size: .2rem;
        text-align: center;
        line-height: .6rem;
        background: linear-gradient(178deg, rgba(74, 180, 254, 1) 0%, rgba(27, 141, 246, 1) 64%, rgba(6, 123, 248, 1) 100%);
      }
      .next-button {
        margin-top: .6rem;
        width: 7rem;
        position: fixed;
        bottom: .3rem;
        left: .25rem;
        height: .84rem;
        background: linear-gradient(178deg, rgba(74, 180, 254, 1) 0%, rgba(27, 141, 246, 1) 64%, rgba(6, 123, 248, 1) 100%);
      }
    }
</style>
