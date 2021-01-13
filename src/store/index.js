import { getCandidates, getVotersByCandidate, getCandidateRankByVotes } from '@/api';
import { getContracts } from '@/utils/contracts';

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    web3: null,
    account: '',
    chainId: '',
    blockNumber: 0,

    tonBalance: 0,
    votesByCandidate: 0,

    candidates: [],
    members: [],
    nonmembers: [],

    votersByCandidate: {},
    requestsByCandidate: [],

    candidateRankByVotes: [],
    myVotes: [],
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
    SET_BLOCK_NUMBER (state, blockNumber) {
      state.blockNumber = blockNumber;
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

    SET_VOTERS_BY_CANDIDATE (state, voters) {
      state.votersByCandidate = voters;
    },
    SET_TON_BALANCE (state, tonBalance) {
      state.tonBalance = tonBalance;
    },
    SET_VOTES_BY_CANDIDATE (state, votesByCandidate) {
      state.votesByCandidate = votesByCandidate;
    },

    SET_REQUESTS_BY_CANDIDATE (state, requestsByCandidate) {
      state.requestsByCandidate = requestsByCandidate;
    },
    SET_CANDIDATE_RANK_BY_VOTES (state, candidateRankByVotes) {
      state.candidateRankByVotes = candidateRankByVotes;
    },
    SET_MY_VOTES (state, myVotes) {
      state.myVotes = myVotes;
    },
  },
  actions: {
    async connectEthereum ({ commit, dispatch }, web3) {
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
      await dispatch('setBalance');
      await dispatch('setRequests');
      await dispatch('setMyVotes');
    },
    disconnectEthereum ({ commit }) {
      commit('SET_WEB3', null);
      commit('SET_ACCOUNT', '');
      commit('SET_CHAIN_ID', '');
    },
    async setBalance ({ state, commit }) {
      const ton = getContracts('TON', state.web3);
      const daoCommittee = getContracts('DAOCommittee', state.web3);

      const tonBalance = await ton.methods.balanceOf(state.account).call();
      commit('SET_TON_BALANCE', tonBalance);

      const votesByCandidate = {};
      state.candidates.forEach(async candidate => {
        votesByCandidate[candidate.layer2] = await daoCommittee.methods.totalSupplyOnCandidate(candidate.operator).call();
      });
      commit('SET_VOTES_BY_CANDIDATE', votesByCandidate);
    },
    async setRequests ({ state, commit }) {
      const requestsByCandidate = {};

      const depositManager = getContracts('DepositManager', state.web3);
      state.candidates.forEach(async candidate => {
        const numPendingRequests = await depositManager.methods.numPendingRequests(candidate.layer2, state.account).call();
        if (numPendingRequests === 0) {
          return [];
        }

        let requestIndex
            = await depositManager.methods.withdrawalRequestIndex(candidate.layer2, state.account).call();

        const pendingRequests = [];
        for (let i = 0; i < numPendingRequests; i++) {
          pendingRequests.push(depositManager.methods.withdrawalRequest(candidate.layer2, state.account, requestIndex).call());
          requestIndex++;
        }
        const requests = await Promise.all(pendingRequests);
        requestsByCandidate[candidate.layer2] = requests;
      });

      commit('SET_REQUESTS_BY_CANDIDATE', requestsByCandidate);
    },
    async setMyVotes ({ state, commit }) {
      // const daoCommittee = getContracts('DAOCommittee', state.web3);

      const myVotes = [];
      state.candidates.forEach(async candidate => {
        // const balance = await daoCommittee.methods.balanceOfOnCandidate(candidate.operator, state.account);
        // if (balance > 0) {
        //   myVotes.push({
        //     account: candidate.operator,
        //     balance: balance,
        //   });
        // }
        myVotes.push({
          account: candidate.operator,
          balance: 120,
        });
      });
      commit('SET_MY_VOTES', myVotes);
    },
    async launch ({ dispatch }) {
      await dispatch('setMembersAndNonmembers');
      await dispatch('setVotersByCandidate');
      await dispatch('setCandidateRankByVotes');
    },
    async setMembersAndNonmembers ({ state, commit }) {
      const daoCommittee = getContracts('DAOCommittee', state.web3);
      const daoCommitteeProxy = getContracts('DAOCommitteeProxy', state.web3);

      const [
        candidates, maxMember,
      ] = await Promise.all([
        await getCandidates(),
        await daoCommitteeProxy.methods.maxMember().call(),
      ]);

      const getMembers = [];
      for (let i = 0; i < maxMember; i++) {
        getMembers.push(daoCommitteeProxy.methods.members(i).call());
      }
      const addressMembers = (await Promise.all(getMembers)).map(member => member.toLowerCase());

      // candidates.forEach(async candidate => {
      //   console.log(candidate.operator);
      //   try {
      //     await daoCommittee.methods.totalSupplyOnCandidate(candidate.operator).call();
      //   } catch (err) {
      //     console.log(err.message);
      //   }
      // });
      const getVotes = [];
      candidates.forEach(candidate => getVotes.push(daoCommittee.methods.totalSupplyOnCandidate(candidate.operator).call()));
      const votes = await Promise.all(getVotes);

      const getInfos = [];
      candidates.forEach(candidate => getInfos.push(daoCommittee.methods.candidateInfos(candidate.operator).call()));
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
    async setVotersByCandidate ({ state, commit }) {
      const votersByCandidate = {};

      const candidates = state.candidates.map(candidate => candidate.layer2);
      candidates.forEach(async candidate => {
        votersByCandidate[candidate] = await getVotersByCandidate(candidate);
      });

      commit('SET_VOTERS_BY_CANDIDATE', votersByCandidate);
    },
    async setCandidateRankByVotes ({ commit }) {
      const candidateRankByVotes = await getCandidateRankByVotes();
      commit('SET_CANDIDATE_RANK_BY_VOTES', candidateRankByVotes);
    },
  },
  getters: {
    candidate: (state) => (address) => {
      const index = state.candidates.map(candidate => candidate.operator.toLowerCase()).indexOf(address.toLowerCase());
      return index !== -1 ? state.candidates[index] : null;
    },
    totalVotesByCandidate: (state) => (candidate) => {
      const voters = state.votersByCandidate[candidate];
      if (!voters) return 0;

      const initialAmount = 0;
      const reducer = (amount, voter) => amount + voter.balance;
      return voters.reduce(reducer, initialAmount);
    },
    notWithdrawableRequests: (state) => (candidate) => {
      const requests = state.requestsByCandidate[candidate];
      return requests.filter(request => parseInt(request.withdrawableBlockNumber) > state.blockNumber);
    },
    withdrawableRequests: (state) => (candidate) => {
      const requests = state.requestsByCandidate[candidate];
      return requests.filter(request => parseInt(request.withdrawableBlockNumber) <= state.blockNumber);
    },
  },
});
