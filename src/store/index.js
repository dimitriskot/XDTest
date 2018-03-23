import Vue from 'vue';
import Vuex from 'vuex';
import jsonp from 'jsonp';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    data: [],
    results: []
  },
  mutations: {
    setData(state, data) {
      let collection = Array.from(data.results);
      return state.data = collection
      .filter((element) => {
        return element !== null;
      })
      .slice(0, 10)
      .map((element, i, a) => {
        let newElement = {};
        newElement.id = element.id;
        return element.id = newElement;
      });
    },
    setResults(state, data) {
      setTimeout(() => {
        state.results = data;
      }, 2000);
    }
  },
  actions: {
    getData({
      commit,
      state
    }, obj) {
      console.log('https://api.themoviedb.org/3/discover/' + obj.type + '?api_key=c361b616f937589e892b21f0789aa099&language=en-US&sort_by=vote_average.asc&include_adult=false&include_video=false&page=1&' + obj.period);
      Vue.http.get('https://api.themoviedb.org/3/discover/' + obj.type + '?api_key=c361b616f937589e892b21f0789aa099&language=en-US&sort_by=vote_average.asc&include_adult=false&include_video=false&page=1&' + obj.period).then(function (response) {
        commit('setData', response.data);
        state.data.forEach(function (element) {
          let id = element.id;
          Vue.http.get('https://api.themoviedb.org/3/' + obj.type + '/' + id + '?api_key=c361b616f937589e892b21f0789aa099').then(function (response) {
            element.first_air_date = response.data.first_air_date;
            element.name = response.data.name;
            element.overview = response.data.overview;
            element.poster_path = response.data.poster_path;
            element.release_date = response.data.release_date;
            element.tagline = response.data.tagline;
            element.title = response.data.title;
            element.vote_average = response.data.vote_average;
          }, function (error) {
            throw error
          });
          Vue.http.get('https://api.themoviedb.org/3/' + obj.type + '/' + id + '/credits?api_key=c361b616f937589e892b21f0789aa099').then(function (response) {
            element.cast = response.data.cast
            .map((element) => {
              return element.order < 6 ? element.name : null;
            })
            .filter((element) => {
              return element !== null;
            });
            element.crew = response.data.crew.map((element) => {
              return element.job === 'Director' || element.job === 'Writer' || element.job === 'Producer' ? element.name : null;
            })
            .filter((element) => {
              return element !== null;
            });
          }, function (error) {
            throw error
          });
          Vue.http.get('https://api.themoviedb.org/3/' + obj.type + '/' + id + '/images?api_key=c361b616f937589e892b21f0789aa099').then(function (response) {
            element.backdrops = response.data.backdrops.map((element) => {
              return element.file_path;
            });
          }, function (error) {
            throw error
          });
        })
        console.log(state.data);
        commit('setResults', state.data);
      }, function (error) {
        throw error
      });
      /*
      Vue.http.get('https://js.dump.academy/keksobooking/data').then(function(response) {
        commit('setData', response.data);
      }, function(error) {
        throw error
      });
      
      Vue.http.get('https://api.themoviedb.org/3/discover/movie?api_key=c361b616f937589e892b21f0789aa099&language=en-US&sort_by=vote_average.asc&include_adult=false&include_video=false&page=1&primary_release_date.lte=' + currentDate).then(function (response) {
        commit('setData', response.data);
      }, function (error) {
        throw error
      });
      */
    }
  }
});

export default store
