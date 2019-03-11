import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import { TaskFragment } from './fragments';

export const tasksGql = gql`
  query tasks {
    tasks {
      ...TaskFragment
    }
  }
  ${TaskFragment}
`;

export const useTasks = () => {
  const {
    data: { tasks } = {},
    loading,
    error,
  } = useQuery(tasksGql);

  return { tasks, loading, error };
};