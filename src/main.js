import Vue from 'vue';
import App from './App.vue';
import router from './router';

/* Style */
import '@/styles/reset.css';
import '@/styles/global.less';
import '@/styles/index.less';
import '@/common/rem'

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
