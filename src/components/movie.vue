<template>
  <div class="Movie">
    <router-link :to="{ name: 'movie-list'}">НАЗАД</router-link>
    <div class="Movie__item">
      <div class="Movie__section Movie__section--poster">
        <img class="Movie__section--poster-image" :src="url + result.poster_path">
      </div>
      <div class="Movie__section Movie__section--info">
        <ul>
          <li>{{ result.title ? result.title : result.name }}</li>
          <li>{{ result.overview }}</li>
          <li>{{ result.cast.join(', ') }}</li>
          <li>{{ result.crew.join(', ') }}</li>
          <li v-for="image in images" :key="image">
            <img :src="url + image" alt="">
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  /*
    import results from '../ads.js';
    export default {
      data: function() {
        return {
          results: results,
          result: null
        }
      },
      created: function() {
        var resultId = this.$route.params.id
        this.result = this.results[resultId]
      }
    }
    */

  export default {
    data() {
      const posterUrl = {url: 'https://image.tmdb.org/t/p/w500/'};
      return posterUrl;
    },
    created: function () {
      this.result = this.$route.params.item;
      this.images = this.$route.params.item.backdrops;
    }
    /*
    created: function () {
      const collection = this.$route.params.collection;
      console.log(collection);
      const movieId = this.$route.params.id;
      this.result = collection[movieId];
    }
  }
  */
  }

</script>

<style lang="scss">
  .Movie__item {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 600px;
    min-height: 200px;
    background-color: brown;
  }

  .Movie__section {
    height: 190px;
    background-color: transparent;
  }

  .Movie__section--number {
    width: 100px;
  }

  .Movie__section--preview {
    width: 150px;
  }

  .Movie__section--info {
    width: 330px;
    background-color: #fff;
  }

</style>
