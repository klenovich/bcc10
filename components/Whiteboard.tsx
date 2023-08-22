import React from 'react';

export {}

const Whiteboard: React.FC = ({ children }) => {
  return (
    <div className="whiteboard">
      {children}
      <style jsx>{`
        .whiteboard {
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

export default Whiteboard;
