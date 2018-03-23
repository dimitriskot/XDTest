<template>
  <div id="app">
    <header>
      <div>
        <h1 class="title">Киновтопку</h1>
        <img class="title__logo" src="./assets/popcorn.svg" alt="">
      </div>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  import Vue from 'vue';
  import VueRouter from 'vue-router';
  import VueResource from 'vue-resource';
  import MovieList from './components/Movie-list.vue';
  import Movie from './components/Movie.vue';
  import store from './store/index.js';

  Vue.use(VueRouter);
  Vue.use(VueResource);

  const router = new VueRouter({
    routes: [{
        path: '',
        name: 'movie-list',
        component: MovieList
      },
      {
        path: '/movie/:id',
        name: 'movie',
        component: Movie
      }
    ]
  });

  export default {
    name: 'app',
    created() {
      this.$store.dispatch('getData', {
        type: 'movie',
        period: 'year=2017'
      });
      // this.$store.dispatch('getCredits');
    },
    router,
    store
  }

</script>

<style src="./assets/app.scss"></style>
