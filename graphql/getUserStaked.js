import { gql } from '@apollo/client';

export const GET_USERSTAKED = gql`
  query GetUserStaked($candidate: String!) {
    userStakeds(where:{candidate_in:[$candidate]}, orderBy: stakeOf, orderDirection: desc) {
      id
      stakeOf
      user {
        id
      }
    }
  }
`;
