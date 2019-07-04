<!-- crated：2019-06-23  author：Monster  -->
<template>
    <div class='domestic-services-detail'>
        <img src="../../assets/domestic-services-detail/banner.png" alt="" class="banner">
        <div class="service">
            <p class="name">{{detail.name}}</p>
            <p class="desc">{{detail.desc}}</p>
        </div>
        <div class="detail">
            <div class="content">
                <p class="company">{{detail.company}}</p>
                <p class="business-hours time">营业时间：</p>
                <p class="business-hours">{{detail.businessHours}}</p>
            </div>
            <x-button class="book" @click.native="show=true">立即预约</x-button>
        </div>
        <confirm
        v-model="show"
        confirm-text="呼叫"
        @on-confirm="call"
        >
            <img src="../../assets/domestic-services-detail/tel_logo.png" alt="" class="tel-logo">
            <span class="tel">15209099866</span>
        </confirm>
    </div>
</template>

<script>
import { XButton, Confirm } from 'vux'
export default {
name: 'domestic-services-detail',
components: {
  XButton,
  Confirm
},
data: function () {
  return {
    show: false,
    detail: {
      name: '防盗门开锁',
      desc: '快速上门，110备案安全认证…',
      company: '快开开开锁公司',
      businessHours: '09:00-17:00'
    }
  }
},
methods: {
  call() {
  }
}
};
</script>
<style rel="stylesheet/less" lang="less">

    @import "../../styles/index.less";
    @import "../../styles/variable";

    .domestic-services-detail {
        min-height: 100vh;
        display: flex;
        flex-direction: column;

        .banner {
            width: 100%;
        }

        .service {
            padding: .34rem .24rem .3rem;
            border-bottom: .02rem solid @L4;

            .name {
                font-size: .36rem;
                font-family: @FM;
                font-weight: 600;
                color: @T1;
                line-height: .28rem;
                margin-bottom: .24rem;
            }

            .desc {
                font-size: .28rem;
                font-family: @FR;
                font-weight: 400;
                color: @T2;
                line-height: .28rem;
            }
        }

        .detail {
            height: 100%;
            padding: .44rem .24rem .46rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            flex: 1;

            .company {
                font-size: .32rem;
                font-family: PingFangSC-Semibold;
                font-weight: 600;
                color: @T1;
                line-height: .28rem;
                margin-bottom: .42rem;
            }

            .business-hours {
                font-size: .24rem;
                font-family: @FR;
                font-weight: 400;
                color: #666666;
                line-height: .24rem;
                &.time {
                    margin-bottom: .12rem;
                }
            }

            .book {
                height: .84rem;
                font-size: .32rem;
                font-family: @FM;
                font-weight: 600;
                color: @B2;
                line-height: .32rem;
                background-color: @C3;
                border-radius: .06rem;
                box-shadow: none;
                &:active {
                    background-color: @C4 !important;
                    color: @B2 !important;
                }
            }
        }

        .weui-dialog {
            max-width: 7rem;
            width: 100%;
            margin: auto;
        }

        .weui-dialog__bd {
            display: flex;
            align-items: center;
            justify-content: center;
            &:first-child {
                padding: .44rem .2rem .36rem;
            }
        }

        .tel-logo {
            width: .4rem;
            margin-right: .06rem;
        }

        .tel {
            font-size: .32rem;
            font-family: @FM;
            font-weight: 600;
            color: @T1;
            line-height: .32rem;
        }

        .weui-dialog__ft {
            font-size: .32rem;
            font-family: @FM;
            font-weight: 600;
            color: #1B8DF6;
            &:after {
                left: .3rem;
                right: .3rem;
                border-top: .02rem solid @B7;
            }

            .weui-dialog__btn_default {
                color: #90959D;
            }
        }

        .weui-dialog__btn:after {
            top: .32rem;
            bottom: .3rem;
            border-left: .02rem solid @B7;
        }
    }
</style>
