import React, { useState, useEffect, useRef } from 'react';
import { Socket } from 'socket.io-client';

export {}

interface CanvasProps {
  socket: Socket;
  color: string;
  isEraser: boolean;
}

const Canvas: React.FC<CanvasProps> = ({ socket, color, isEraser }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (canvas && context) {
      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, canvas.width, canvas.height);

      socket.on('draw', (data: { x: number; y: number; color: string; isEraser: boolean }) => {
        const { x, y, color, isEraser } = data;
        if (context) {
          context.strokeStyle = isEraser ? '#ffffff' : color;
          context.lineWidth = isEraser ? 20 : 2;
          context.lineCap = 'round';
          context.beginPath();
          context.moveTo(prevPosition.x, prevPosition.y);
          context.lineTo(x, y);
          context.stroke();
          setPrevPosition({ x, y });
        }
      });
    }

    return () => {
      socket.off('draw');
    };
  }, [socket, prevPosition]);

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (canvas && context) {
      setDrawing(true);
      const { offsetX, offsetY } = event.nativeEvent;
      context.strokeStyle = isEraser ? '#ffffff' : color;
      context.lineWidth = isEraser ? 20 : 2;
      context.lineCap = 'round';
      context.beginPath();
      context.moveTo(offsetX, offsetY);
      setPrevPosition({ x: offsetX, y: offsetY });
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (drawing) {
      const canvas = canvasRef.current;
      const context = canvas?.getContext('2d');

      if (canvas && context) {
        const { offsetX, offsetY } = event.nativeEvent;
        context.lineTo(offsetX, offsetY);
        context.stroke();
        setPrevPosition({ x: offsetX, y: offsetY });

        socket.emit('draw', {
          x: offsetX,
          y: offsetY,
          color,
          isEraser,
        });
      }
    }
  };

  const handleMouseUp = () => {
    setDrawing(false);
  };

  return (
    <canvas
      ref={canvasRef}
      className="canvas"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    ></canvas>
  );
};

export default Canvas;
