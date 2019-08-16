<!-- crated：2019-07-28  author：Monster  -->
<template>
    <div class='visitor-access' v-if="!loading">
      <group>
        <popup-picker :title="'房屋地址'" :data="list1" v-model="value1" :placeholder="'选择'"
                      @on-change="pickerChange"></popup-picker>
        <datetime
          v-model="startTime"
          @on-change="change"
          title="开始日期"
          :start-date="startData"
          @on-confirm="onConfirm"
         ></datetime>
        <datetime
          v-model="endTime"
          title="结束日期"
          :start-date="startTime"
        ></datetime>
<!--        <sleep-x-input placeholder="请输入访客姓名" title="访客姓名" v-model="fKName"></sleep-x-input>-->
<!--        <sleep-x-input placeholder="请输入访客电话" title="访客电话" v-model="phone"></sleep-x-input>-->
      </group>
      <x-button class="next-button" @click.native="onNext" type="primary">生成二维码</x-button>
    </div>
</template>

<script>
import { Group, Datetime, PopupPicker } from 'vux'
import SleepXInput from '@/components/input/sleep-x-input.vue'

import moment from 'moment'
import { setupWebViewJavascriptBridge } from '@/common/jsbridge'
import XButton from 'vux/src/components/x-button/index'
export default {
  name: 'visitor-access',
  components: {
    XButton,
    Group,
    Datetime,
    PopupPicker,
    SleepXInput
  },
  data: function () {
    return {
      startData: '',
      startTime: '',
      endTime: '',
      loading: true,
      list1: [[]],
      value1: [],
      phone: '',
      roomId: '',
      fKName: '',
      companyId: ''
    }
  },
  created () {
    this.startTime = moment().format('YYYY-MM-DD')
    this.startData = moment().format('YYYY-MM-DD')
    this.$api.get('/HouseManage/AllBindRoomQuery?isCertifi=已认证').then(res => {
      if (!res.data || res.data.length === 0) {
        this.$vux.alert.show({
          title: '您的账号没有房屋地址',
          content: '点击确定将返回家页面',
          onShow () {
          },
          onHide () {
            setupWebViewJavascriptBridge((bridge) => {
              bridge.callHandler('finish')
            })
          }
        })
      }
      let arr = res.data.map(i => {
        return {
          name: i.roomNum,
          value: i.roomNum,
          id: i.roomId,
          companyId: i.companyId
        }
      })
      this.list1 = [arr]
      this.loading = false
    })
  },
  methods: {
    change (e) {
      this.endTime = e
    },
    pickerChange () {
      let arr = this.list1[0]
      arr.forEach(i => {
        if (i.name === this.value1[0]) {
          this.roomId = i.id
          this.companyId = i.companyId
        }
      })
    },
    onConfirm () {},
    onNext () {
      if (!this.roomId) {
        this.$vux.toast.text('请选择房屋')
        return
      }
      if (!this.endTime) {
        this.$vux.toast.text('请选择结束日期')
        return
      }
      // if (!this.fKName) {
      //   this.$vux.toast.text('请输入访客姓名')
      //   return
      // }
      // if (!this.phone) {
      //   this.$vux.toast.text('请输入访客电话')
      //   return
      // }
      this.$router.push({path: '/qrcode',
        query: {
          codeUrl: this.roomId + ',' + this.startTime + ',' + this.endTime + ',' + this.list1[0][0].name
        }})
    }
  }
}
</script>
<style rel="stylesheet/less" lang="less">

    @import "../../styles/index.less";

    .visitor-access {
      .next-button {
        margin-top: .6rem;
        width: 7.02rem;
        height: .84rem;
        background: linear-gradient(178deg, rgba(74, 180, 254, 1) 0%, rgba(27, 141, 246, 1) 64%, rgba(6, 123, 248, 1) 100%);
      }
    }
</style>
