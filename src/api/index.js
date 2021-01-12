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
  // TODO: considering fail condition
  return res.data.datas;
}

export async function getCandidates () {
  const res = await instance.get('/layer2s/operators', {
    params: {
      chainId: 4,
    },
  });
  // TODO: is params work?
  return res.data.datas;
}

export async function getVotersByCandidate (layer2) {
  layer2;
  // const res = await instance.get(`balances/stakeof?layer2=${layer2}`);
  const res = await instance.get('balances/stakeof?layer2=0xbc8896ebb2e3939b1849298ef8da59e09946cf66');
  return res.data.datas;
}

export async function getCandidateRankByVotes () {
  const res = await instance.get('balances/sums');
  return res.data.datas;
}
