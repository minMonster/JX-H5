import Vue from 'vue'
import Router from 'vue-router'
import { nativeRoute } from './native-route'
import * as auth from '@/common/auth'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {title: 'home'},
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: resolve => require(['@/views/home'], resolve)
    },
    {
      path: '/complaints-suggestions',
      name: 'complaints-suggestions',
      meta: {title: '投诉建议'},
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: resolve => require(['@/views/complaints-suggestions/index'], resolve)
    },
    {
      path: '/warranty-maintenance',
      name: 'warranty-maintenance',
      meta: {title: '报修维护'},
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: resolve => require(['@/views/warranty-maintenance/index'], resolve)
    },
    {
      path: '/article-details',
      name: 'article-details',
      meta: {title: '文章详情'},
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: resolve => require(['@/views/article-details/index'], resolve)
    },
    {
      path: '/pay-payment',
      name: 'pay-payment',
      meta: {title: '缴费付款'},
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: resolve => require(['@/views/pay-payment/index'], resolve)
    },
    {
      path: '/pay-payment-list',
      name: 'pay-payment-list',
      meta: {title: '费用列表'},
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: resolve => require(['@/views/pay-payment/list'], resolve)
    },
    {
      path: '/list-template/:id',
      name: 'list-template',
      meta: {title: ''},
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: resolve => require(['@/views/list-template/index'], resolve)
    },
    {
      path: '/convenient-people-life',
      name: 'convenient-people-life',
      meta: {title: '便民服务'},
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: resolve => require(['@/views/convenient-people-life/index'], resolve)
    },
    {
      path: '/domestic-services',
      name: 'domestic-services',
      meta: {title: '家政服务'},
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: resolve => require(['@/views/domestic-services/index'], resolve)
    },
    {
      path: '/on-site-repair',
      name: 'on-site-repair',
      meta: {title: ''},
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: resolve => require(['@/views/on-site-repair/index'], resolve)
    },
    {
      path: '/domestic-services-detail',
      name: 'domestic-services-detail',
      meta: {title: '服务详情'},
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: resolve => require(['@/views/domestic-services/detail'], resolve)
    },
    {
      path: '/eat-in-jx',
      name: 'eat-in-jx',
      meta: {title: '吃在莒县'},
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: resolve => require(['@/views/eat-in-jx/index'], resolve)
    },
    {
      path: '/happy-in-jx',
      name: 'happy-in-jx',
      meta: {title: '乐在莒县'},
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: resolve => require(['@/views/happy-in-jx/index'], resolve)
    },
    {
      path: '/investment-in-jx',
      name: 'investment-in-jx',
      meta: {title: '投在莒县'},
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: resolve => require(['@/views/investment-in-jx/index'], resolve)
    },
    {
      path: '/jx-news',
      name: 'jx-news',
      meat: {title: '莒县新闻'},
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: resolve => require(['@/views/jx-news/index'], resolve)
    },
    {
      path: '/medical-services',
      name: 'medical-services',
      meta: {title: '医疗服务'},
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: resolve => require(['@/views/medical-services/index'], resolve)
    },
    {
      path: '/medical-services-detail',
      name: 'medical-services-detail',
      meta: {title: '医疗服务'},
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: resolve => require(['@/views/medical-services/detaile'], resolve)
    },
    {
      path: '/shopping-in-jx',
      name: 'shopping-in-jx',
      meta: {title: '购在莒县'},
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: resolve => require(['@/views/shopping-in-jx/index'], resolve)
    },
    {
      path: '/specials',
      name: 'specials',
      meta: {title: '特色专题'},
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: resolve => require(['@/views/specials/index'], resolve)
    },
    {
      path: '/swim-in-jx',
      name: 'swim-in-jx',
      meta: {title: '游在莒县'},
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: resolve => require(['@/views/swim-in-jx/index'], resolve)
    },
    {
      path: '/walk-into-jx',
      name: 'walk-into-jx',
      meta: {title: '走进莒县'},
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: resolve => require(['@/views/walk-into-jx/index'], resolve)
    },
    {
      path: '/store',
      name: 'index.vue',
      meta: {title: '商城'},
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: resolve => require(['@/views/store/index'], resolve)
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      meta: {title: '用户登录'},
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when ，the route is visited.
      component: resolve => require(['@/views/sign-in/index'], resolve)
    },
    {
      path: '/agreement',
      name: 'agreement',
      meta: {title: '用户协议'},
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: resolve => require(['@/views/agreement/index'], resolve)
    },
    {
      path: '/government-services',
      name: 'government-services',
      meta: {title: '政务'},
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when ，the route is visited.
      component: resolve => require(['@/views/government-services/index'], resolve)
    },
    {
      path: '/government-services/detail',
      name: 'government-services-detail',
      meta: {title: '政务'},
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when ，the route is visited.
      component: resolve => require(['@/views/government-services/detail'], resolve)
    },
    {
      path: '/property-notice',
      name: 'property-notice',
      meta: {title: '物业通知'},
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when ，the route is visited.
      component: resolve => require(['@/views/property-notice'], resolve)
    },
    {
      path: '/property-notice-detail',
      name: 'property-notice-detail',
      meta: {title: '通知公告详情'},
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when ，the route is visited.
      component: resolve => require(['@/views/property-notice/detail'], resolve)
    },
    {
      path: '/service-record',
      name: 'service-record',
      meta: {title: '服务记录'},
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when ，the route is visited.
      component: resolve => require(['@/views/service-record/index'], resolve)
    },
    {
      path: '/service-record-detail',
      name: 'service-record-detail',
      meta: {title: '服务详情'},
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when ，the route is visited.
      component: resolve => require(['@/views/service-record/service-record-detail'], resolve)
    },
    {
      path: '/immediate-pay',
      name: 'immediate-pay',
      meta: { title: '支付' },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when ，the route is visited.
      component: resolve => require(['@/views/immediate-pay/index'], resolve)
    },
    {
      path: '/wallet',
      name: 'wallet',
      meta: { title: '钱包' },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when ，the route is visited.
      component: resolve => require(['@/views/wallet/index'], resolve)
    },
    {
      path: '/wallet/bankcard-verification',
      name: 'bankcard-verification',
      meta: { title: '验证银行卡信息' },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when ，the route is visited.
      component: resolve => require(['@/views/wallet/bankcard-verification'], resolve)
    },
    {
      path: '/wallet/verify-card-info',
      name: 'verify-card-info',
      meta: { title: '验证银行卡信息' },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when ，the route is visited.
      component: resolve => require(['@/views/wallet/verify-card-info.vue'], resolve)
    },
    {
      path: '/wallet/to-up',
      meta: { title: '' },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when ，the route is visited.
      component: resolve => require(['@/views/wallet/to-up.vue'], resolve)
    },
    {
      path: '/no-open',
      meta: { title: '功能尚未开放' },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when ，the route is visited.
      component: resolve => require(['@/views/no-open/index.vue'], resolve)
    },
    {
      path: '/visitor-access',
      meta: { title: '访客通行' },
      component: resolve => require(['@/views/visitor-access/index.vue'], resolve)
    },
    {
      path: '/qrcode',
      meta: { title: '访客通行-二维码' },
      component: resolve => require(['@/views/visitor-access/qrcode.vue'], resolve)
    },
    {
      path: '/wallet1',
      meta: { title: '我的物业' },
      component: resolve => require(['@/views/my-property/index.vue'], resolve)
    },
    {
      path: '/add-my-property',
      meta: { title: '添加房屋' },
      component: resolve => require(['@/views/my-property/add-my-property.vue'], resolve)
    },
    {
      path: '/entertainment',
      meta: { title: '娱乐' },
      component: resolve => require(['@/views/entertainment/index.vue'], resolve)
    },
    // native route
    {
      meta: {title: '政务'},
      path: '/native-route',
      name: 'native-route',
      redirect: nativeRoute
    }
  ]
})
router.beforeEach((to, from, next) => {
  // add title
  if (to.query.token) {
    auth.setToken(to.query.token)
  }
  if (to.meta || to.meta.title) {
    document.title = to.meta.title || ''
  } else {
    document.title = ''
  }
  if (auth.getToken() || to.meta.auth === false) { // determine if there has token
    next()
  } else {
    if (to.query.token) {
      auth.setToken(to.query.token)
      next()
    } else {
      next()
      // console.log('没有token'], resolve)
    }
  }
})
export default router
