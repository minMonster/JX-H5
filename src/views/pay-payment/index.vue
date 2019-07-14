<!-- crated：2019-07-14  author：Monster  -->
<template>
    <div class='pay-payment'>
        <template v-if="!loading">
            <group title="选择缴费地址">
                <popup-picker :title="'房屋地址'" :data="list1" v-model="value1" :placeholder="'选择'" @on-change="pickerChange"></popup-picker>
            </group>
            <x-button class="next-button" @click.native="onNext" type="primary">下一步</x-button>
        </template>
    </div>
</template>

<script>
  import { Group, PopupPicker, XButton } from 'vux';
  import {setupWebViewJavascriptBridge} from '@/common/jsbridge'

  export default {
    name: 'pay-payment',
    components: {
      Group, PopupPicker, XButton
    },
    data: function () {
      return {
        value1: [],
        list1: [[]],
        loading: true,
        roomId: ''
      };
    },
    created () {
      // this.$api.get('/HouseManage/AppNoticeQuery?pageSize=10&&offset=1&phone=18553536221')
      this.$api.get('/HouseManage/AllBindRoomQuery').then(res => {
        if (!res.data || res.data.length === 0) {
          this.$vux.alert.show({
            title: '您的账号没有房屋地址',
            content: '点击确定将返回家页面',
            onShow () {
            },
            onHide () {
              setupWebViewJavascriptBridge((bridge) => {
                bridge.callHandler('finish');
              });
            }
          });
        }
        let arr = res.data.map(i => {
          return {
            name: i.roomNum,
            value: i.roomNum,
            id: i.roomId
          };
        });
        this.list1 = [arr];
        this.loading = false;
      });
    },
    methods: {
      onNext () {
        if (this.roomId === '') {
          this.$vux.toast.text('请选择房屋地址')
        } else {
          this.$router.push({path: 'pay-payment-list', query: {roomId: this.roomId}})
        }
      },
      pickerChange () {
        let arr = this.list1[0];
        arr.forEach(i => {
          if (i.name === this.value1[0]) {
            this.roomId = i.id;
          }
        });
      }
    }
  };
</script>
<style rel="stylesheet/less" lang="less">

    @import "../../styles/index.less";

    .pay-payment {
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
            background:linear-gradient(178deg,rgba(74,180,254,1) 0%,rgba(27,141,246,1) 64%,rgba(6,123,248,1) 100%);
        }
    }
</style>
