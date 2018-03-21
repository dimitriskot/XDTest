<template>
  <div class="Movie-list">
    <div class="Movie__item" v-for="(result, index) in results" :key="result.id">
      <router-link class="Movie__link" :to="{ name: 'movie', params: { item: result, id: index }}">
        <div class="Movie__section Movie__section--poster">
          <img class="Movie__section--poster-image" :src="url + result.poster_path">
        </div>
        <div class="Movie__section Movie__section--info">
          <ul>
            <li>{{ result.title }}</li>
            <li>{{ result.release_date }}</li>
            <li></li>
          </ul>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  /*
          import results from '../ads.js';
          export default {
            computed: {
              results() {
                console.log(results);
                return results
              }
            }
          }
          <img :src="$url('https://image.tmdb.org/t/p/w500/' + result.poster_path)">
          */
  export default {
    data() {
      const posterUrl = {url: 'https://image.tmdb.org/t/p/w500/'};
      return posterUrl;
    },
    computed: {
      results() {
        const collection = this.$store.state.results;
        return collection;
      }
    }
  }

</script>

<style lang="scss">
  .Movie__link {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 600px;
    height: 200px;
    margin-bottom: 5px;
    background-color: brown;
  }

  .Movie__section {
    height: 190px;
    background-color: transparent;
  }

  .Movie__section--poster {
    position: relative;
    width: 150px;
    margin-right: 15px;
  }

  .Movie__section--poster-image {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    max-height: 100%;
    max-width: 100%;
    display: block;
    margin: auto;
  }

  .Movie__section--info {
    width: 330px;
    background-color: #fff;
  }

</style>
