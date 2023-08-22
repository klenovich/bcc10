import React from 'react';
import Toolbar from './Toolbar';
import Whiteboard from './Whiteboard';

export {}

const Layout: React.FC = () => {
  return (
    <div className="layout">
      <Toolbar />
      <Whiteboard />
      <style jsx>{`
        .layout {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background-color: #f5f5f5;
        }
      `}</style>
    </div>
  );
};

export default Layout;
