import gql from 'graphql-tag';

export const TaskFragment = gql`
  fragment TaskFragment on Task {
    id
    name
    description
    dueAt
    status
  }
`;