import Vue from 'vue';
import Router from 'vue-router';
import { nativeRoute } from './native-route';
import * as auth from '@/common/auth';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/convenient-people-life',
      name: 'convenient-people-life',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/convenient-people-life/index')
    },
    {
      path: '/eat-in-jx',
      name: 'eat-in-jx',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/eat-in-jx/index')
    },
    {
      path: '/happy-in-jx',
      name: 'happy-in-jx',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/happy-in-jx/index')
    },
    {
      path: '/investment-in-jx',
      name: 'investment-in-jx',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/investment-in-jx/index')
    },
    {
      path: '/jx-news',
      name: 'jx-news',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/jx-news/index')
    },
    {
      path: '/medical-services',
      name: 'medical-services',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/medical-services/index')
    },
    {
      path: '/shopping-in-jx',
      name: 'shopping-in-jx',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/shopping-in-jx/index')
    },
    {
      path: '/specials',
      name: 'specials',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/specials/index')
    },
    {
      path: '/swim-in-jx',
      name: 'swim-in-jx',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/swim-in-jx/index')
    },
    {
      path: '/walk-into-jx',
      name: 'walk-into-jx',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/walk-into-jx/index')
    },
    // native route
    {
      path: '/native-route',
      name: 'native-route',
      redirect: nativeRoute
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (auth.getToken() || to.meta.auth === false) { // determine if there has token
    next();
  } else {
    if (to.query.token) {
      auth.setToken(to.query.token);
      next();
    } else {
      console.log('没有token');
    }
  }
});
export default router;
