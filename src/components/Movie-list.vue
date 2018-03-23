<template>
  <div class="Movie-list">
    <select v-model="selected" v-on:change="typeChange" name="type" id="type">
      <option v-for="option in options" v-bind:value="option.value" :key="option.value">{{ option.text }}</option>
    </select>
    <select v-on:change="typeChange" name="year" id="year">
      <option v-for="year in years" :key="year.value" v-bind:value="year.value">{{ year.text }}</option>
    </select>
    <div class="Movie__item" v-if="results.length > 1" v-for="(result, index) in results" :key="result.id">
      <router-link class="Movie__link" :to="{ name: 'movie', params: { item: result, id: index }}">
        <div class="Movie__section Movie__section--poster">
          <img class="Movie__section--poster-image" :src="posterUrl + result.poster_path">
        </div>
        <div class="Movie__section Movie__section--info">
          <ul>
            <li>{{ result.title ? result.title : result.name }}</li>
            <li>{{ result.release_date ? result.release_date : result.first_air_date }}</li>
            <li>{{ result.tagline }}</li>
          </ul>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      const videoOptions = {
          selected: 'movie',
          options: [
            { text: 'Фильмы', value: 'movie' },
            { text: 'Сериалы', value: 'tv' }]
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
        const url = 'https://image.tmdb.org/t/p/w500/';
        return url;
      }
    }
  }
</script>

<style src="../assets/movie-list.scss"></style>
