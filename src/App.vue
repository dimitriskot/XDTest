<template>
  <div id="app">
    <header>
    </header>
    <main>
      <router-view></router-view>
      <movie-list></movie-list>
    </main>
  </div>
</template>

<script>
  import MovieList from './components/Movie-list.vue';
  
  export default {
    name: 'app',
    components: {
      MovieList
    }
  }

</script>
