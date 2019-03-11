import React from 'react';
import styled from '@emotion/styled';
import TaskCard from './TaskCard';
import useDroppable from '../drag-n-drop/useDroppable';

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.h2`
  flex-grow: 0;
  align-self: center;
  margin: 20px 0;
  font-size: 2rem;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  flex: 1 0 auto;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: ${({ isHighlighted }) => isHighlighted ? '#ccc' : '#fff'};
`;

const TaskColumn = ({ tasks, droppableData, headerText }) => {
  const { isHighlighted, droppableRef } = useDroppable({
    data: droppableData
  });

  return (
    <ColumnContainer>
      <Header>{headerText}</Header>
      <Column
        isHighlighted={isHighlighted}
        ref={droppableRef}
      >
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
          />
        ))}
      </Column>
    </ColumnContainer>
  )
};

export default TaskColumn;