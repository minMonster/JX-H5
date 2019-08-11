<!-- crated：2019-06-18  author：Monster  -->
<template>
    <div class='investment-in-jx'>
        <div class="tab-list">
            <div class="tab" @click="current=index" v-for="(item, index) in works" :key="item.id">
                <div class="selected" :class="{'show-border': current==index}"></div>
                <p class="title" :class="{'black': current==index}">{{item.name}}</p>
            </div>
        </div>
        <template v-for="(item, index) in works">
            <div class="bussiness" v-if="current==index" :key="item.id">
                <div class="work" @click="$router.push({path: '/article-details', query: {id: work.id}})" v-for="work in item.news" :key="work.id">
                    <div class="content">
                        <p class="info">{{work.title}}</p>
                        <p class="feedback">{{work.createDate}}</p>
                    </div>
                    <div v-if="work.thumbnails" class="img-display">
                        <img :src="work.thumbnails" alt="" class="pic">
                    </div>
                </div>
                <div @click="$router.push({path: '/list-template/-1', query: {classifyId: item.id, title: item.name}})" class="check-more">查看更多></div>
            </div>
        </template>

    </div>
</template>

<script>
export default {
  name: 'investment-in-jx',
  data: function () {
    return {
      current: 0,
      works: []
    }
  },
  created () {
    this.$api.get('/Columns/Index?columnID=' + 5).then(res => {
      this.works = res.data.classifyList;
      document.title = res.data.model.name || '莒e通';
    })
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
                    font-weight: bold;
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
                padding: .28rem .15rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-radius: .05rem;
                border-bottom: 1px solid #EBEEF4;
                .content {
                    display: flex;
                    justify-content: space-between;
                    flex-direction: column;
                    height: 1rem;
                    .info {
                        font-size: .28rem;
                        font-family: @FM;
                        font-weight: bold;
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
                        height: 1.28rem;
                        border-radius: .06rem;
                    }
                }
            }

            .check-more {
                font-size: .28rem;
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
