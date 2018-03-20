import Vue from 'vue';
import Vuex from 'vuex';
import jsonp from 'jsonp';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    results: []
  },
  mutations: {
    setData(state, results) {
      state.results = results;
    }
  },
  actions: {
    getData({ commit }) {
      Vue.http.get('https://js.dump.academy/keksobooking/data').then(function(response) {
        commit('setData', response.data);
      }, function(error) {
        throw error
      });
    }
  }
});

export default store