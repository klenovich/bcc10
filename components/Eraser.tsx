import React from 'react';

export {}

interface EraserProps {
  onEraserSelected: () => void;
}

const Eraser: React.FC<EraserProps> = ({ onEraserSelected }) => {
  const handleEraserClick = () => {
    onEraserSelected();
  };

  return (
    <button onClick={handleEraserClick}>
      Eraser
    </button>
  );
};

export default Eraser;
