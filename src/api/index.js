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
  return res.data.datas;
}
