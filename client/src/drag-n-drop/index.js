import React, { createContext, useState } from 'react';

export const DragDropContext = createContext({ isDragging: false });

export const DragDropProvider = ({ children, onDrop }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [activeDroppable, setActiveDroppable] = useState(null);
  
  return (
    <DragDropContext.Provider value={{
      isDragging,
      setIsDragging,
      activeDroppable,
      setActiveDroppable,
      onDrop
    }}>
      {children}
    </DragDropContext.Provider>
  )
};