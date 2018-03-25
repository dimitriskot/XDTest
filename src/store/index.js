import Vue from 'vue';
import Vuex from 'vuex';
import jsonp from 'jsonp';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    data: [],
    results: []
  },
  actions: {
    // запрашиваем данные с сервера,
    // передаём параметром объект "obj", 
    // содержащий строки: тип медиа (фильм/сериал) 
    // и период, для составления URL запроса на сервер
    getData({
      commit,
      state
    }, obj) {
      // запрашиваем данные с сортировкой по убыванию рейтинга themoviedb
      Vue.http.get('https://api.themoviedb.org/3/discover/' + obj.type + '?api_key=c361b616f937589e892b21f0789aa099&language=en-US&sort_by=vote_average.asc&include_adult=false&include_video=false&page=1&' + obj.period).then(function (response) {
        // коммитим полученные данные
        commit('setData', response.data);
        // для каждого объекта (фильма) хранилища
        // делаем запросы на сервер для получения
        // необходимой информации
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
        // коммитим полученные данные
        commit('setResults', state.data);
      }, function (error) {
        throw error
      });
    }
  },
  mutations: {
    // обрабатываем список низкорейтинговых фильмов
    setData(state, data) {
      let collection = Array.from(data.results);
      return state.data = collection
      // фильтруем фильмы по их наличию
      // (в получаемых данных могут содержаться пустые объекты)
      .filter((element) => {
        return element !== null;
      })
      // оставляем первые 10 объектов
      .slice(0, 10)
      // оставляем в хранилище только ID фильмов,
      // поскольку в данном запросе недостаточно информации
      // будем делать новые запросы на сервер по ID
      .map((element) => {
        let newElement = {};
        newElement.id = element.id;
        return element.id = newElement;
      })
      // добавляем объектам свойство "rank",
      // для отображения занимаемого фильмом
      // места в приложении
      .map(function (el, index) {
        el.rank = index + 1;
        return el;
      });
    },
    // выводим окончательные данные
    // в хранилища для использования приложением.
    // устанавливается таймаут
    // для ожидания загрузки данных
    setResults(state, data) {
      setTimeout(() => {
        state.results = data;
      }, 2000);
    }
  },
});

export default store
