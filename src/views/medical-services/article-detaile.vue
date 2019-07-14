<!-- crated：2019-07-11  author：Monster  -->
<template>
    <div class='medical-services-detail' >
        <img :src="HospitalDetail.photo" alt="">
        <p v-html="HospitalDetail.introduce"></p>
        <div class="buttons">
            <div class="phone" @click="callPhone(HospitalDetail.phone)"><img src="../../assets/medical-services/phone-icon.png" alt="">电话联系</div>
            <div class="hyper-link" @click="hyperLink(HospitalDetail.hyperLink)"><img src="../../assets/medical-services/detail-icon.png" alt="">在线挂号</div>
        </div>
    </div>
</template>

<script>
  import {setupWebViewJavascriptBridge} from '@/common/jsbridge'

  export default {
    name: 'medical-services-detail',
    data: function () {
      return {
        HospitalDetail: ''
      };
    },
    created () {
      this.getHospital();
    },
    methods: {
      callPhone (phone) {
        setupWebViewJavascriptBridge((bridge) => {
          bridge.callHandler('callPhone', {phone: phone})
        })
      },
      hyperLink (link) {
        window.open(link)
      },
      getHospital () {
        this.$api.get('/Hospital/HospitalDetail/' + this.$route.query.id).then(res => {
          this.HospitalDetail = res.data;
          document.title = res.data.name;
        }).catch(e => {
          if (e.code) {
            this.$vux.toast.text(e.message);
          } else {
            this.$vux.toast.text(e);
          }
        });
      }
    }
  };
</script>
<style rel="stylesheet/less" lang="less">

    @import "../../styles/index.less";

    .medical-services-detail {
        padding: .46rem .24rem;
        padding-top: 0;
        img {
            display: block;
            width: 100%;
        }
        p {
            padding-top: .4rem;
            color: #5E5E5E;
            font-size: .28rem;
            line-height: .44rem;
            margin-bottom: 1rem;
        }
        .buttons {
            position: fixed;
            display: flex;
            width: 100%;
            left: 0;
            font-size: 0.28rem;
            color: #fff;
            bottom: 0;
            .phone {
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 1rem;
                background-color: #FFB853;
                img {
                    width: .44rem;
                    height: .44rem;
                    margin-right: .08rem;
                }
            }
            .hyper-link {
                width: 2.47rem;
                display: flex;
                height: 1rem;
                justify-content: center;
                align-items: center;
                background-color: #F37D31;
                img {
                    width: .39rem;
                    height: .33rem;
                    margin-right: .08rem;
                }
            }
        }
    }
</style>
