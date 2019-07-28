<!-- crated：2019-07-14  author：Monster  -->
<template>
    <div class='warranty-maintenance' v-if="!loading">
        <group>
            <popup-picker :title="'房屋地址'" :data="list1" v-model="value1" :placeholder="'选择'"
                          @on-change="pickerChange"></popup-picker>
        </group>
        <group>
            <popup-picker :title="'报修类型'" :data="list2" v-model="value2" :placeholder="'选择'"
                          @on-change="pickerChange2"></popup-picker>
            <sleep-x-input title="标题" v-model="titleInfo"></sleep-x-input>
        </group>
        <group>
            <sleep-x-textarea title="详情" v-model="describeDetail"></sleep-x-textarea>
        </group>
        <x-button class="next-button" @click.native="onNext" type="primary">提交</x-button>
    </div>
</template>

<script>
import { Group, PopupPicker, XButton } from 'vux'
import SleepXInput from '@/components/input/sleep-x-input.vue'
import SleepXTextarea from '@/components/input/sleep-x-textarea.vue'
import { setupWebViewJavascriptBridge } from '@/common/jsbridge'

export default {
  name: 'complaints-suggestions',
  components: {
    SleepXInput,
    SleepXTextarea,
    Group,
    PopupPicker,
    XButton
  },
  data: function () {
    return {
      titleInfo: '',
      value1: [],
      value2: [],
      list1: [[]],
      list2: [[]],
      loading: true,
      roomId: '',
      baoXiuId: '',
      describeDetail: '',
      companyId: ''
    }
  },
  created () {
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
    this.$api.get('/HouseManage/AppCprType?type=baoxiu').then(res => {
      let arr = res.data.map(i => {
        return {
          name: i.classfy,
          value: i.classfy,
          id: i.id
        }
      })
      this.list2 = [arr]
    })
  },
  methods: {
    encodeUnicode (s) {
      return s.replace(/([\u4E00-\u9FA5]|[\uFE30-\uFFA0])/g, function (newStr) {
        return '\\u' + newStr.charCodeAt(0).toString(16)
      })
    },

    // 解码
    decodeUnicode (str) {
      str = str.replace(/\\u/g, '%')
      return unescape(str)
    },
    onNext () {
      if (this.roomId === '') {
        this.$vux.toast.text('请选择房屋地址')
        return
      }
      if (this.baoXiuId === '') {
        this.$vux.toast.text('请选择报修类型')
        return
      }
      if (this.titleInfo === '') {
        this.$vux.toast.text('请填写标题')
        return
      }
      if (this.describeDetail === '') {
        this.$vux.toast.text('请填写报修详情')
        return
      }
      this.$vux.loading.show()
      this.$api.post('/HouseManage/AppCprAdd', {
        companyId: this.companyId,
        title: this.encodeUnicode(this.titleInfo),
        roomId: this.roomId,
        typeId: this.baoXiuId,
        description: this.encodeUnicode(this.describeDetail),
        tsbxlx: 'baoxiu',
        opater: ''
      }).then((res) => {
        if (res.success) {
          this.$vux.loading.hide()
          this.$vux.toast.text('提交成功')
          // this.$router.go(-1)
          this.$vux.alert.show({
            title: '提交成功',
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
      }).catch(() => {
        this.$vux.loading.hide()
        this.$vux.toast.text('提交失败')
      })
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
    pickerChange2 () {
      let arr = this.list2[0]
      arr.forEach(i => {
        if (i.name === this.value2[0]) {
          this.baoXiuId = i.id
        }
      })
    }
  }
}
</script>
<style rel="stylesheet/less" lang="less">

    @import "../../styles/index.less";

    .warranty-maintenance {
        padding-top: .01rem;

        .weui-cells__title {
            margin-top: 0;
            margin-bottom: 0;
            padding: .24rem;
        }

        min-height: 100vh;
        background-color: #F3F5F6;

        .next-button {
            margin: 0 .24rem;
            margin-top: .6rem;
            width: 7.02rem;
            height: .84rem;
            background: linear-gradient(178deg, rgba(74, 180, 254, 1) 0%, rgba(27, 141, 246, 1) 64%, rgba(6, 123, 248, 1) 100%);
        }

        .weui-textarea {
            background-color: #F3F5F6;
            padding: .1rem;
        }
    }
</style>
