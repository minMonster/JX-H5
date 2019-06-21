<!-- crated：2019-06-18  author：Monster  -->
<template>
    <div class='walk-into-jx'>
        <img src="../../assets/walk-into-jx/banner.jpg" alt="" class="banner">
        <div class="content">
            <div class="title-list">
                <div class="title" @click="currentSelected=0">
                    <div class="selected" :class="{'show-border': currentSelected==0}"></div>
                    <p class="text" :class="{'black': currentSelected==0}">莒县概况</p>
                </div>
                <div class="title" @click="currentSelected=1">
                    <div class="selected" :class="{'show-border': currentSelected==1}"></div>
                    <p class="text" :class="{'black': currentSelected==1}">历史文化</p>
                </div>
                <div class="title" @click="currentSelected=2">
                    <div class="selected" :class="{'show-border': currentSelected==2}"></div>
                    <p class="text" :class="{'black': currentSelected==2}">地方名人</p>
                </div>
            </div>
            <div class="info-list">
                <div class="jx-intro" v-if="currentSelected==0">
                    <p class="info">
                        莒（jǔ）县，隶属于山东省日照市，位于山东省东南部日照市西部，面积1821平方千米。
                    </p>
                    <p class="info">
                        莒县历史悠久，是千年古县、省级历史文化名城、文化强省建设先进县。县城曾是春秋时期莒国都城所在地，是山东省面积最大的古城，“毋忘在莒”的典故就出在这里。陵阳河遗址出土的原始陶文，早甲骨文1500多年，是中国文字的始祖，莒文化与齐文化、鲁文化并称为山东三大文化。
                    </p>
                    <p class="info">
                        截至2018年，莒县下辖4个街道、15个镇、1个乡、1个开发区 [2] ，常住人口99.68万人，实现地区生产总值（GDP）410.27亿元，其中：第一产业增加值47.22亿元，第二产业增加值168.85亿元，第三产业增加值194.2亿元，三次产业比例为11.5：41.2：47.3，人均地区生产总值41291元。
                    </p>
                </div>
                <div class="jx-history" v-if="currentSelected==1">
                    <ul class="tag-list">
                        <li class="tag" v-for="tag in 4" :key="tag.id">周初莒国建都故址考</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'walk-into-jx',
    data: function () {
      return {
        currentSelected: 0
      }
    }
  };
</script>
<style rel="stylesheet/less" lang="less">

    @import "../../styles/index.less";
    @import "../../styles/variable";

    .walk-into-jx {
        .banner {
            width: 100%;
            height: 3rem;
        }

        .content {
            padding: .66rem .24rem 0;

            .title-list {
                width: 100%;

                .title {
                    position: relative;
                    display: inline-block;
                    width: 1.56rem;
                    height: .44rem;
                    margin-right: .96rem;
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

                    .text {
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
        }

        .info-list {
            .jx-intro {
                margin-top: .52rem;

                .info {
                    font-size: .28rem;
                    font-family: @FR;
                    font-weight: 400;
                    color: @T1;
                    line-height: .42rem;
                    text-align: justify;
                }
            }

            .jx-history {
                margin-top: .82rem;

                .tag-list {
                    padding-left: .36rem;
                    box-sizing: border-box;

                    .tag {
                        font-size: .36rem;
                        font-family: @FM;
                        font-weight: 600;
                        color: @T1;
                        line-height: .5rem;
                        margin-bottom: .4rem;
                        list-style-type: disc;
                    }
                }
            }
        }
    }
</style>
