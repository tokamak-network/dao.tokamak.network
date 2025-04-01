/* eslint-env node */
import ApolloClient from 'apollo-boost';

export default new ApolloClient({
  // eslint-disable-next-line
  uri: process.env.VUE_APP_SUBGRAPH_DEV_API,
});
