import ApolloClient from 'apollo-boost';

export default new ApolloClient({
  uri: process.env.VUE_APP_SUBGRAPH_DEV_API,
});
