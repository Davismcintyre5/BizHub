import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { Button } from '../ui/Button';

export function UpdatePrompt() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [version, setVersion] = useState('');
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.getVersion().then(setVersion);
    }
  }, []);

  if (!updateAvailable) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-4 max-w-sm">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">Update Available</h4>
          <p className="text-sm text-gray-500">A new version of BizHub is ready.</p>
        </div>
        <button onClick={() => setUpdateAvailable(false)} className="text-gray-400 hover:text-gray-600"><X size={16} /></button>
      </div>
      <div className="flex gap-2 mt-3">
        <Button size="sm" onClick={() => { setDownloading(true); window.electronAPI?.checkUpdate(); }}>
          <Download size={14} /> {downloading ? 'Downloading...' : 'Update Now'}
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setUpdateAvailable(false)}>Later</Button>
      </div>
    </div>
  );
}