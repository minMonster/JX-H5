<!-- crated：2019-06-18  author：Monster  -->
<template>
  <div class='medical-services'>
    <div class="medical-list">
      <div class="card" @click="toDetail(item.id)" v-for="item in hospitalList" :key="item.id"><img :src="item.photo"
                                                                                                    alt=""><span>{{item.name}}</span>
      </div>
    </div>
    <div class="group" v-for="group in newsClassifyList" :key="group.id">
      <div class="pat-title">
        {{group.name}}
        <div @click="$router.push({path: '/list-template/-1', query: {classifyId: group.id, title: group.name}})" class="check-more">查看更多></div>
      </div>
      <div class="card" @click="$router.push({path: 'article-details', query: {id: card.id}})"
           v-for="card in group.news" :key="card.id">
        <div class="info">
          <div class="dec">
            {{card.title}}
          </div>
          <!--                    <div class="tag">24观看·24点赞·32评论</div>-->
        </div>
        <img v-if="card.thumbnails" :src="card.thumbnails" alt="">
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'medical-services',
  data: function () {
    return {
      'hospitalList': [
        // {
        //   'id': 0,
        //   'name': 'string',
        //   'photo': require('../../assets/store/ic_shop_product_1.png')
        // }
      ],
      'newsClassifyList': [
        // {
        //   'id': 0,
        //   'name': 'string',
        //   'news': [
        //     {
        //       'id': 0,
        //       'title': 'string',
        //       'thumbnails': 'string',
        //       'briefContent': 'string',
        //       'createDate': '2019-06-25T15:05:12.672Z'
        //     }
        //   ]
        // }
      ]
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.getHospital()
    },
    toDetail (id) {
      this.$router.push({path: 'medical-services-detail', query: {id}})
    },
    getHospital () {
      this.$api.get('/Hospital/Index').then(res => {
        // this.$api.post('/UserInfo/GetUserInfo').then(res => {
        let data = res.data
        this.hospitalList = data.hospitalList
        this.newsClassifyList = data.newsClassifyList
      }).catch(e => {
        if (e.code) {
          this.$vux.toast.text(e.message)
        } else {
          this.$vux.toast.text(e)
        }
      })
    }
  }
}
</script>
<style rel="stylesheet/less" lang="less">

  @import "../../styles/index.less";
  @import "../../styles/variable";

  .medical-services {
    .medical-list {
      padding: .24rem;
      padding-bottom: .1rem;
      overflow: hidden;

      .card {
        float: left;
        display: flex;
        margin-bottom: .14rem;
        align-items: center;
        width: 3.44rem;
        padding-left: .2rem;
        height: 1.3rem;
        background-color: #F3F5F6;
        border-radius: .08rem;
        margin-right: .14rem;

        &:nth-child(2n) {
          margin-right: 0;
        }

        img {
          height: .8rem;
          width: .8rem;
          border-radius: 50%;
          margin-right: .16rem;
        }

        span {
          font-size: .26rem;
          color: @T1;
          font-weight: bold;
        }
      }
    }

    .group {
      padding-bottom: .3rem;

      .pat-title {
        padding: .24rem;
        font-size: .36rem;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: .36rem;
        position: relative;
        .check-more {
          font-size: .28rem;
          position: absolute;
          right: .24rem;
          top: 30%;
          font-weight: normal;
          color: #999999;
        }
      }

      .card {
        display: flex;
        margin: .24rem;
        border-bottom: 1px solid #EBEEF4;
        margin-bottom: 0;
        padding-bottom: .24rem;

        .info {
          flex: 1;
          padding-right: .36rem;

          .dec {
            font-size: .28rem;
            font-weight: bold;
            color: rgba(53, 53, 53, 1);
            line-height: .44rem;
            height: .88rem;
            overflow: hidden;
          }

          .tag {
            font-size: .2rem;
            font-weight: 400;
            color: rgba(203, 203, 203, 1);
            line-height: .2rem;
            margin-top: .18rem;
          }
        }

        img {
          width: 1.86rem;
          height: 1.28rem;
          border-radius: .08rem;
        }
      }
    }
  }
</style>
