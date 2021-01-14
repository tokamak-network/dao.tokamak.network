import { getCandidates, getAgendas, getAgendaVoteCasted } from '@/api';
import { getContracts } from '@/utils/contracts';

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    web3: null,
    account: '',
    chainId: '',

    candidates: [],
    members: [],
    nonmembers: [],

    agendas: [],
    voteCasted: [],
    voteRate: 0,
    myVote: [],
  },
  mutations: {
    SET_WEB3 (state, web3) {
      state.web3 = web3;
    },
    SET_ACCOUNT (state, account) {
      state.account = account;
    },
    SET_CHAIN_ID (state, chainId) {
      state.chainId = chainId;
    },

    SET_CANDIDATES (state, candidates) {
      state.candidates = candidates;
    },
    SET_MEMBERS (state, members) {
      state.members = members;
    },
    SET_NONMEMBERS (state, nonmembers) {
      state.nonmembers = nonmembers;
    },
    SET_AGENDAS (state, agendas) {
      state.agendas = agendas;
    },
    SET_AGENDA_VOTE_CASTED (state, voteCasted) {
      state.voteCasted = voteCasted;
    },
    SET_VOTE_RATE (state, voteRate) {
      state.voteRate = voteRate;
    },
    SET_MY_VOTE (state, myVote) {
      state.myVote = myVote;
    },
  },
  actions: {
    async connectEthereum ({ commit }, web3) {
      commit('SET_WEB3', web3);

      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) {
        commit('SET_ACCOUNT', '');
      } else {
        const account = accounts[0];
        commit('SET_ACCOUNT', account);
      }

      const chainId = await web3.eth.getChainId();
      commit('SET_CHAIN_ID', chainId);

      const blockNumber = await web3.eth.getBlockNumber();
      commit('SET_BLOCK_NUMBER', blockNumber);

      // TODO: await?
      // await dispatch('setBalance');
      // await dispatch('setRequests');
      // await dispatch('setMyVotes');
    },
    disconnectEthereum ({ commit }) {
      commit('SET_WEB3', null);
      commit('SET_ACCOUNT', '');
      commit('SET_CHAIN_ID', '');
    },
    async setMembersAndNonmembers ({ commit }) {
      const daoCommittee = getContracts('DAOCommittee', this.web3);
      const daoCommitteeProxy = getContracts('DAOCommitteeProxy', this.web3);

      const [
        candidates,
        maxMember,
      ] = await Promise.all([
        await getCandidates(),
        await daoCommitteeProxy.methods.maxMember().call(),
      ]);
      const getMembers = [];
      for (let i = 0; i < maxMember; i++) {
        getMembers.push(daoCommitteeProxy.methods.members(i).call());
      }
      const addressMembers = (await Promise.all(getMembers)).map(member => member.toLowerCase());

      const getVotes = [];
      candidates.forEach(async candidate => getVotes.push(daoCommittee.methods.totalSupplyOnCandidate(candidate.operator).call()));
      const votes = await Promise.all(getVotes);

      const getInfos = [];
      candidates.forEach(async candidate => getInfos.push(daoCommittee.methods.candidateInfos(candidate.operator).call()));
      const infos = await Promise.all(getInfos);

      for (let i = 0; i < candidates.length; i++) {
        candidates[i].vote = votes[i]; // eslint-disable-line
        candidates[i].info = infos[i]; // eslint-disable-line
      }
      commit('SET_CANDIDATES', candidates);

      const members = [];
      const nonmembers = [];
      candidates.forEach(
        candidate => (addressMembers.includes(candidate.operator.toLowerCase()) ? members : nonmembers).push(candidate),
      );
      commit('SET_MEMBERS', members);
      commit('SET_NONMEMBERS', nonmembers);
    },
    async setAgendas (context) {
      const account = context.state.account;
      const [
        agendas,
        events,
      ] = await Promise.all([
        await getAgendas(),
        await getAgendaVoteCasted(),
      ]);

      const voteCasted = [];
      events.forEach(event => (event.eventName === 'AgendaVoteCasted' ? voteCasted.push(event) : 0)); // check
      context.commit('SET_AGENDA_VOTE_CASTED', voteCasted);

      const myVote = [];
      voteCasted.forEach(vote => (vote.from === account.toLowerCase() ? myVote.push(vote.data) : '')); // check

      for (const cast of myVote) {
        console.log(cast);
      }

      const voteRate = (myVote.length / agendas.length) * 100;
      context.commit('SET_MY_VOTE', myVote);
      context.commit('SET_VOTE_RATE', voteRate);

      context.commit('SET_AGENDAS', agendas);
    },
  },
});
