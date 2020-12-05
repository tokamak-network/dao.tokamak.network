import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    web3: {},
  },
  mutations: {
    SET_WEB3 (state, web3) {
      state.web3 = web3;
    },
  },
  actions: {
    setWeb3 ({ commit }, web3) {
      commit('SET_WEB3', web3);
    },
  },
  modules: {
  },
});
