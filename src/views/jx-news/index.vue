<!-- crated：2019-06-18  author：Monster  -->
<template>
    <div class='jx-news'>
        <div class="variety" v-for="variety in varieties" :key="variety.id">
            <div class="header">
                <div class="title">
                    <div class="bg"></div>
                    <div class="text">{{variety.name}}</div>
                </div>
<!--                <a :href="variety.href" class="check-more">查看更多></a>-->
            </div>
            <div class="news-list">
                <div class="news" @click="$router.push({path: '/article-details', query: {id: newsItem.id}})" v-for="newsItem in variety.news" :key="newsItem.id">
                    <div class="content">
                        <p class="info">{{newsItem.title}}</p>
<!--                        <p class="feedback">{{newsItem.watch}}观看·{{news.thumpUp}}点赞·{{news.comment}}评论</p>-->
                    </div>
                    <div class="img-display" v-if="newsItem.thumbnails">
                        <img :src="newsItem.thumbnails" alt="" class="pic">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'jx-news',
    data: function () {
      return {
        varieties: [
          {
            title: '综合新闻',
            href: '#',
            hotNews: [
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
          },
          {
            title: '公告公示',
            href: '#',
            hotNews: [
              {
                info: '体检前不能做的8件事，否则钱容易白话',
                watch: 18,
                thumpUp: 60,
                comment: 52,
                imgSrc: require('../../assets/investment-in-jx/investment-1.png')
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
                watch: 18,
                thumpUp: 60,
                comment: 52,
                imgSrc: require('../../assets/investment-in-jx/investment-1.png')
              }
            ]
          },
          {
            title: '部门工作',
            href: '#',
            hotNews: [
              {
                info: '体检前不能做的8件事，否则钱容易白话',
                watch: 18,
                thumpUp: 60,
                comment: 52,
                imgSrc: require('../../assets/investment-in-jx/investment-1.png')
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
        ]
      }
    },
    created () {
      this.$api.get('/Columns/Index?columnID=' + 7).then(res => {
        this.varieties = res.data.classifyList;
        document.title = res.data.model.name || '莒e通';
      })
    }
  };
</script>
<style rel="stylesheet/less" lang="less">

    @import "../../styles/index.less";
    @import "../../styles/variable";

    .jx-news {
        .variety {
            padding: .42rem .24rem .2rem;
            border-bottom: .02rem solid @L4;

            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: .18rem;

                .title {
                    position: relative;
                    display: inline-block;
                    width: 1.56rem;
                    height: .44rem;

                    .bg {
                        width: 100%;
                        height: .24rem;
                        position: absolute;
                        bottom: 0;
                        background: linear-gradient(180deg, rgba(255, 247, 179, 1) 0%, rgba(255, 222, 144, 1) 100%);
                        z-index: -1;
                    }

                    .text {
                        font-size: .36rem;
                        font-family: @FM;
                        font-weight: 600;
                        color: @T1;
                        line-height: 100%;
                    }
                }

                .check-more {
                    font-size: .2rem;
                    font-family: @FR;
                    font-weight: 400;
                    color: @T4;
                    line-height: .2rem;
                }
            }

            .news-list {
                .news {
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
            }
        }
    }
</style>
