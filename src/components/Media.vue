<template>
  <section class="media">
    <router-link class="media__link" :to="{ name: 'media-list'}">НАЗАД</router-link>
    <article class="media-card">
      <div class="media-card__box">
        <img class="media-card__poster" :src="result.poster_path ? posterUrl.url + result.poster_path : posterUrl.defaultUrl">
        <section class="media__card-info">
          <p class="media-card__text media-card__text--title">Название фильма</p>
          <p class="media-card__text">{{ result.title ? result.title : result.name }}</p>
          <p class="media-card__text media-card__text--title">Полное описание</p>
          <p class="media-card__text">{{ result.overview }}</p>
          <p class="media-card__text media-card__text--title">В ролях</p>
          <p class="media-card__text">{{ result.cast.length > 0 ? result.cast.join(', ') : noInfo }}</p>
          <p class="media-card__text media-card__text--title">Создатели</p>
          <p class="media-card__text">{{ result.crew.length > 0 ? result.crew.join(', ') : noInfo }}</p>
        </section>
        <ul class="slider_case">
          <v-slider v-if="images.length > 0" v-bind="options">
            <li class="item" v-for="image in images" :key="image">
              <img :src="posterUrl.url + image" alt="">
            </li>
          </v-slider>
        </ul>
      </div>
    </article>
  </section>
</template>

<script>
  import slider from './slider.vue';

  export default {
    name: 'main-slider',
    data() {
      const options = {
        items: 5,
        margin: 20,
        nav: true,
        dots: true,
        loop: true,
        timing: 'cubic-bezier(0, 0.72, 0.64, 1.06)',
        offset: 1,
        prevNav: '',
        nextNav: '',
        sibling: true,
        responsive: {
          0: {
            items: 1
          },
          768: {
            items: 3
          },
          999: {
            items: 5
          }
        }
      }
      return options;
    },
    components: {
      'v-slider': slider,
    },
    computed: {
      noInfo() {
        const noInfo = 'Нет информации';
        return noInfo;
      },
      posterUrl() {
        const posterUrl = {
          url: 'https://image.tmdb.org/t/p/w500/',
          defaultUrl: 'img/default.svg'
        };
        return posterUrl;
      },
      options() {
        const options = {
          items: 5,
          margin: 20,
          nav: true,
          dots: true,
          loop: true,
          timing: 'cubic-bezier(0, 0.72, 0.64, 1.06)',
          offset: 1,
          prevNav: 'Туда',
          nextNav: 'Сюда',
          sibling: true,
          responsive: {
            0: {
              items: 1
            },
            768: {
              items: 3
            },
            999: {
              items: 5
            }
          }
        }
        return options;
      }
    },
    created: function () {
      this.result = this.$route.params.item;
      this.images = this.$route.params.item.backdrops;
    }
  }

</script>
