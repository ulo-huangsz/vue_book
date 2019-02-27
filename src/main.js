// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueLazyload from 'vue-lazyload'
import 'swiper/dist/css/swiper.css'
Vue.config.productionTip = false;
Vue.use(VueAwesomeSwiper, /* { default global options } */);
/* eslint-disable no-new */
Vue.use(VueLazyload);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2385237309,131922640&fm=27&gp=0.jpg',
  loading: './pic/loading.gif',
  attempt: 1
});
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
