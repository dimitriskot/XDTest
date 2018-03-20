<template>
  <div id="app">
    <header>

    </header>
    <main>
      <movie></movie>
    </main>
  </div>
</template>

<script>
import Movie from './components/Movie.vue';

export default {
  name: 'app',
  components: {
    Movie
  }
}
</script>
