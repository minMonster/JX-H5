<!-- crated：2019-06-18  author：Monster  -->
<template>
  <div class='list-template'>
    <scroller :on-refresh="refresh" :on-infinite="infinite" noDataText="没有更多数据"
              :style="{height: contentHeight, top: contentTop}" style="width: 100%;">
      <div class="food-list">
        <div class="food" @click="$router.push({path: '/article-details', query: {id: food.id}})" v-for="food in foods"
             :key="food.id">
          <img v-if="food.thumbnails" :src="food.thumbnails" class="pic" alt="">
          <div class="info">
            <p class="name">{{food.title}}</p>
            <div class="desc">{{food.briefContent}}</div>
            <!--                    <a :href="food.href" class="check-more">查看更多></a>-->
          </div>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
export default {
  name: 'list-template',
  data: function () {
    return {
      contentHeight: '', // 容器高度
      contentTop: '',
      foods: [
        // {
        //   src: require('../../assets/eat-in-jx/food-1.jpg'),
        //   name: '莒县全羊',
        //   desc: '莒县羊汤馆门面众多，最有名的当属任记羊汤馆著名笑星陈佩斯莒县羊汤馆门面众多，最有名的当属任记羊汤馆著名笑星陈佩斯...莒县羊汤馆门面众多，最有名的当属任记羊汤馆著名笑星陈佩斯',
        //   href: '#'
        // },
        // {
        //   src: require('../../assets/eat-in-jx/food-1.jpg'),
        //   name: '莒县全羊',
        //   desc: '莒县羊汤馆门面众多，最有名的当属任记羊汤馆著名笑星陈佩斯...莒县羊汤馆门面众多，最有名的当属任记羊汤馆著名笑星陈佩斯...',
        //   href: '#'
        // },
        // {
        //   src: require('../../assets/eat-in-jx/food-1.jpg'),
        //   name: '莒县全羊',
        //   desc: '莒县羊汤馆门面众多，最有名的当属任记羊汤馆著名笑星陈佩斯...莒县羊汤馆门面众多，最有名的当属任记羊汤馆著名笑星陈佩斯...',
        //   href: '#'
        // },
        // {
        //   src: require('../../assets/eat-in-jx/food-1.jpg'),
        //   name: '莒县全羊',
        //   desc: '莒县羊汤馆门面众多，最有名的当属任记羊汤馆著名笑星陈佩斯...莒县羊汤馆门面众多，最有名的当属任记羊汤馆著名笑星陈佩斯...',
        //   href: '#'
        // }
      ],
      pageOptions: {
        pageIndex: 1,
        pageSize: 20,
        id: 0
      }
    }
  },
  created () {
    if (this.$route.query.classifyId) {
      this.pageOptions.id = this.$route.query.classifyId
      document.title = this.$route.query.title || '莒e通'
      this.getList()
    } else {
      this.$api.get('/Columns/Index?columnID=' + this.$route.params.id).then(res => {
        this.pageOptions.id = res.data.classifyList[0].id
        document.title = res.data.model.name || '莒e通'
        this.getList()
      })
    }
  },
  mounted () {
    this.contentHeight = document.documentElement.clientHeight
    this.contentTop = 0
  },
  methods: {
    getList (done) {
      this.$api.get('/News/List?pageIndex=' + this.pageOptions.pageIndex + '&pageSize=' + this.pageOptions.pageSize + '&classifyId=' + this.pageOptions.id).then(res => {
        this.foods = res.data.list
        if (done) done(true)
        // document.title = res.data.model.name || '莒e通'
      })
    },
    refresh (done) {
      this.foods = []
      this.pageOptions.pageSize = 15
      this.getList(done)
    },
    infinite (done) {
      this.pageOptions.pageSize += 15
      this.getList(done)
    }
  }
}
</script>
<style rel="stylesheet/less" type="text/less" lang="less">

  @import "../../styles/index.less";
  @import "../../styles/variable.less";

  .list-template {

    .food-list {
      width: 100vw;
      padding: .24rem;

      .food {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: .32rem;
        border-bottom: 1px solid #F3F5F6;
        padding-bottom: .2rem;
        max-height: 1.92rem;

        &:last-child {
          margin-bottom: 0;
        }

        .pic {
          width: 2.78rem;
          border-radius: .08rem;
          margin-right: .3rem;
        }

        .info {
          flex: 1;
          display: flex;
          flex-direction: column;

          /*justify-content: space-between;*/

          .name {
            font-size: .28rem;
            font-family: @FM;
            font-weight: bold;
            color: @T2;
            line-height: .44rem;
            margin-bottom: .14rem;
          }

          .desc {
            font-size: .24rem;
            font-family: @FR;
            font-weight: 400;
            color: @T2;
            line-height: .36rem;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            word-break: break-all;
            text-overflow: ellipsis;
            text-align: justify;
          }

          .check-more {
            font-size: .2rem;
            font-family: @FR;
            font-weight: 400;
            color: #CBCBCB;
            line-height: .2rem;
            text-align: right;
            margin: .4rem 0 .04rem;
          }

        }
      }
    }
  }
</style>
