import Vue from 'vue';
import Vuex from 'vuex';
import jsonp from 'jsonp';

Vue.use(Vuex);

function formatDate(date) {
  let dd = date.getDate();
  if (dd < 10) dd = '0' + dd;
  let mm = date.getMonth();
  if (mm < 10) mm = '0' + mm;
  let yyyy = date.getFullYear();
  return yyyy + '-' + mm + '-' + dd;
};
let tempDate = new Date();
let currentDate = formatDate(tempDate);

const store = new Vuex.Store({
  state: {
    results: [],
    credits: []
  },
  mutations: {
    setData(state, data) {
      let collection = Array.from(data.results);
      return state.results = collection.slice(0, 10);
    },
    setCredits(state, data) {
      state.credits = data;
      state.results.push(data);
    }
  },
  actions: {
    getData({
      commit,
      state
    }) {
      Vue.http.get('https://api.themoviedb.org/3/discover/movie?api_key=c361b616f937589e892b21f0789aa099&language=ru&sort_by=vote_average.asc&include_adult=false&include_video=false&page=1&primary_release_date.lte=' + currentDate).then(function (response) {
        commit('setData', response.data);
        state.results.forEach(function (element) {
          let id = element.id;
          Vue.http.get('https://api.themoviedb.org/3/movie/' + id + '/credits?api_key=c361b616f937589e892b21f0789aa099').then(function (response) {
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
          Vue.http.get('https://api.themoviedb.org/3/movie/' + id + '/images?api_key=c361b616f937589e892b21f0789aa099').then(function (response) {
            element.backdrops = response.data.backdrops
          }, function (error) {
            throw error
          });
        })
        console.log(state.results);
        // commit('setCredits', creditCollection);
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
