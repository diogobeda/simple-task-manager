import { useRef, useContext, useEffect } from 'react';
import { DragDropContext } from './index';

export default function useDroppable({ data }) {
  const droppableRef = useRef(null);
  const {
    isDragging,
    setActiveDroppable,
    activeDroppable,
  } = useContext(DragDropContext);

  useEffect(() => {
    if (!droppableRef.current) {
      return;
    }

    const handleMouseMove = event => {
      if (!isDragging) {
        return;
      }
      const {
        left,
        right,
        top,
        bottom
      } = droppableRef.current.getBoundingClientRect();
      const containsX = event.clientX > left && event.clientX < right;
      const containsY = event.clientY > top && event.clientY < bottom;
      
      if (containsX && containsY) {
        setActiveDroppable(data);
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
    } else {
      setActiveDroppable(null);
      window.removeEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [droppableRef.current, isDragging]);

  return {
    droppableRef,
    isHighlighted: activeDroppable === data,
  };
}