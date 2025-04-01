/* eslint-env node */
import ApolloClient from 'apollo-boost';

export default new ApolloClient({
  // uri: 'https://api.studio.thegraph.com/query/77344/staking-v1-subgraph/version/latest',
  // eslint-disable-next-line
  uri: process.env.VUE_APP_SUBGRAPH_API,
});
