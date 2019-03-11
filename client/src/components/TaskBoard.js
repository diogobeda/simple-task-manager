import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import TaskColumn from './TaskColumn';
import { DragDropProvider } from '../drag-n-drop';
import { useTasks } from '../graphql/tasks';
import { useUpdateTask } from '../graphql/updateTask';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #74b9ff;
`;

const Board = styled.div`
  height: 100%;
  display: grid;
  padding: 0 20px;
  grid-template-columns: repeat(3, calc(33% - 9px));
  grid-column-gap: 20px;
`;

const defaultTasksByStatus = {
  notStarted: [],
  inProgress: [],
  completed: [],
};
const groupTaskByStatus = (tasks = []) =>
  tasks.reduce((acc, task) => {
    const { notStarted, inProgress, completed } = acc;
    switch(task.status) {
      case 'NOT_STARTED':
        return {
          ...acc,
          notStarted: notStarted.concat(task),
        }
      case 'IN_PROGRESS':
        return {
          ...acc,
          inProgress: inProgress.concat(task),
        }
      case 'COMPLETED':
        return {
          ...acc,
          completed: completed.concat(task),
        }
      default:
        return acc;
    }
  }, defaultTasksByStatus);

const handleItemDrop = updateTask => (item, droppable) =>
  updateTask({
    variables: {
      ...item,
      status: droppable
    }
  });

const TaskBoard = () => {
  const { tasks, loading, error } = useTasks();
  const updatetask = useUpdateTask();
  const {
    notStarted,
    inProgress,
    completed
  } = useMemo(() => groupTaskByStatus(tasks), [tasks]);


  if (loading) {
    return <p>Loading...</p>;
  } else if (error) {
    return <p>An error has occurred</p>;
  }

  return (
    <Container>
      <DragDropProvider onDrop={handleItemDrop(updatetask)}>
        <Board>
          <TaskColumn
            headerText="Not Started"
            droppableData="NOT_STARTED"
            tasks={notStarted}
          />
          <TaskColumn
            headerText="In Progress"
            droppableData="IN_PROGRESS"
            tasks={inProgress}
          />
          <TaskColumn
            headerText="Completed"
            droppableData="COMPLETED"
            tasks={completed}
          />
        </Board>
      </DragDropProvider>
    </Container>
  );
};

export default TaskBoard;