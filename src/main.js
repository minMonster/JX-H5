import Vue from 'vue';
import App from './App.vue';
import router from './router';
import api from '@/api';
import { ToastPlugin } from 'vux';

/* Style */
import '@/styles/reset.css';
import '@/styles/index.less';
import '@/styles/global.less';
import '@/common/rem';
import 'swiper/dist/css/swiper.css';

Vue.config.productionTip = false;
Object.defineProperty(Vue.prototype, '$api', {value: api});
Vue.use(ToastPlugin);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
