<template>
    <div class="government-services-detail">
        <group>
            <group-title>{{titleData}}</group-title>
            <cell :title="info.name" v-for="(info, index) in workInfo" :key="index">{{info.value}}</cell>
<!--            <cell title="受理时间">-->
<!--                <div class="time-box">-->
<!--                    <div class="summer">-->
<!--                        <div class="season">夏季</div>-->
<!--                        <div class="time">-->
<!--                            <p>上午8:30-12:00</p>-->
<!--                            <p>下午1:30-5:00</p>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="winter">-->
<!--                        <div class="season">冬季</div>-->
<!--                        <div class="time">-->
<!--                            <p>上午8:30-12:00</p>-->
<!--                            <p>下午1:30-5:00</p>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </cell>-->
        </group>
<!--        <group class="setting-box">-->
<!--            <group-title>设定依据</group-title>-->
<!--            <cell class="setting">-->
<!--                <p class="content">-->
<!--                    纠纷不收费，可通过吸纳社会捐赠、公益赞助等符合国家法律法规规定的渠道筹措工作经费，保障调解工作顺利启动、健康运行.....医患纠纷人民调解委员会要采取说服、教育、疏道筹措工作经费，保障调解工作顺利启动、健康运行.....医患纠纷人民调解委员会要采取说服、教育、疏-->
<!--                </p>-->
<!--            </cell>-->
<!--        </group>-->
        <group v-if="attachFiles && attachFiles.length > 0">
            <group-title style="margin-bottom: .3rem;">相关下载（点击下载）</group-title>
            <x-button class="download" type="primary" v-for="(info, index) in attachFiles" :key="index" @click.native="downloadFile(info.value)">{{info.name}}</x-button>
<!--            <cell class="download" :title="info.name" v-for="(info, index) in attachFiles" is-link :key="index" @click.native="downloadFile(info.value)"></cell>-->
        </group>
    </div>
</template>

<script>
import { Group, Cell, GroupTitle } from 'vux'
import XButton from 'vux/src/components/x-button/index';

export default {
  name: "government-services-detail",
  components: {
    XButton,
    Group,
    Cell,
    GroupTitle
  },
  data: function () {
    return {
      titleData: '',
      attachFiles: [
      ],
      workInfo: [
        // { name: '业务名称', value: '医患纠纷人民调解服务' },
        // { name: '实施主体', value: '莒县司法局' },
        // { name: '法定结办时限', value: '1个工作日' },
        // { name: '是否收费', value: '不收费' },
        // { name: '办理形式', value: '仅窗口办理' },
        // { name: '咨询电话', value: '0633-6226336' },
        // { name: '受理地点', value: '莒县社会矛盾调处中心' }
      ]
    }
  },
  created () {
    this.getOfficeDetail().then(res => {
      this.workInfo = res.data.workInfo;
      this.attachFiles = res.data.attachFiles;
      this.titleData = res.data.title;
      document.title = res.data.officeName || '政务';
    })
  },
  methods: {
    downloadFile (url) {
      window.open(url)
    },
    getOfficeDetail (query) {
      return this.$api.get('/OfficeWork/WorkDetail?officeWorkId=' + this.$route.query.id, {
        params: query
      })
    },
  }
}
</script>

<style rel="stylesheet/less" lang="less">
    @import "../../styles/index.less";
    @import "../../styles/variable";

    .government-services-detail {
        min-height: 100vh;
        background-color: @B6;

        .weui-cells {
            margin-top: 0;
            padding-bottom: .3rem;
            &:before, &:after {
                border: none;
            }

            .weui-cell {
                padding: .3rem .24rem;
                justify-content: flex-start;
                align-items: flex-start;
                &:before {
                    border-top: 2px solid @L4;
                    left: 2rem;
                    right: .24rem;
                    top: auto;
                    bottom: 0;
                }

                p {
                    display: inline-block;
                }

                .vux-cell-bd {
                    flex: 0 1 auto;

                    .vux-label {
                        font-size: .28rem;
                        font-family: @FR;
                        min-width: 1.6rem;
                        max-width: 1.6rem;
                        font-weight: 400;
                        color: @T3;
                    }
                }
                .weui-cell__ft {
                    font-size: .28rem;
                    font-family: @FM;
                    font-weight: 600;
                    color: @T1;
                    flex: 1;
                    text-align: left !important;
                }
            }
            .download {
                margin-left: .2rem;
                margin-right: .2rem;
                width: 7.1rem;
                font-size: .28rem;
                height: .7rem;
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
        .setting-box {
            .weui-cells {
                padding-bottom: 0;
            }
        }
    }

</style>
