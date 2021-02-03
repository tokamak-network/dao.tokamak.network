import axios from 'axios';

function createInstance () {
  return axios.create({
    baseURL: 'https://daoapi.tokamak.network/v1',
  });
}
const instance = createInstance();
const chainId = 4;

// TODO: check param
export async function getRecentEvents () {
  const res = await instance.get('/events', {
    params: {
      chainId,
      page: 1,
      pagesize: 20,
      eventNames: 'AgendaCreated,AgendaExecuted,AgendaVoteCasted,ApplyMemberSuccess,CandidateContractCreated,ChangedMember,ChangedSlotMaximum,ClaimedActivityReward,OperatorRegistered,AgendaStatusChanged,AgendaResultChanged',
    },
  });
  return res.data.datas;
}

export async function getCandidates () {
  const res = await instance.get('/layer2s/dao_candidates', {
    params: {
      chainId,
    },
  });
  return res.data.datas;
}

export async function getAgendaVoteCasted () {
  const res = await instance.get('/events', {
    params: {
      chainId,
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
      chainId,
    },
  });
  return res.data.datas;
}

export async function getVotersByCandidate (layer2) {
  const res = await instance.get(`/balances/stakeof?layer2=${layer2}`, {
    params: {
      chainId,
    },
  });
  if (!res || res.data.datas.length === 0) {
    return [];
  }
  return res.data.datas;
}

export async function getCandidateRankByVotes () {
  const res = await instance.get('/layer2coinages/dao_latest', {
    params: {
      chainId,
    },
  });
  return res.data.datas;
}

export async function createAgenda (from, txHash, contents, type) {
  await instance.post('/agendacontents', { account: from, tx: txHash, contents, type });
}

export async function getAgendaContents (agendaId) {
  const res = await instance.get('/agendacontents', {
    params: {
      chainId,
      agendaid: agendaId,
    },
  });
  return res.data.datas[0];
}
