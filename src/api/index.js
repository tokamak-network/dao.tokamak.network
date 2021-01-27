import axios from 'axios';

function createInstance () {
  return axios.create({
    baseURL: 'https://daoapi.tokamak.network/v1',
  });
}
const instance = createInstance();

// TODO: check param
export async function getRecentEvents () {
  const res = await instance.get('/events', {
    params: {
      chainId: 4,
      page: 1,
      pagesize: 20,
      eventNames: 'AgendaVoteCasted,AgendaExecuted,AgendaCreated',
    },
  });
  return res.data.datas;
}

export async function getCandidates () {
  const res = await instance.get('/layer2s/dao_candidates', {
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
  const res = await instance.get(`/balances/stakeof?layer2=${layer2}`);
  if (!res || res.data.datas.length === 0) {
    return [];
  }
  return res.data.datas;
}

export async function getCandidateRankByVotes () {
  const res = await instance.get('/balances/sums');
  return res.data.datas;
}

export async function createAgenda (from, txHash, contents) {
  await instance.post('/agendacontents', { account: from, tx: txHash, contents });
}

export async function getAgendaContents (agendaId) {
  const res = await instance.get(`/agendacontents?chainId=4&agendaid=${agendaId}`);
  return res.data.datas[0];
}
