<template>
  <section class="media-list">
    <select class="media-list__select--type" v-model="selected" v-on:change="typeChange" name="type" id="type">
      <option v-for="option in options" v-bind:value="option.value" :key="option.value">{{ option.text }}</option>
    </select>
    <select class="media-list__select--year" v-on:change="typeChange" name="year" id="year">
      <option v-for="year in years" :key="year.value" v-bind:value="year.value">{{ year.text }}</option>
    </select>
    <article class="media-item" v-if="results.length > 1" v-for="(result, index) in results" :key="result.id">
      <router-link class="media-item__link" :to="{ name: 'movie', params: { item: result, id: index }}">
        <img class="media-item__poster" :src="result.poster_path ? posterUrl.url + result.poster_path : posterUrl.defaultUrl">
      </router-link>
      <section class="media-item__info">
        <p class="media-item__info media-item__info--title">
          <router-link class="media-item__info media-item__info--link" :to="{ name: 'movie', params: { item: result, id: index }}">
            {{ result.title ? result.title : result.name }}
          </router-link>
        </p>
        <p class="media-item__info media-item__info--date">{{ result.release_date ? result.release_date : result.first_air_date }}</p>
        <p class="media-item__info media-item__info--tagline">{{ result.tagline ? result.tagline : result.overview.slice(0, 30) + ' ...' }}</p>
        <p class="media-item__info media-item__info--details">
          <router-link class="media-item__info media-item__info--link" :to="{ name: 'movie', params: { item: result, id: index }}">
            Подробнее
          </router-link>
        </p>
      </section>
    </article>
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
