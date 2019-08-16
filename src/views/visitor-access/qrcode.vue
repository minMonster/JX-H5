<!-- crated：2019-07-28  author：Monster  -->
<template>
  <div class='qrcode'>
    <qriously class="code-img" :value="toUtf8($route.query.codeUrl)" :size="200"/>
    <x-button class="next-button" @click.native="shareQrcode" type="primary">分享二维码</x-button>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueQriously from 'vue-qriously'
  import {XButton} from 'vux'
  import {setupWebViewJavascriptBridge} from '@/common/jsbridge'

  Vue.use(VueQriously)
  export default {
    name: 'qrcode',
    components: {
      XButton
    },
    methods: {
      toUtf8 (str) {
        var out, i, len, c
        out = ''
        len = str.length
        for (i = 0; i < len; i++) {
          c = str.charCodeAt(i)
          if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i)
          } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F))
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F))
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
          } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F))
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
          }
        }
        return out
      },
      shareQrcode () {
        setupWebViewJavascriptBridge((bridge) => {
          bridge.callHandler('share', {
            platform: 'wx',
            title: '访客二维码',
            desc: '分享描述',
            icon: '',
            url: window.location.href
          })
        })
      }
    }
  }
</script>
<style rel="stylesheet/less" lang="less">

  @import "../../styles/index.less";

  .qrcode {
    .code-img {
      padding-top: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .next-button {
      margin: 0 .24rem;
      margin-top: .6rem;
      width: 7.02rem;
      height: .84rem;
      color: #fff;
      background: linear-gradient(178deg, rgba(74, 180, 254, 1) 0%, rgba(27, 141, 246, 1) 64%, rgba(6, 123, 248, 1) 100%);
    }
  }
</style>
