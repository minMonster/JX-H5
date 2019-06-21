<!-- crated：2019-06-18  author：Monster  -->
<template>
    <div class='swim-in-jx'>
        <div class="spot-list">
            <div class="spot" v-for="spot in spots" :key="spot.id">
                <img :src="spot.src" class="pic" alt="">
                <div class="info">
                    <p class="name">{{spot.name}}</p>
                    <div class="desc">{{spot.desc}}</div>
                    <a :href="spot.href" class="check-more">查看更多></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'swim-in-jx',
    data: function () {
      return {
        spots: [
          {
            src: require('../../assets/swim-in-jx/spot-1.jpg'),
            name: '浮来山风景区',
            desc: '浮来山风景区是国家AAAAA级旅游风景，省级风景名胜浮来山风景区是国家AAAAA级旅游风景，省级浮来山风景区是国家AAAAA级旅游风景，省级风景名胜浮来山风景区是国家AAAAA',
            href: '#'
          },
          {
            src: require('../../assets/swim-in-jx/spot-2.jpg'),
            name: '浮来山风景区',
            desc: '浮来山风景区是国家AAAAA级旅游风景，省级风景名胜浮来山风景区是国家AAAAA级旅游风景，省级浮来山风景区是国家AAAAA级旅游风景，省级风景名胜浮来山风景区是国家AAAAA',
            href: '#'
          },
          {
            src: require('../../assets/swim-in-jx/spot-1.jpg'),
            name: '浮来山风景区',
            desc: '浮来山风景区是国家AAAAA级旅游风景，省级风景名胜浮来山风景区是国家AAAAA级旅游风景，省级浮来山风景区是国家AAAAA级旅游风景，省级风景名胜浮来山风景区是国家AAAAA',
            href: '#'
          },
          {
            src: require('../../assets/swim-in-jx/spot-2.jpg'),
            name: '浮来山风景区',
            desc: '浮来山风景区是国家AAAAA级旅游风景，省级风景名胜浮来山风景区是国家AAAAA级旅游风景，省级浮来山风景区是国家AAAAA级旅游风景，省级风景名胜浮来山风景区是国家AAAAA',
            href: '#'
          }
        ]
      }
    }
  };
</script>
<style rel="stylesheet/less" lang="less">

    @import "../../styles/index.less";
    @import "../../styles/variable";

    .swim-in-jx {
        .spot-list {
            width: 100vw;
            padding: .24rem;

            .spot {
                width: 100%;
                height: 1.92rem;
                display: flex;
                justify-content: space-between;
                margin-bottom: .43rem;
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
                        font-family: @FM;
                        font-weight: 600;
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
                        -webkit-line-clamp: 3;
                        word-break: break-all;
                        text-overflow: ellipsis;
                        text-align: justify;
                    }

                    .check-more {
                        font-size: .2rem;
                        font-family: @FR;
                        font-weight: 400;
                        color: @T4;
                        line-height: .2rem;
                        text-align: right;
                    }
                }
            }
        }
    }
</style>
