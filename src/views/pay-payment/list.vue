<!-- crated：2019-07-14  author：Monster  -->
<template>
  <div class='pay-payment-list'>
    <div class="pay-card" @click="select(card, index)" v-for="(card, index) in lists" :key="card.id">
      <div class="icon-checkbox">
        <icon :type="card.active?'success':'circle'"></icon>
      </div>
      <div class="info">
        <div class="title">{{card.feeitemname}}</div>
        <div class="timer">开始日期：{{card.starttime}}</div>
        <div class="timer">结束日期：{{card.endtime}}</div>
      </div>
      <div class="money">¥{{card.totalmoney}}</div>
    </div>
    <div class="buttons">
      <div class="money-num-box">应付金额：<span class="num-money">¥{{numMoney}}</span></div>
      <div class="hyper-link" @click="pay">结算</div>
    </div>
  </div>
</template>

<script>
import { Icon } from 'vux'

export default {
  name: 'pay-payment-list',
  components: {
    Icon
  },
  data: function () {
    return {
      numMoney: 0,
      lists: [
        {
          title: '1月物业费',
          money: 199.00,
          data: '2019-01-29',
          id: 1,
          active: false
        },
        {
          title: '2月物业费',
          data: '2019-02-29',
          money: 199.00,
          id: 2,
          active: false
        },
        {
          title: '3月物业费',
          data: '2019-03-29',
          money: 199.00,
          id: 3,
          active: false
        }
      ]
    }
  },
  created () {
    //
    let query = this.$route.query
    this.$api.get('/HouseManage/AppGetFee?houseId=' + query.roomId + '&companyId=' + query.companyId).then(res => {
      this.lists = res.data
    })
  },
  methods: {
    pay () {
      if (this.numMoney === 0) {
        this.$vux.toast.text('请至少选择一份账单')
      } else {
        let generateDetailIds = []
        this.lists.map(i => {
          if (i.active === true) {
            generateDetailIds.push(i.id)
          }
        })
        this.$api.get('/HouseManage/AppInsertOrder', {
          params: {
            generateDetailIds: generateDetailIds.join(','),
            totalPay: this.numMoney,
            prepaid: 0,
            companyId: this.$route.query.companyId,
            houseId: this.$route.query.roomId
            // token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3VzZXJkYXRhIjoie1wiVXNlcklEXCI6MTAwMDI0MSxcIlVzZXJUeXBlXCI6XCJVc2VyXCIsXCJOYW1lXCI6XCIxODU1MzUzNjIyMVwifSIsIm5iZiI6MTU2MzA5MzY4MCwiZXhwIjoxNTYzMTgwMDgwfQ.UveLxPLrwyOZEkvCM0-Y6AZH6u3gWYZbhuKX9XYM0sc'
          }
        }).then(res => {
          if (res.success) {
            this.$router.push({
              path: '/immediate-pay',
              query: {
                companyId: this.$route.query.companyId,
                dbName: res.dbName,
                orderId: res.orderId,
                numMoney: this.numMoney,
                roomName: this.$route.query.roomName
              }
            })
          } else {
            this.$vux.toast.text(res.message)
          }
        })
        // this.$router.push({
        //   path: '/immediate-pay', query: {
        //     numMoney: this.numMoney || 123,
        //     roomName: this.$route.query.roomName || '123123'
        //   }
        // });
        // this.$vux.toast.text('支付功能暂未开放');
      }
    },
    select (card, index) {
      if (card.active) {
        this.numMoney -= Number(this.lists[index].totalmoney)
      } else {
        this.numMoney += Number(this.lists[index].totalmoney)
      }
      this.numMoney = Number(this.numMoney.toFixed(2))
      card.active = !card.active
    }
  }
}
</script>
<style rel="stylesheet/less" lang="less">

  @import "../../styles/index.less";

  .pay-payment-list {
    background-color: #F3F5F6;
    min-height: 100vh;
    padding-top: .25rem;
    padding-bottom: 1rem;

    .pay-card {
      margin: .25rem;
      margin-top: 0;
      background-color: #fff;
      padding: .36rem .23rem;
      display: flex;

      .icon-checkbox {
        padding-top: .05rem;
      }

      .info {
        flex: 1;

        .title {
          color: #353535;
          font-size: .28rem;
          padding-bottom: .24rem;
        }

        .timer {
          color: #999999;
          font-size: .24rem;
        }
      }

      .money {
        color: #353535;
        font-size: .28rem;
      }

      .weui-icon {
        font-size: .3rem;
      }

      .weui-icon-success {
        color: #F37D31;
      }
    }

    .buttons {
      position: fixed;
      display: flex;
      width: 100%;
      left: 0;
      font-size: 0.28rem;
      color: #fff;
      bottom: 0;

      .money-num-box {
        flex: 1;
        display: flex;
        align-items: center;
        padding-left: .24rem;
        height: 1rem;
        background-color: #fff;
        color: #333333;

        span {
          color: #F05A23;
        }
      }

      .hyper-link {
        width: 2.47rem;
        display: flex;
        height: 1rem;
        justify-content: center;
        align-items: center;
        background: linear-gradient(179deg, rgba(255, 172, 94, 1) 0%, rgba(243, 125, 49, 1) 100%);

        img {
          width: .39rem;
          height: .33rem;
          margin-right: .08rem;
        }
      }
    }
  }
</style>
