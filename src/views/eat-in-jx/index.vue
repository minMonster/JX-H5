<!-- crated：2019-06-18  author：Monster  -->
<template>
    <div class='eat-in-jx'>
        <div class="food-list">
            <div class="food" v-for="food in foods" :key="food.id">
                <img :src="food.src" class="pic" alt="">
                <div class="info">
                    <p class="name">{{food.name}}</p>
                    <div class="desc">{{food.desc}}</div>
                    <a :href="food.href" class="check-more">查看更多></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'eat-in-jx',
    data: function () {
      return {
        foods: [
          {
            src: require('../../assets/eat-in-jx/food-1.jpg'),
            name: '莒县全羊',
            desc: '莒县羊汤馆门面众多，最有名的当属任记羊汤馆著名笑星陈佩斯莒县羊汤馆门面众多，最有名的当属任记羊汤馆著名笑星陈佩斯...莒县羊汤馆门面众多，最有名的当属任记羊汤馆著名笑星陈佩斯',
            href: '#'
          },
          {
            src: require('../../assets/eat-in-jx/food-1.jpg'),
            name: '莒县全羊',
            desc: '莒县羊汤馆门面众多，最有名的当属任记羊汤馆著名笑星陈佩斯...莒县羊汤馆门面众多，最有名的当属任记羊汤馆著名笑星陈佩斯...',
            href: '#'
          },
          {
            src: require('../../assets/eat-in-jx/food-1.jpg'),
            name: '莒县全羊',
            desc: '莒县羊汤馆门面众多，最有名的当属任记羊汤馆著名笑星陈佩斯...莒县羊汤馆门面众多，最有名的当属任记羊汤馆著名笑星陈佩斯...',
            href: '#'
          },
          {
            src: require('../../assets/eat-in-jx/food-1.jpg'),
            name: '莒县全羊',
            desc: '莒县羊汤馆门面众多，最有名的当属任记羊汤馆著名笑星陈佩斯...莒县羊汤馆门面众多，最有名的当属任记羊汤馆著名笑星陈佩斯...',
            href: '#'
          }
        ]
      }
    }
  };
</script>
<style rel="stylesheet/less" lang="less">

    @import "../../styles/index.less";

    .eat-in-jx {
        .food-list {
            width: 100vw;
            padding: .24rem;

            .food {
                width: 100%;
                height: 1.92rem;
                display: flex;
                justify-content: space-between;
                margin-bottom: .32rem;
                &:last-child {
                    margin-bottom: 0;
                }

                .pic {
                    width: 2.78rem;
                    border-radius: .08rem;
                    margin-right: .3rem;
                }

                .info {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;

                    .name {
                        font-size: .28rem;
                        font-family: PingFangSC-Medium;
                        font-weight: bold;
                        color: #353535;
                        line-height: .44rem;
                        margin-bottom: .14rem;
                    }

                    .desc {
                        font-size: .24rem;
                        font-family: PingFangSC-Regular;
                        font-weight: 400;
                        color: #353535;
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
                        font-family: PingFangSC-Regular;
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
