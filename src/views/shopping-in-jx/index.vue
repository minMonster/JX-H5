<!-- crated：2019-06-18  author：Monster  -->
<template>
    <div class='shopping-in-jx'>
        <div class="product-list">
            <div class="product" v-for="product in products" :key="product.id">
                <img :src="product.src" class="pic" alt="">
                <div class="info">
                    <p class="name">{{product.name}}</p>
                    <div class="desc">{{product.desc}}</div>
                    <a :href="product.href" class="check-more">查看更多></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'shopping-in-jx',
    data: function () {
      return {
        products: [
          {
            src: require('../../assets/shopping-in-jx/product-1.png'),
            name: '嗡嗡乐蜂蜜',
            desc: '想买蜂蜜,但市面上产品众多不知怎样选择?带你品尝真正的土蜂蜜想买蜂蜜,但市面上产品众多不知怎样选择?带你品尝真正的土蜂蜜....',
            href: '#'
          },
          {
            src: require('../../assets/shopping-in-jx/product-1.png'),
            name: '嗡嗡乐蜂蜜',
            desc: '想买蜂蜜,但市面上产品众多不知怎样选择?带你品尝真正的土蜂蜜想买蜂蜜,但市面上产品众多不知怎样选择?带你品尝真正的土蜂蜜....',
            href: '#'
          },
          {
            src: require('../../assets/shopping-in-jx/product-1.png'),
            name: '嗡嗡乐蜂蜜',
            desc: '想买蜂蜜,但市面上产品众多不知怎样选择?带你品尝真正的土蜂蜜想买蜂蜜,但市面上产品众多不知怎样选择?带你品尝真正的土蜂蜜....',
            href: '#'
          }
        ]
      }
    }
  };
</script>
<style rel="stylesheet/less" lang="less">

    @import "../../styles/index.less";

    .shopping-in-jx {
        .product-list {
            width: 100vw;
            padding: .24rem;

            .product {
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
                        font-weight: 600;
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
