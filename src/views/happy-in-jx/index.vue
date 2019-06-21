<!-- crated：2019-06-18  author：Monster  -->
<template>
    <div class='happy-in-jx'>
        <div class="fun-list">
            <div class="fun" v-for="fun in funs" :key="fun.id">
                <img :src="fun.src" class="pic" alt="">
                <div class="info">
                    <p class="name">{{fun.name}}</p>
                    <div class="desc">{{fun.desc}}</div>
                    <p class="date">{{fun.date}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'happy-in-jx',
    data: function () {
      return {
        funs: [
          {
            src: require('../../assets/happy-in-jx/fun-1.jpg'),
            name: '莒县樱桃采摘园正式对外开放',
            desc: '2019年6月12日莒县樱桃采摘园正式开园，届时',
            date: '2019-01-19'
          },
          {
            src: require('../../assets/happy-in-jx/fun-1.jpg'),
            name: '莒县樱桃采摘园正式对外开放',
            desc: '2019年6月12日莒县樱桃采摘园正式开园，届时',
            date: '2019-01-19'
          },
          {
            src: require('../../assets/happy-in-jx/fun-1.jpg'),
            name: '莒县樱桃采摘园正式对外开放',
            desc: '2019年6月12日莒县樱桃采摘园正式开园，届时',
            date: '2019-01-19'
          },
          {
            src: require('../../assets/happy-in-jx/fun-1.jpg'),
            name: '莒县樱桃采摘园正式对外开放',
            desc: '2019年6月12日莒县樱桃采摘园正式开园，届时',
            date: '2019-01-19'
          }
        ]
      }
    }
  };
</script>
<style rel="stylesheet/less" lang="less">

    @import "../../styles/index.less";
    @import "../../styles/variable";

    .happy-in-jx {
        .fun-list {
            width: 100vw;
            padding: 0 .24rem .24rem;

            .fun {
                width: 100%;
                height: 1.92rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: .28rem 0 .2rem;
                border-bottom: .01rem solid #F1F1F1;

                .pic {
                    width: 1.86rem;
                    height: 1.38rem;
                    border-radius: .08rem;
                    margin-right: .34rem;
                }

                .info {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;

                    .name {
                        font-size: .28rem;
                        font-family: @FM;
                        font-weight: 600;
                        color: @T2;
                        line-height: .28rem;
                        margin-bottom: .14rem;
                    }

                    .desc {
                        font-size: .24rem;
                        font-family: @FR;
                        font-weight: 400;
                        color: @T3;
                        line-height: .32rem;
                        overflow: hidden;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        word-break: break-all;
                        text-overflow: ellipsis;
                        text-align: justify;
                    }

                    .date {
                        font-size: .2rem;
                        font-family: @FR;
                        font-weight: 400;
                        color: @T4;
                        line-height: .2rem;
                        text-align: right;
                        margin-top: .06rem;
                    }
                }
            }
        }
    }
</style>
