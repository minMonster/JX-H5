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
        // let file = that.dataURLtoFile('data:image/jpeg;base64,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',
        //   'asdasdasd')
        // that.images.push({
        //   url: URL.createObjectURL(file),
        //   file: file
        // })
        // return
        setupWebViewJavascriptBridge((bridge) => {
          bridge.callHandler('getImgUrl', {selectQuantity: selectQuantity}, function (res) {
            console.log('执行回掉')
            console.log(res, '原数据')
            res = JSON.parse(res)
            // console.log(res, '解析之后的数据')
            for (let i = 0; i < res.length; i++) {
              let file = that.dataURLtoFile(res[i], 'asdasdasd' + i)
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
              let imagePromiseArr = []
              for (let k = 0; k < this.images.length; k++) {
                let formData = new FormData()
                formData.append('upload', this.images[k].file)
                imagePromiseArr.push(
                  this.$api.post('/HouseManage/UploadCprImage?cprId=' + cprId, formData, {
                    headers: {
                      token: auth.getToken(),
                      'Content-Type': 'multipart/form-data'
                    }
                  })
                )
              }
              Promise.all(imagePromiseArr).then(res => {
                this.$vux.loading.hide()

                this.$vux.alert.show({
                  title: '提交成功',
                  content: '点击确定将返回家页面',
                  onHide () {
                    setupWebViewJavascriptBridge((bridge) => {
                      bridge.callHandler('finish')
                    })
                  }
                })
              }).catch(err => {
                this.$vux.alert.show({
                  title: '提交失败',
                  content: '点击确定将返回家页面',
                  onHide () {
                    setupWebViewJavascriptBridge((bridge) => {
                      bridge.callHandler('finish')
                    })
                  }
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
      margin-right: .3rem;
      margin-bottom: .3rem;
    }
  }
</style>
