import Web3 from 'web3';
import web3Utils from 'web3-utils';

import {
  getCandidates,
  getAgendas,
  getAgendaVoteCasted,
  getCandidateRankByVotes,
  getAgendaContents,
  getVotersByCandidate,
} from '@/api';
import {
  getContract,
  parseAgendaBytecode,
} from '@/utils/contracts';
import { createCurrency } from '@makerdao/currency';

import Vue from 'vue';
import Vuex from 'vuex';

const _TON = createCurrency('TON');

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    launched: false,

    web3: null,
    account: '',
    chainId: '',
    blockNumber: 0,

    tonBalance: 0,
    contractState: {},

    candidates: [],
    members: [],
    nonmembers: [],
    voters: [],
    myVotes: 0,

    agendas: [],
    voteCasted: [],
    voteRate: 0,
    myVote: [],
    activityReward: [],
    votedCandidatesFromAccount: [],

    requestsByCandidate: [],
    candidateRankByVotes: [],

    pendingTx: '',
    confirmBlock: 3,
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
    SET_ACTIVITY_REWARD (state, activityReward) {
      state.activityReward = activityReward;
    },
    SET_TON_BALANCE (state, tonBalance) {
      state.tonBalance = tonBalance;
    },
    SET_CONTRACT_STATE (state, contractState) {
      state.contractState = contractState;
    },
    SET_VOTERS (state, voters) {
      state.voters = voters;
    },
    SET_MY_VOTES (state, myVotes) {
      state.myVotes = myVotes;
    },
    SET_VOTED_CANDIDATES_FROM_ACCOUNT (state, votedCandidatesFromAccount) {
      state.votedCandidatesFromAccount = votedCandidatesFromAccount;
    },

    SET_REQUESTS_BY_CANDIDATE (state, requestsByCandidate) {
      state.requestsByCandidate = requestsByCandidate;
    },
    SET_CANDIDATE_RANK_BY_VOTES (state, candidateRankByVotes) {
      state.candidateRankByVotes = candidateRankByVotes;
    },

    SET_PENDING_TX (state, pendingTx) {
      state.pendingTx = pendingTx;
    },
    LAUNCHED (state) {
      state.launched = true;
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

      await dispatch('setBalance');
      await dispatch('setVotedCandidatesFromAccount');
      await dispatch('setRequests');
      await dispatch('setContractState');
      await dispatch('setActivityReward');
    },
    disconnectEthereum ({ commit }) {
      commit('SET_WEB3', null);
      commit('SET_ACCOUNT', '');
      commit('SET_CHAIN_ID', '');
    },
    async setBalance ({ state, commit }) {
      const ton = getContract('TON', state.web3);
      const tonBalance = await ton.methods.balanceOf(state.account).call();
      commit('SET_TON_BALANCE', tonBalance);
    },
    async setMyVotes ({ state, commit }, candidateContractAddress) {
      const candidateContract = getContract('Candidate', state.web3, candidateContractAddress);
      const myVotes = await candidateContract.methods.stakedOf(state.account).call();

      commit('SET_MY_VOTES', myVotes);
    },
    async setRequests ({ state, commit }) {
      const requestsByCandidate = [];

      const depositManager = getContract('DepositManager', state.web3);
      state.candidates.forEach(async candidate => {
        const numPendingRequests = await depositManager.methods.numPendingRequests(candidate.candidateContract, state.account).call();
        if (numPendingRequests === 0) {
          return [];
        }

        let requestIndex
            = await depositManager.methods.withdrawalRequestIndex(candidate.candidateContract, state.account).call();

        const pendingRequests = [];
        for (let i = 0; i < numPendingRequests; i++) {
          pendingRequests.push(depositManager.methods.withdrawalRequest(candidate.candidateContract, state.account, requestIndex).call());
          requestIndex++;
        }
        const requests = await Promise.all(pendingRequests);
        candidate.requests = requests;
        requestsByCandidate.push(candidate);
      });
      commit('SET_REQUESTS_BY_CANDIDATE', requestsByCandidate);
    },
    async setContractState ({ state, commit }) {
      const agendaManager = getContract('DAOAgendaManager', state.web3);
      const committeeProxy = getContract('DAOCommitteeProxy', state.web3);
      const [
        createAgendaFee,
        claimableAmount,
      ] = await Promise.all([
        agendaManager.methods.createAgendaFees().call(),
        committeeProxy.methods.getClaimableActivityReward(state.account).call(),
      ]);

      const contractState = {
        createAgendaFee,
        claimableAmount,
      };
      commit('SET_CONTRACT_STATE', contractState);
    },
    async launch ({ commit, dispatch }) {
      await dispatch('setAgendas');
      await dispatch('setCandidateRankByVotes');
      await dispatch('setMembersAndNonmembers');
      commit('LAUNCHED');
    },
    async setMembersAndNonmembers ({ state, commit }) {
      const daoCommitteeProxy = getContract('DAOCommitteeProxy', state.web3);

      const [
        candidates,
        maxMember,
      ] = await Promise.all([
        await getCandidates(),
        await daoCommitteeProxy.methods.maxMember().call(),
      ]);

      const addressMembers = [];
      for (let i = 0; i < maxMember; i++) {
        const memberAddress = await daoCommitteeProxy.methods.members(i).call();
        if (!memberAddress) {
          console.log('bug', 'NO MEMBER ADDRESS'); // eslint-disable-line
        }
        const member = {
          address: memberAddress.toLowerCase(),
          memberIndex: i,
        };

        addressMembers.push(member);
      }

      const getVotesProm = [];
      candidates.forEach(candidate => {
        // TODO: fix contract.
        // daoCommittee.methods.totalSupplyOnCandidate(candidate.candidate).call()
        const candidateContract = getContract('Candidate', state.web3, candidate.candidateContract);
        getVotesProm.push(candidateContract.methods.totalStaked().call());
      });
      const votes = await Promise.all(getVotesProm);

      const getInfosProm = [];
      candidates.forEach(candidate => getInfosProm.push(daoCommitteeProxy.methods.candidateInfos(candidate.candidate).call()));
      const infos = await Promise.all(getInfosProm);

      for (let i = 0; i < candidates.length; i++) {
        candidates[i].vote = votes[i]; // eslint-disable-line
        candidates[i].info = infos[i]; // eslint-disable-line
      }
      commit('SET_CANDIDATES', candidates);

      const members = new Array(maxMember);
      const nonmembers = [];
      candidates.forEach(candidate => {
        addressMembers.forEach(member => {
          if (member.address.includes(candidate.candidate.toLowerCase())) {
            candidate.memberIndex = member.memberIndex;
            members[member.memberIndex] = candidate;

            return;
          }
        });
        nonmembers.push(candidate);
      });
      commit('SET_MEMBERS', members);
      commit('SET_NONMEMBERS', nonmembers);
    },
    async setAgendas ({ state, commit }) {
      let web3 = state.web3;
      if (!web3) {
        web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/f6429583907549eca57832ec1a60b44f'));
      }
      const daoCommittee = getContract('DAOCommittee', web3);
      const committeeProxy = getContract('DAOCommitteeProxy', web3);

      const account = state.account;
      const [agendas, events] = await Promise.all([
        await getAgendas(), await getAgendaVoteCasted()],
      );

      const voteCasted = [];
      events.forEach(event => (event.eventName === 'AgendaVoteCasted' ? voteCasted.push(event) : 0)); // check
      const myVote = [];
      let activityReward, candidateContract;
      if (account !== '') {
        [
          activityReward,
          candidateContract,
        ] = await Promise.all([
          await daoCommittee.methods.getClaimableActivityReward(account).call(),
          await committeeProxy.methods.candidateContract(account).call(),
        ]);
        activityReward = _TON(activityReward, 'wei').toString();
        voteCasted.forEach(vote => (vote.from === candidateContract.toLowerCase() ? myVote.push(vote.data) : '')); // check
      } else {
        activityReward = '0 TON';
      }

      commit('SET_ACTIVITY_REWARD', activityReward);
      commit('SET_AGENDA_VOTE_CASTED', voteCasted);

      const voteRate = (myVote.length / agendas.length) * 100;

      if (account !== '') {
        agendas.forEach(agenda => {
          myVote.map(function (vote) {
            if (Number(vote.id) === agenda.agendaid) {
              const index = agendas.indexOf(agenda);
              const agendaWithVote = { ...agenda, ...vote };
              agendas.splice(index, 1, agendaWithVote);
            }
          });
        });
      }

      commit('SET_MY_VOTE', myVote);
      commit('SET_VOTE_RATE', voteRate);

      const promAgendaTx = [];
      const promAgendaContents = [];
      for (let i = 0; i < agendas.length; i++) {
        const txHash = agendas[i].transactionHash;
        promAgendaTx.push(web3.eth.getTransaction(txHash));

        promAgendaContents.push(getAgendaContents(agendas[i].agendaid));
      }
      const agendaTxs = await Promise.all(promAgendaTx);
      const agendaContents = await Promise.all(promAgendaContents);

      for (let i = 0; i < agendas.length; i++) {
        agendas[i].onChainEffects = parseAgendaBytecode(agendaTxs[i]);

        agendas[i].contents = agendaContents[i].contents;
        agendas[i].creator = agendaContents[i].creator;
      }

      commit('SET_AGENDAS', agendas);
    },
    async setCandidateRankByVotes ({ commit }) {
      const candidateRankByVotes = await getCandidateRankByVotes();
      commit('SET_CANDIDATE_RANK_BY_VOTES', candidateRankByVotes);
    },
    async setVoters ({ commit }, _candidate) {
      if(_candidate!=null ){
        let address=_candidate.candidateContract;
        if(_candidate.kind === 'layer2') address=_candidate.layer2;
        const voters = await getVotersByCandidate(address.toLowerCase());
        commit('SET_VOTERS', voters);
      }
    },
    async setVotedCandidatesFromAccount ({ state, commit }) {
      const myVotesProm = [];
      state.candidates.forEach(candidate => {
        const candidateContract = getContract('Candidate', state.web3, candidate.candidateContract);
        myVotesProm.push(candidateContract.methods.stakedOf(state.account).call());
      });
      const myVotes = await Promise.all(myVotesProm);

      const votedCandidatesFromAccount = [];
      for (let i = 0; i < state.candidates.length; i++) {
        const candidate = state.candidates[i];
        if (myVotes[i] > 0) {
          votedCandidatesFromAccount.push({
            name: candidate.name,
            myVotes: myVotes[i],
            candidate: candidate.candidate,
            candidateContract: candidate.candidateContract,
          });
        }
      }
      commit('SET_VOTED_CANDIDATES_FROM_ACCOUNT', votedCandidatesFromAccount);
    },
    async setActivityReward ({ state, commit }) {
      const web3 = state.web3;
      const account = state.account;
      try{
        if (web3!=null) {
          let activityReward;
          if(account!=null && account.length > 0 ){
            const committeeProxy = await getContract('DAOCommitteeProxy', web3);
            activityReward = await committeeProxy.methods.getClaimableActivityReward(account).call();
            activityReward = _TON(activityReward, 'wei').toString(18);
            commit('SET_ACTIVITY_REWARD', activityReward);
          }
        }
      }catch(error){
        console.log('setActivityReward error', error);  // eslint-disable-line
      }

    },
  },
  getters: {
    agendaVoteResult: (state) => (agendaId) => {
      const agenda = state.agendas.find(agenda => String(agenda.agendaid) === String(agendaId));
      return agenda.voting;
    },
    getAgendaByID: (state) => (agendaId) => {
      const agenda = state.agendas.find(agenda => String(agenda.agendaid) === String(agendaId));
      return agenda ? agenda : {};
    },
    getVotedListByID: (state) => (agendaId) => {
      const voted = [];
      state.voteCasted.forEach(async casted => casted.data.id === agendaId ? voted.push(casted.data) : '');
      return voted;
    },
    candidate: (state) => (address) => {
      if(address){
        const index = state.candidates.map(candidate => candidate.candidateContract.toLowerCase()).indexOf(address.toLowerCase());
        return index !== -1 ? state.candidates[index] : null;
      }else return null;
    },
    isCandidate: (_, getters) => {
      return getters.candidateContractFromEOA;
    },
    candidateContractFromEOA: (state) => {
      const account = state.account.toLowerCase();
      if (!account) return '';

      const candidate = state.candidates.find(candidate => candidate.candidate.toLowerCase() === account);
      const operator = state.candidates.find(candidate => candidate.operator.toLowerCase() === account);

      if (candidate)     return candidate.candidateContract;
      else if (operator) return operator.candidateContract;
      else               return '';
    },
    myCandidateContracts: (state) => {
      const account = state.account.toLowerCase();
      if (!account) return '';
      const myCandidateContracts =[];
      for(let i=0; i< state.candidates.length; i++ ){
        if( state.candidates[i].operator.toLowerCase()  === account  ){
          myCandidateContracts.push(state.candidates[i].candidateContract);
        }
      }
      if(myCandidateContracts.length === 0 ) return '';
      else return myCandidateContracts.toString();
    },
    member: (state, getters) => (candidateContract) => {
      return state.members.find(member => {
        if (!member || !member.candidateContract) return false;
        return member.candidateContract.toLowerCase() === getters.candidate(candidateContract).candidateContract.toLowerCase();
      });
    },
    isMember: (_, getters) => {
      const candidateContract = getters.candidateContractFromEOA;
      if (!candidateContract) return false;

      const member = getters.member(candidateContract);
      return member;
    },
    requests: (state) => (address) => {
      const index = state.requestsByCandidate.map(candidate => candidate.candidateContract.toLowerCase()).indexOf(address.toLowerCase());
      return index > -1 ? state.requestsByCandidate[index].requests : [];
    },
    totalVotesForCandidate: (_, getters) => (address) => {
      const candidate = getters.candidate(address);
      return (!candidate || !candidate.vote) ? 0 : candidate.vote;
    },
    notWithdrawableRequests: (state, getters) => (candidate) => {
      const requests = getters.requests(candidate);
      if (!requests || requests.length === 0) {
        return [];
      }
      return requests.filter(request => parseInt(request.withdrawableBlockNumber) > state.blockNumber);
    },
    withdrawableRequests: (state, getters) => (candidate) => {
      const requests = getters.requests(candidate);
      if (!requests || requests.length === 0) {
        return [];
      }
      return requests.filter(request => parseInt(request.withdrawableBlockNumber) <= state.blockNumber);
    },
    numCanRevote: (_, getters) => (address, revoteIndex) => {
      const requests = getters.requests(address);
      if (!requests) {
        return 0;
      }
      return requests.length - revoteIndex;
    },
    canRevote: (_, getters) => (address, revoteIndex) => {
      const requests = getters.requests(address);
      if (!requests) {
        return 0;
      }

      const voteRequests = requests.slice(0, requests.length - revoteIndex);
      const amount = voteRequests.reduce((prev, cur) => prev + parseInt(cur.amount), 0);
      return amount;
    },
    numCanWithdraw: (_, getters) => (address, withdrawIndex) => {
      const requests = getters.withdrawableRequests(address);
      if (!requests) {
        return 0;
      }
      return requests.length - withdrawIndex;
    },
    canWithdraw: (_, getters) => (address, withdrawIndex) => {
      const requests = getters.withdrawableRequests(address);
      if (!requests) {
        return 0;
      }

      const withdrawableRequests = requests.slice(0, requests.length - withdrawIndex);
      const amount = withdrawableRequests.reduce((prev, cur) => prev + parseInt(cur.amount), 0);
      return amount;
    },
    createAgendaFee: (state) => {
      if (!state.contractState) return 0;
      return state.contractState.createAgendaFee ? state.contractState.createAgendaFee : 0;
    },
    claimableAmount: (state) => {
      if (!state.contractState) return 0;
      return state.contractState.claimableAmount;
    },
    agendaOnChainEffects: (_, getters) => (agendaId) => {
      const agenda = getters.getAgendaByID(agendaId);
      if (!agenda) {
        return [];
      }

      return agenda.onChainEffects ? agenda.onChainEffects : [];
    },
    agendaCreator: (_, getters) => (agendaId) => {
      const agenda = getters.getAgendaByID(agendaId);
      if (!agenda) {
        return '';
      }

      return agenda.creator ? agenda.creator : '';
    },
    agendaContents: (_, getters) => (agendaId) => {
      const agenda = getters.getAgendaByID(agendaId);
      if (!agenda) {
        return '';
      }

      return agenda.contents ? agenda.contents : '';
    },
    comments: (state) => (agendaId) => {
      if (!state.voteCasted) return [];
      return state.voteCasted.filter(v => v.data.id === agendaId);
    },
    sortedCandidateRankByVotes: (state) => {
      if (!state.candidateRankByVotes || state.candidateRankByVotes.length === 0) return [];

      return state.candidateRankByVotes.sort(function (a, b)  {
        a = a.coinageTotalSupply.toString(16);
        a = web3Utils.toBN(a);

        b = b.coinageTotalSupply.toString(16);
        b = web3Utils.toBN(b);

        if (a.cmp(b) === 1)      return -1;
        else if (a.cmp(b) === 0) return 0;
        else                     return 1;
      });
    },
    sortedVotedCandidatesFromAccountByVotes: (state) => {
      if (!state.votedCandidatesFromAccount || state.votedCandidatesFromAccount.length === 0) return [];

      return state.votedCandidatesFromAccount.sort(function (a, b)  {
        a = a.myVotes.toString(16);
        a = web3Utils.toBN(a);

        b = b.myVotes.toString(16);
        b = web3Utils.toBN(b);

        if (a.cmp(b) === 1)      return -1;
        else if (a.cmp(b) === 0) return 0;
        else                     return 1;
      });
    },
    sumOfVotes: (state) => {
      const initialAmount = 0;
      const reducer = (amount, voter) => amount + voter.balance;
      return state.voters.reduce(reducer, initialAmount);
    },
  },
});
