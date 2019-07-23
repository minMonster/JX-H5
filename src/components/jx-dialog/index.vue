<!-- crated：2018/7/19  author：Monster  -->
/**
# props 参数
* @isShow {Boolean} 控制显示隐藏
* @title {String}
* @content {String}
* @cancel {Boolean} 是否显示取消按钮
* @cancelText {String} 取消按钮文案
* @submitText {String} Ok按钮文案
* @isSubmitBtn {Boolean} 是否显示Ok按钮

# slot 插槽
* @content {content}

# callback
* @handleOk {Function}
* @handleNo {Function}
* @on-hide {Function}
* @on-show {Function}
*/
<template>
  <div v-transfer-dom id="sleep-dialog">
    <x-dialog
      v-model="showValue"
      class="sleep-dialog"
      @on-hide="$emit('on-hide')"
      @on-show="$emit('on-show')"
    >
      <div class="title" v-if="title">{{title}}</div>
      <div class="content" v-if="content">
        <div v-html="content"></div>
      </div>
      <slot name="content" v-if="!content"></slot>
      <div class="buttons">
        <XButton v-if="cancel" @click.native.stop="_onHide">{{cancelText}}</XButton>
        <XButton v-if="isSubmitBtn" @click.native="$emit('handleOk')" type="primary">{{submitText}}</XButton>
      </div>
    </x-dialog>
  </div>
</template>

<script>
import {XDialog, XButton, TransferDom} from 'vux'

export default {
  name: 'sleep-dialog',
  components: {XDialog, XButton},
  directives: {
    TransferDom
  },
  created () {
    if (typeof this.value !== 'undefined') {
      this.showValue = this.value
    }
  },
  data () {
    return {
      showValue: false
    }
  },
  methods: {
    _onHide () {
      this.showValue = false
      this.$emit('handleNo')
    }
  },
  watch: {
    value (val) {
      this.showValue = val
      if (val) {
        this.$nextTick(() => {
          document.getElementById('sleep-dialog').addEventListener('touchmove', function (e) {
            e.preventDefault() // 阻止默认的处理方式(阻止下拉滑动的效果)
          }, {passive: false}) // passive 参数不能省略，用来兼容ios和android
        })
      }
    }
  },
  props: {
    value: Boolean,
    cancelText: {
      type: String,
      default: '取消'
    },
    submitText: {
      type: String,
      default: '确定'
    },
    cancel: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: null
    },
    content: {
      content: String,
      default: null
    },
    isShow: {
      type: Boolean,
      default: true
    },
    isSubmitBtn: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang='less' type='text/less'>
  @import "../../styles/variable";
  .sleep-dialog {
    .weui-mask {
      z-index: 999!important;
    }

    .weui-dialog {
      max-width: 6.9rem;
      padding: .8rem .4rem .6rem .4rem;
      min-width: 6.9rem;
      border-radius: .08rem;
      .title {
        font-size: .36rem;
        font-weight: bold;
        color: @T3;
      }
      .content {
        font-family: PingFangSC-Regular;
        font-size: .28rem;
        color: @T1;
        padding: .4rem 0 .6rem;
        text-align: center;
      }
      .buttons {
        display: flex;
        justify-content: center;
        align-items: center;
        .weui-btn {
          margin-top: 0;
          border-radius: 1rem;
          & + .weui-btn {
            margin-left: .1rem;
          }
        }
      }
    }
  }
</style>
