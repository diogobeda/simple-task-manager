import React from 'react';
import styled from '@emotion/styled';
import format from 'date-fns/format';
import useDraggable from '../drag-n-drop/useDraggable';

const Card = styled.div`
  max-height: 100px;
  border-radius: 6px;
  box-shadow: 0px 2px 10px 0px #7d7d7d;
  padding: 10px 15px;
  user-select: none;
  background-color: #fff;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: 0 0 15px 0;
`;

const Title = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const DueDate = styled.p`
  font-size: 1rem;
`;

const Description = styled.p`
  font-size: 0.8rem;
  line-clamp: 3;
`;

const TaskCard = ({ task }) => {
  const { draggableRef } = useDraggable({ data: task });

  return (
    <Card ref={draggableRef}>
      <Header>
        <Title>{task.name}</Title>
        <DueDate>due at: {format(task.dueAt, 'MM/DD/YYYY')}</DueDate>
      </Header>
      <Description>{task.description}</Description>
    </Card>
  );
};

export default TaskCard;