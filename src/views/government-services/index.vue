<!-- crated：2019-06-23  author：Monster  -->
<template>
    <div class='government-services'>
        <group>
            <cell v-for="(tab, index) in tabs"
                  :key="index"
                  :title="tab.title"
                  is-link
                  :link="{path: '/government-services/detail', query: {id: tab.id}}">
                <div class="circle" slot="icon"></div>
            </cell>
        </group>
    </div>
</template>

<script>
  import { Group, Cell } from 'vux';
  export default {
    name: 'government-services',
    components: {
      Group,
      Cell
    },
    data: function () {
      return {
        tabs: [
          // {name: '立户和分户登记', path: ''},
          // {name: '户口迁入登记', path: ''},
          // {name: '变更更正户口登记项目', path: ''},
          // {name: '出生登记', path: ''},
          // {name: '死亡人员户口注销', path: ''},
          // {name: '亲属关系证明', path: ''}
        ]
      };
    },
    created () {
      console.log(this.$route.query, 'queryasdasdas');
      this.getList()
    },
    methods: {
      getOfficeIndex (query) {
        return this.$api.get('/Office/Index', {
          params: query
        });
      },
      getOfficeWorkList (query) {
        return this.$api.get('/OfficeWork/WorkList', {
          params: query
        });
      },

      getList () {
        this.getOfficeWorkList({officeId: this.$route.query.id, pageSize: 100, pageIndex: 1}).then(res => {
          console.log(res,  'getOfficeWorkList')
          this.tabs = res.data.workList.list;
          document.title = res.data.officeName || '政务';
        })
      }
    }
  };
</script>
<style rel="stylesheet/less" lang="less">

    @import "../../styles/index.less";
    @import "../../styles/variable";

    .government-services {
        .weui-cells {
            margin: 0;

            &:before {
                border: none;
            }

            &:after {
                border-bottom: 2px solid @L4;
                top: auto;
                bottom: 0;
                left: .24rem;
                right: .24rem;
            }

            .weui-cell {
                height: 1.16rem;
                padding: .42rem .3rem;
                font-size: .36rem;
                font-family: @FM;
                font-weight: 600;
                color: @T1;
                line-height: .36rem;

                &:before {
                    border-top: 2px solid @L4;
                    left: .24rem;
                    right: .24rem;
                }

                .weui-cell__ft:after {
                    border-color: @T5;
                }
            }
        }

        .circle {
            width: .16rem;
            height: .16rem;
            border-radius: 50%;
            background-color: #5592F8;
            margin-right: .2rem;
        }
    }
</style>
