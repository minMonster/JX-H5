<template>
    <div class="detail">
        <group>
            <group-title>项目概述</group-title>
            <cell :title="info.title" v-for="(info, index) in infoList" :key="index">{{info.content}}</cell>
            <cell title="受理时间">
                <div class="time-box">
                    <div class="summer">
                        <div class="season">夏季</div>
                        <div class="time">
                            <p>上午8:30-12:00</p>
                            <p>下午1:30-5:00</p>
                        </div>
                    </div>
                    <div class="winter">
                        <div class="season">冬季</div>
                        <div class="time">
                            <p>上午8:30-12:00</p>
                            <p>下午1:30-5:00</p>
                        </div>
                    </div>
                </div>
            </cell>
        </group>
        <group>
            <group-title>设定依据</group-title>
            <cell class="setting">
                <p class="content">
                    纠纷不收费，可通过吸纳社会捐赠、公益赞助等符合国家法律法规规定的渠道筹措工作经费，保障调解工作顺利启动、健康运行.....医患纠纷人民调解委员会要采取说服、教育、疏道筹措工作经费，保障调解工作顺利启动、健康运行.....医患纠纷人民调解委员会要采取说服、教育、疏
                </p>
            </cell>
        </group>
    </div>
</template>

<script>
import { Group, Cell, GroupTitle } from 'vux'

export default {
  name: "detail",
  components: {
    Group,
    Cell,
    GroupTitle
  },
  data: function () {
    return {
      infoList: [
        { title: '业务名称', content: '医患纠纷人民调解服务' },
        { title: '实施主体', content: '莒县司法局' },
        { title: '法定结办时限', content: '1个工作日' },
        { title: '是否收费', content: '不收费' },
        { title: '办理形式', content: '仅窗口办理' },
        { title: '咨询电话', content: '0633-6226336' },
        { title: '受理地点', content: '莒县社会矛盾调处中心' },
      ]
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less">
    @import "../../styles/index.less";
    @import "../../styles/variable";

    .detail {
        .weui-cells {
            margin-top: 0;
            padding-bottom: .3rem;
            &:before, &:after {
                border: none;
            }

            .weui-cell {
                min-height: 1.08rem;
                padding: .4rem .24rem;
                justify-content: flex-start;
                align-items: flex-start;
                &:before {
                    border-top: 2px solid @L4;
                    left: 1.4rem;
                    right: .24rem;
                    top: auto;
                    bottom: 0;
                }

                p {
                    display: inline-block;
                }

                .vux-cell-bd {
                    width: 2.2rem;
                    flex: 0 1 auto;

                    .vux-label {
                        font-size: .28rem;
                        font-family: @FR;
                        font-weight: 400;
                        color: @T3;
                    }
                }

                .weui-cell__ft {
                    font-size: .28rem;
                    font-family: @FM;
                    font-weight: 600;
                    color: @T1;
                }
            }

            .time-box {
                display: flex;
                flex-direction: column;
                text-align: left;

                .summer, .winter {
                    display: flex;
                    width: 3rem;

                    .season {
                        display: inline-block;
                        margin-right: .28rem;
                    }

                    .time {
                        display: flex;
                        flex-direction: column;

                        p {
                            margin-bottom: .28rem;
                        }
                    }
                }
            }

            .weui-cells__title {
                height: .6rem;
                background-color: @B6;
                padding: .18rem .24rem;
                margin: 0;
                font-size: .24rem;
                font-family: @FR;
                font-weight: 400;
                color: @T3;
                line-height: .24rem;
            }

            .setting {
                padding: .4rem .24rem .6rem;
                &:before {
                    border: none;
                }

                .vux-cell-bd {
                    width: 0;
                }
                
                .content {
                    text-align: justify;
                    line-height: .4rem;
                }
            }
        }
    }

</style>