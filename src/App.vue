<template>
  <div id="app">
    <header>
      <div class="wrapper">
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
          <p class="header__text">ТОП-10 самых низкорейтинговых фильмов и сериалов</p>
        </section>
      </div>
    </header>
    <main>
      <div class="wrapper">
        <router-view></router-view>
      </div>
    </main>
    <footer>
      <section class="footer">
        <div class="wrapper">
          <p class="footer__text">This product uses the TMDb API but is not endorsed or certified by TMDb.</p>
          <p class="footer__text">
            <a class="footer__link" href="https://codepen.io/atnyman/pen/cgGuL" target="_blank">Animated fire text-shadow</a> used from Antti Nyman's pen</p>
        </div>
      </section>
    </footer>
  </div>
</template>

<script>
  import Vue from 'vue';
  import VueRouter from 'vue-router';
  import VueResource from 'vue-resource';
  import MediaList from './components/Media-list.vue';
  import Media from './components/Media.vue';
  import store from './store/index.js';

  Vue.use(VueRouter);
  Vue.use(VueResource);

  const router = new VueRouter({
    routes: [{
        path: '/',
        name: 'media-list',
        component: MediaList
      },
      {
        path: '/media/:id',
        name: 'media',
        component: Media
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
    },
    router,
    store
  }

</script>
