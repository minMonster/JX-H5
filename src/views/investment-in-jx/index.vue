<!-- crated：2019-06-18  author：Monster  -->
<template>
    <div class='investment-in-jx'>
        <div class="tab-list">
            <div class="tab" @click="current=0">
                <div class="selected" :class="{'show-border': current==0}"></div>
                <p class="title" :class="{'black': current==0}">招商工作</p>
            </div>
            <div class="tab" @click="current=1">
                <div class="selected" :class="{'show-border': current==1}"></div>
                <p class="title" :class="{'black': current==1}">公告公示</p>
            </div>
        </div>
        <div class="bussiness" v-if="current==0">
            <div class="work" v-for="work in works" :key="work.id">
                <div class="content">
                    <p class="info">{{work.info}}</p>
                    <p class="feedback">{{work.watch}}观看·{{work.thumpUp}}点赞·{{work.comment}}评论</p>
                </div>
                <div class="img-display" v-if="work.imgSrc">
                    <img :src="work.imgSrc" alt="" class="pic">
                </div>
            </div>
            <div class="check-more">查看更多></div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'investment-in-jx',
    data: function () {
      return {
        current: 0,
        works: [
          {
            info: '莒县收听收看全省重点工作推进会一新旧动能转换项目落地第二次现场观摩总结会议',
            watch: 24,
            thumpUp: 24,
            comment: 32,
            imgSrc: ''
          },
          {
            info: '体检前不能做的8件事，否则钱容易白话',
            watch: 18,
            thumpUp: 60,
            comment: 52,
            imgSrc: require('../../assets/investment-in-jx/investment-1.png')
          },
          {
            info: '体检前不能做的8件事，否则钱容易白话',
            watch: 28,
            thumpUp: 15,
            comment: 12,
            imgSrc: require('../../assets/investment-in-jx/investment-1.png')
          }
        ]
      }
    }
  };
</script>
<style rel="stylesheet/less" lang="less">

    @import "../../styles/index.less";
    @import "../../styles/variable";

    .investment-in-jx {
        width: 100vw;
        padding: .42rem .24rem;

        .tab-list {
            width: 100%;
            margin-bottom: .18rem;

            .tab {
                position: relative;
                display: inline-block;
                width: 1.56rem;
                height: .44rem;
                margin-right: 1rem;
                &:last-child {
                    margin-right: 0;
                }

                .selected {
                    width: 100%;
                    height: .24rem;
                    position: absolute;
                    bottom: 0;
                    background: linear-gradient(180deg, rgba(255, 247, 179, 1) 0%, rgba(255, 222, 144, 1) 100%);
                    z-index: -1;
                    display: none;
                    &.show-border {
                        display: block;
                    }
                }

                .title {
                    font-size: .36rem;
                    font-family: @FM;
                    font-weight: 600;
                    color: @T3;
                    line-height: 100%;
                    &.black {
                        color: @T1;
                    }
                }
            }
        }

        .bussiness {
            .work {
                padding: .28rem 0;
                display: flex;
                justify-content: space-between;
                align-items: center;

                .content {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;

                    .info {
                        font-size: .28rem;
                        font-family: @FM;
                        font-weight: 600;
                        color: @T2;
                        line-height: .42rem;
                        margin-bottom: .14rem;
                        text-align: justify;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        word-break: break-all;
                    }

                    .feedback {
                        font-size: .2rem;
                        font-family: @FR;
                        font-weight: 400;
                        color: @T4;
                        line-height: .2rem;
                    }
                }

                .img-display {
                    margin-left: .32rem;

                    .pic {
                        width: 1.86rem;
                        border-radius: .06rem;
                    }
                }
            }

            .check-more {
                font-size: .24rem;
                font-family: @FR;
                font-weight: 400;
                color: @T4;
                line-height: .24rem;
                text-align: right;
                margin-top: .3rem;
            }
        }
    }
</style>
