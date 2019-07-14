import Vue from 'vue';
import Router from 'vue-router';
import { nativeRoute } from './native-route';
import * as auth from '@/common/auth';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { title: 'home' },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/home')
    },
    {
      path: '/article-details',
      name: 'article-details',
      meta: { title: '文章详情' },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/article-details/index')
    },
    {
      path: '/list-template/:id',
      name: 'list-template',
      meta: { title: '列表模版' },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/list-template/index')
    },
    {
      path: '/convenient-people-life',
      name: 'convenient-people-life',
      meta: { title: '便民服务' },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/convenient-people-life/index')
    },
    {
      path: '/domestic-services',
      name: 'domestic-services',
      meta: { title: '家政服务' },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/domestic-services/index')
    },
    {
      path: '/on-site-repair',
      name: 'on-site-repair',
      meta: { title: '上门维修' },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/on-site-repair/index')
    },
    {
      path: '/domestic-services-detail',
      name: 'domestic-services-detail',
      meta: { title: '服务详情' },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/domestic-services/detail')
    },
    {
      path: '/eat-in-jx',
      name: 'eat-in-jx',
      meta: { title: '吃在莒县' },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/eat-in-jx/index')
    },
    {
      path: '/happy-in-jx',
      name: 'happy-in-jx',
      meta: { title: '乐在莒县' },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/happy-in-jx/index')
    },
    {
      path: '/investment-in-jx',
      name: 'investment-in-jx',
      meta: { title: '投在莒县' },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/investment-in-jx/index')
    },
    {
      path: '/jx-news',
      name: 'jx-news',
      meat: { title: '莒县新闻' },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/jx-news/index')
    },
    {
      path: '/medical-services',
      name: 'medical-services',
      meta: { title: '医疗服务' },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/medical-services/index')
    },
    {
      path: '/medical-services-detail',
      name: 'medical-services-detail',
      meta: { title: '医疗服务' },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/medical-services/detaile')
    },
    {
      path: '/shopping-in-jx',
      name: 'shopping-in-jx',
      meta: { title: '购在莒县' },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/shopping-in-jx/index')
    },
    {
      path: '/specials',
      name: 'specials',
      meta: { title: '特色专题' },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/specials/index')
    },
    {
      path: '/swim-in-jx',
      name: 'swim-in-jx',
      meta: { title: '游在莒县' },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/swim-in-jx/index')
    },
    {
      path: '/walk-into-jx',
      name: 'walk-into-jx',
      meta: { title: '走进莒县' },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/walk-into-jx/index')
    },
    {
      path: '/store',
      name: 'index.vue',
      meta: { title: '商城' },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/store/index')
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      meta: { title: '用户登录' },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when ，the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/sign-in/index')
    },
    {
      path: '/agreement',
      name: 'agreement',
      meta: { title: '用户协议' },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/agreement/index')
    },
    {
      path: '/government-services',
      name: 'government-services',
      meta: { title: '政务' },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when ，the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/government-services/index')
    },
    {
      path: '/government-services/detail',
      name: 'government-services-detail',
      meta: { title: '政务' },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when ，the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/government-services/detail')
    },
    {
      path: '/property-notice',
      name: 'property-notice',
      meta: { title: '物业通知' },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when ，the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/property-notice')
    },
    // native route
    {
      meta: { title: '政务' },
      path: '/native-route',
      name: 'native-route',
      redirect: nativeRoute
    }
  ]
});
router.beforeEach((to, from, next) => {
  // add title
  if (to.meta || to.meta.title) {
    document.title = to.meta.title || '莒县通';
  } else {
    document.title = '莒县通';
  }
  if (auth.getToken() || to.meta.auth === false) { // determine if there has token
    next();
  } else {
    if (to.query.token) {
      auth.setToken(to.query.token);
      next();
    } else {
      next();
      console.log('没有token');
    }
  }
});
export default router;
