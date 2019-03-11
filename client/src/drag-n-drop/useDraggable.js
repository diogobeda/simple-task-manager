import { useRef, useContext, useEffect } from 'react';
import { DragDropContext } from './index';

let startDragPoint = null;
export default function useDraggable({ data }) {
  const draggableRef = useRef(null);
  const {
    setIsDragging,
    activeDroppable,
    onDrop,
  } = useContext(DragDropContext);

  useEffect(() => {
    if (!draggableRef.current) {
      return;
    }

    const handleMouseDown = event => {
      draggableRef.current.style.transform = 'translate3d(0, 0, 0)';
      startDragPoint = {
        x: event.clientX,
        y: event.clientY,
      };
    };
    
    const handleMouseMove = event => {
      if (!startDragPoint) {
        return;
      }
      const offsetX = event.clientX - startDragPoint.x;
      const offsetY = event.clientY - startDragPoint.y;
      draggableRef.current.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
      setIsDragging(true);
    };
    
    const handleMouseUp = () => {
      if (draggableRef.current.style.transform === '') {
        return;
      }

      draggableRef.current.style.transform = '';
      startDragPoint = null;
      setIsDragging(false);
      onDrop(data, activeDroppable);
    };

    draggableRef.current.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      draggableRef.current.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
  }, [activeDroppable]);

  return { draggableRef };
}