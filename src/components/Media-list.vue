<template>
  <section class="media-list">
    <section class="select">
      <div class="select__box">
        <p class="select__text">Что прогорело:</p>
        <select class="select__filter" v-model="selected" v-on:change="typeChange" name="type" id="type">
          <option v-for="option in options" v-bind:value="option.value" :key="option.value">{{ option.text }}</option>
        </select>
      </div>
      <div class="select__box">
        <p class="select__text">В каком году:</p>
        <select class="select__filter" v-on:change="typeChange" name="year" id="year">
          <option v-for="year in years" :key="year.value" v-bind:value="year.value">{{ year.text }}</option>
        </select>
      </div>
    </section>
    <div class="media-list__box">
      <article class="media-item" v-if="results.length > 1" v-for="(result, index) in results" :key="result.id">
        <div class="media-item__box">
          <div class="media-item__rank">{{ result.rank }}</div>
          <router-link class="media-item__poster-link" :to="{ name: 'media', params: { item: result, id: index }}">
            <img class="media-item__poster" :src="result.poster_path ? posterUrl.url + result.poster_path : posterUrl.defaultUrl">
          </router-link>
          <section class="media-item__info">
            <p class="media-item__text media-item__text--title">Название фильма</p>
            <p class="media-item__text">{{ result.title ? result.title : result.name }}</p>
            <p class="media-item__text media-item__text--title">Дата выхода</p>
            <p class="media-item__text">{{ result.release_date ? result.release_date : result.first_air_date }}</p>
            <p class="media-item__text media-item__text--title">Краткое описание</p>
            <p class="media-item__text">{{ result.tagline ? result.tagline : result.overview ? result.overview.slice(0, 30) + ' ...' : 'No overview'
              }}</p>
            <router-link class="media-item__link" :to="{ name: 'media', params: { item: result, id: index }}">
              Подробнее
            </router-link>
          </section>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      const videoOptions = {
        selected: 'movie',
        options: [{
            text: 'Фильмы',
            value: 'movie'
          },
          {
            text: 'Сериалы',
            value: 'tv'
          }
        ]
      };
      return videoOptions;
    },
    methods: {
      typeChange() {
        let videoType = document.querySelector('#type');
        let yearFilter = document.querySelector('#year');
        let query = '';
        if (videoType.value === 'movie') query = 'year=';
        if (videoType.value === 'tv') query = 'first_air_date_year=';
        let year = query + yearFilter.value;
        this.$store.dispatch('getData', {
          type: videoType.value,
          period: year
        });
      }
    },
    computed: {
      results() {
        console.log(this.$store.state.results);
        const collection = this.$store.state.results;
        return collection.filter((element) => {
          return element !== null;
        });
      },
      years() {
        let yearCollection = [];
        for (let i = 1901; i < 2018; i++) {
          let year = {
            value: i,
            text: i
          };
          yearCollection.unshift(year);
        }
        return yearCollection;
      },
      posterUrl() {
        const posterUrl = {
          url: 'https://image.tmdb.org/t/p/w500/',
          defaultUrl: 'img/default.svg'
        };
        return posterUrl;
      }
    }
  }

</script>
