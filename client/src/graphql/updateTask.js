import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import { TaskFragment } from './fragments';

export const updateTaskGql = gql`
  mutation updateTask(
    $id: ID!,
    $name: String,
    $description: String,
    $dueAt: String,
    $status: String
  ) {
    updateTask(
      id: $id,
      name: $name,
      description: $description,
      dueAt: $dueAt,
      status: $status
    ) {
      ...TaskFragment
    }
  }
  ${TaskFragment}
`;

export const useUpdateTask = () =>
  useMutation(updateTaskGql, {
    update: (client, { data: { updateTask } }) => {
      client.writeFragment({
        id: updateTask.id,
        fragment: TaskFragment,
        data: updateTask,
      });
    },
  });