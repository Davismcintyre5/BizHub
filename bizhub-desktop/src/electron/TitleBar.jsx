import { useState, useEffect } from 'react';
import { Minus, Square, X, SquareDashed } from 'lucide-react';

export function TitleBar() {
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.isMaximized().then(setIsMaximized);
    }
  }, []);

  if (!window.electronAPI) return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-8 bg-gray-900 flex items-center justify-between z-50 drag-region">
      <div className="flex items-center gap-2 pl-3">
        <span className="text-xs text-gray-400 font-medium">BizHub</span>
      </div>
      <div className="flex items-center h-full no-drag">
        <button onClick={() => window.electronAPI.minimizeWindow()} className="h-8 w-10 flex items-center justify-center hover:bg-gray-700 text-gray-400">
          <Minus size={14} />
        </button>
        <button onClick={() => { window.electronAPI.maximizeWindow(); setIsMaximized(!isMaximized); }} className="h-8 w-10 flex items-center justify-center hover:bg-gray-700 text-gray-400">
          {isMaximized ? <SquareDashed size={12} /> : <Square size={12} />}
        </button>
        <button onClick={() => window.electronAPI.closeWindow()} className="h-8 w-10 flex items-center justify-center hover:bg-red-600 text-gray-400 hover:text-white">
          <X size={14} />
        </button>
      </div>
    </div>
  );
}