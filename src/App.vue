<template>
  <div id="app">
    <header>
      <section class="header">
        <img class="header__logo" src="img/popcorn.svg" alt="">
        <h1 class="header__title">
          <span class="header__fire">К</span>
          <span class="header__burn">и</span>
          <span class="header__fire">н</span>
          <span class="header__burn">о</span>
          <span class="header__fire">в</span>
          <span class="header__burn">т</span>
          <span class="header__fire">о</span>
          <span class="header__burn">п</span>
          <span class="header__fire">к</span>
          <span class="header__burn">у</span>
        </h1>
        <!--<img src="img/title.gif" alt="">-->
        <p class="header__text">ТОП-10 самых низкорейтинговых фильмов  и сериалов</p>
      </section>
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

<!--<style src="./assets/app.scss"></style>-->
