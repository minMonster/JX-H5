<!-- crated：2019-06-18  author：Monster  -->
<template>
    <div class='specials'>
        <div class="activity" v-for="activity in activities" :key="activity.id">
            <div class="info">
                <p class="desc">{{activity.desc}}</p>
                <p class="date">{{activity.date}}</p>
            </div>
            <img :src="activity.imgSrc" alt="" class="pic">
        </div>
    </div>
</template>

<script>
  export default {
    name: 'specials',
    data: function () {
      return {
        activities: [
          {
            desc: '莒县开展2019年第一期“爱心相伴，呵护成长”农村留守儿童帮扶行动',
            date: '2019-01-09',
            imgSrc: require('../../assets/happy-in-jx/fun-1.jpg')
          },
          {
            desc: '莒县市场监管局开展计量知识进校园活动',
            date: '2019-02-09',
            imgSrc: require('../../assets/happy-in-jx/fun-1.jpg')
          },
          {
            desc: '莒县开展2019年第一期“爱心相伴，呵护成长”农村留守儿童帮扶行动',
            date: '2019-03-09',
            imgSrc: require('../../assets/happy-in-jx/fun-1.jpg')
          }
        ]
      }
    }
  };
</script>
<style rel="stylesheet/less" lang="less">

    @import "../../styles/index.less";
    @import "../../styles/variable";

    .specials {
        .activity {
            padding: .28rem .24rem .24rem;
            border-bottom: .01rem solid #F1F1F1;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .info {
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                .desc {
                    font-size: .28rem;
                    font-family: @FM;
                    font-weight: 600;
                    color: @T2;
                    line-height: .44rem;
                    margin-bottom: .18rem;
                    text-align: justify;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    word-break: break-all;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }

                .date {
                    font-size: .2rem;
                    font-family: @FR;
                    font-weight: 400;
                    color: @T4;
                    line-height:20px;
                }
            }

            .pic {
                width: 1.86rem;
                margin-left: .32rem;
                border-radius: .08rem;
            }
        }
    }
</style>
