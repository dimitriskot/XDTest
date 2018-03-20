import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource';
import store from './store/index.js';

Vue.use(VueResource);

new Vue({
  el: '#app',
  data: {
    endpoint: 'https://js.dump.academy/keksobooking/data',
    cards: []
  },
  created: function() {
    this.$store.dispatch('getData');
  },
  render: h => h(App),
  store
})
