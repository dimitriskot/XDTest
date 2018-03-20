<template>
  <div class="Movie">
    <div class="Movie__item" v-for="result in results" :key="result.id">
      <div class="Movie__section Movie__section--number"><img :src="$url(result.author.avatar)"></div>
      <div class="Movie__section Movie__section--preview">{{ result.location }}</div>
      <div class="Movie__section Movie__section--info">{{ result.offer }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      results() {
        console.log(this.$store.state.results);
        const collection = this.$store.state.results;
        collection.map(function (ad, index) {
          ad.id = index;
          return ad;
        });
        console.log(collection);
        return collection;
      }
    }
  }

</script>

<style lang="scss">
  .Movie__item {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 600px;
    height: 200px;
    background-color: brown;
  }

  .Movie__section {
    height: 190px;
    background-color: white;
  }

  .Movie__section--number {
    width: 100px;
  }

  .Movie__section--preview {
    width: 150px;
  }

  .Movie__section--info {
    width: 330px;
  }

</style>
