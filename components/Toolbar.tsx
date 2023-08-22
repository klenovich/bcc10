import React from 'react';
import ColorPicker from './ColorPicker';
import Eraser, { EraserProps } from './Eraser';

interface ToolbarProps {
  onEraserSelected: EraserProps['onEraserSelected'];
}

const Toolbar: React.FC<ToolbarProps> = ({ onEraserSelected }) => {
  return (
    <div className="toolbar">
      <ColorPicker
        colors={[]}
        selectedColor=""
        onSelectColor={(color) => {}}
      />
      <Eraser onEraserSelected={onEraserSelected} />
    </div>
  );
};

export default Toolbar;