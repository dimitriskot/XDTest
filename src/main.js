import Vue from 'vue';
import App from './App.vue';
// import VueResource from 'vue-resource';
// import VueRouter from 'vue-router';
// import store from './store/index.js';
// import MovieList from './components/Movie-list.vue';
// import Movie from './components/Movie.vue';

// Vue.use(VueResource);
// Vue.use(VueRouter);

// const router = new VueRouter({
//   routes: [{
//     path: '/',
//     name: 'movie-list',
//     component: MovieList
//   },
//   {
//     path: '/movie/:id',
//     name: 'movie',
//     component: Movie
//   }]
// });

new Vue({
  el: '#app',
  render: h => h(App)
})
