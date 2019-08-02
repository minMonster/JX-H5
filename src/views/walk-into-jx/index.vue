<!-- crated：2019-06-18  author：Monster  -->
<template>
    <div class='walk-into-jx'>
        <img src="../../assets/walk-into-jx/banner.jpg" alt="" class="banner">
        <div class="content">
            <div class="title-list">
                <div class="title" @click="currentSelected=index" v-for="(item, index) in classifyList" :key="item.id">
                    <div class="selected" :class="{'show-border': currentSelected==index}"></div>
                    <p class="text" :class="{'black': currentSelected==index}">{{item.name}}</p>
                </div>
            </div>
            <div class="info-list">
                <div class="jx-intro" v-if="currentSelected==0" v-html="briefContent">
                </div>
                <template v-for="(item, index) in classifyList">
                    <div class="jx-history" v-if="(currentSelected===index) && index !== 0" :key="item.id">
                        <ul class="tag-list">
                            <li class="tag" @click="$router.push({path: '/article-details', query: {id: info.id}})" v-for="info in item.news" :key="info.id">{{info.title}}</li>
                        </ul>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'walk-into-jx',
    data: function () {
      return {
        currentSelected: 0,
        classifyList: [],
        briefContent: '' //莒县概况
      };
    },
    created () {
      this.$api.get('/Columns/Index?columnID=1').then(res => {
        this.classifyList = res.data.classifyList;
        this.$api.get('/News/' + this.classifyList[0].news[0].id).then(data => {
          this.briefContent = data.data.content;
        })
      });
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
                        font-weight: bold;
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
                        font-weight: bold;
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
