import * as React from 'react';
import { createPortal } from 'react-dom';

interface BackdropLoaderProps {
  loading: boolean;
}

export const BackdropLoader: React.FC<BackdropLoaderProps> = ({ loading }) => {
  if (!loading) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="status"
      aria-label="Loading"
    >
      <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
    </div>,
    document.body
  );
};
