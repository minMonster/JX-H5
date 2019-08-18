<!-- crated：2019-07-14  author：Monster  -->
<template>
  <div class='complaints-suggestions' v-if="!loading">
    <group>
      <popup-picker :title="'房屋地址'" :data="list1" v-model="value1" :placeholder="'选择'"
                    @on-change="pickerChange"></popup-picker>
    </group>
    <group>
      <popup-picker :title="'投诉类型'" :data="list2" v-model="value2" :placeholder="'选择'"
                    @on-change="pickerChange2"></popup-picker>
      <sleep-x-input title="标题" v-model="titleInfo"></sleep-x-input>
    </group>
    <group>
      <sleep-x-textarea title="详情" placeholder="写下问题详情和地点，为您更快解决" v-model="describeDetail"></sleep-x-textarea>
      <cell-box>
        <div class="weui-uploader" style="flex: 1">
          <div class="weui-uploader__bd">
            <ul class="weui-uploader__files" id="uploaderFiles">
              <li class="weui-uploader__file"
                  :style="{backgroundImage: 'url(' + img.url + ')'}" v-for="(img, index) in images"
                  @click="showImgIndex = index"
                  :key="img.name"></li>
              <div class="weui-uploader__input-box" v-if="images.length<9">
                <div style="height: 100%;width: 100%;" id="uploaderInput" @click="uploaderInput"></div>
              </div>
              <div class="weui-uploader__text" v-if="images.length===0">
                请上传相关图片
              </div>
            </ul>
          </div>
        </div>
      </cell-box>
    </group>
    <div v-if="showImgIndex!=null" class="weui-gallery" style="height: 100%;width: 100%;display: block;">
      <span class="weui-gallery__img" @click="showImgIndex=null"
            :style="{backgroundImage: 'url(' + images[showImgIndex].url + ')'}"></span>
      <div class="weui-gallery__opr" @click="deleteImg(showImgIndex)">
        <a href="javascript:" class="weui-gallery__del">
          <i class="weui-icon-delete weui-icon_gallery-delete"></i>
        </a>
      </div>
    </div>
    <x-button class="next-button" @click.native="onNext" type="primary">提交</x-button>
  </div>
</template>

<script>
  import {Group, PopupPicker, XButton, CellBox} from 'vux'
  import SleepXInput from '@/components/input/sleep-x-input.vue'
  import SleepXTextarea from '@/components/input/sleep-x-textarea.vue'
  import {setupWebViewJavascriptBridge} from '@/common/jsbridge'
  import 'weui/src/style/widget/weui-cell/weui-uploader.less'
  import 'weui/src/style/widget/weui-cell/weui-gallery.less'
  import * as auth from '@/common/auth'

  export default {
    name: 'complaints-suggestions',
    components: {
      SleepXInput,
      SleepXTextarea,
      Group,
      PopupPicker,
      XButton,
      CellBox
    },
    data: function () {
      return {
        titleInfo: '',
        value1: [],
        value2: [],
        showImgIndex: null,
        env: 2,
        images: [],
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
        this.value1 = [arr[0].value]
        this.roomId = arr[0].id
        this.companyId = arr[0].companyId
        this.loading = false
      })
      this.$api.get('/HouseManage/AppCprType?type=tousu').then(res => {
        let arr = res.data.map(i => {
          return {
            name: i.classfy,
            value: i.classfy,
            id: i.id
          }
        })
        this.list2 = [arr]
        this.baoXiuId = arr[0].id
        this.value2 = [arr[0].value]
      })
    },
    methods: {
      deleteImg (index) {
        this.images.splice(index, 1)
        this.showImgIndex = null
      },
      dataURLtoFile (dataurl, filename) { // 将base64转换为文件
        let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        return new File([u8arr], filename, {type: mime})
      },
      convertBase64UrlToBlob (urlData) {
        let bytes = window.atob(urlData.split(',')[1])
        let ab = new ArrayBuffer(bytes.length)
        let ia = new Uint8Array(ab)
        for (let i = 0; i < bytes.length; i++) {
          ia[i] = bytes.charCodeAt(i)
        }
        return new Blob([ab], {type: 'image/png'})
      },
      uploaderInput (e) {
        let that = this
        let selectQuantity = 9 - this.images.length
        setupWebViewJavascriptBridge((bridge) => {
          bridge.callHandler('getImgUrl', {selectQuantity: selectQuantity}, function (res) {
            console.log('执行回掉')
            console.log(res, '原数据')
            res = JSON.parse(res)
            // console.log(res, '解析之后的数据')
            for (let i = 0; i < res.length; i++) {
              let file = that.dataURLtoFile(res[i], 'asdasdasd')
              that.images.push({
                url: URL.createObjectURL(file),
                file: file
              })
            }
          })
        })
      },
      encodeUnicode (s) {
        return s.replace(/([\u4E00-\u9FA5]|[\uFE30-\uFFA0])/g, function (newStr) {
          return '\\u' + newStr.charCodeAt(0).toString(16)
        })
      },
      onNext () {
        if (this.roomId === '') {
          this.$vux.toast.text('请选择房屋地址')
          return
        }
        if (this.baoXiuId === '') {
          this.$vux.toast.text('请选择投诉类型')
          return
        }
        if (this.titleInfo === '') {
          this.$vux.toast.text('请填写标题')
          return
        }
        if (this.describeDetail === '') {
          this.$vux.toast.text('请填写投诉详情')
          return
        }
        this.$vux.loading.show()
        this.$api.post('/HouseManage/AppCprAdd', {
          companyId: this.companyId,
          title: this.titleInfo,
          roomId: this.roomId,
          typeId: this.baoXiuId,
          description: this.describeDetail,
          tsbxlx: 'tousu',
          opater: ''
        }).then((res) => {
          if (res.success) {
            if (this.images.length === 0) { // 没有图片上传
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
            } else { // 有图片上传
              let files = []
              files = this.images.map(i => {
                return i.file
              })
              let cprId = res.message
              this.$api.post('/HouseManage/UploadCprImage?cprId=' + cprId, {
                upload: this.images[0].file
              }, {
                headers: {
                  token: auth.getToken(),
                  'Content-Type': 'multipart/form-data'
                }
              }).then(res => {
                this.$vux.loading.hide()

                this.$vux.alert.show({
                  title: '提交成功',
                  content: res + cprId
                })
              }).catch(err => {
                this.$vux.loading.hide()

                this.$vux.alert.show({
                  title: '提交失败',
                  content: JSON.stringify(err) + cprId
                })
              })
            }
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

  .complaints-suggestions {
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
      padding: .2rem;
      margin-top: .2rem;
    }

    .weui-cell__bd {
      width: 100%;
    }

    .vux-x-textarea {
      flex-direction: column;
    }

    .weui-uploader__file {
      margin-right: .45rem;
      margin-bottom: .45rem;
    }
  }
</style>
