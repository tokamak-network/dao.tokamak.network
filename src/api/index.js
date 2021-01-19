import axios from 'axios';

function createInstance () {
  return axios.create({
    baseURL: 'https://daoapi.tokamak.network/v1',
  });
}
const instance = createInstance();

export async function getEvents (eventsnames) {
  eventsnames;
  const res = await instance.get('/events', {
    params: {
      chainId: 4,
      page: 1,
      pagesize: 20,
      eventNames: 'Deposited,CandidateContractCreated',
    },
  });
  return res.data.datas;
}

export async function getCandidates () {
  const res = await instance.get('/layer2s/operators', {
    params: {
      chainId: 4,
    },
  });
  return res.data.datas;
}

export async function getAgendaVoteCasted () {
  const res = await instance.get('/events', {
    params: {
      chainId: 4,
      page: 1,
      pagesize: 100,
      eventNames: 'AgendaVoteCasted',
    },
  });
  return res.data.datas;
}

export async function getAgendas () {
  const res = await instance.get('/agendas', {
    params: {
      chainId: 4,
    },
  });
  return res.data.datas;
}

export async function getVotersByCandidate (layer2) {
  const res = await instance.get(`balances/stakeof?layer2=${layer2}`);
  return res.data.datas;
}

export async function getCandidateRankByVotes () {
  const res = await instance.get('balances/sums');
  return res.data.datas;
}