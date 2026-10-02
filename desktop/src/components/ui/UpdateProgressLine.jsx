import { useUpdater } from '../.././utils/appInfo.js';


export function UpdateProgressLine({ width = 80, showSpeed = false, className = '' }) {
  const { isDownloading, progress, speedLabel } = useUpdater();

  if (!isDownloading) return null;

  const pct = Math.max(0, Math.min(100, progress?.percent || 0));

  return (
    <span
      className={`inline-flex items-center gap-2 align-middle ${className}`}
      title={`Downloading update — ${Math.round(pct)}%${showSpeed ? ` · ${speedLabel}` : ''}`}
    >
      <span
        className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
        style={{ width, height: 3 }}
      >
        <span
          className="block bg-blue-500 h-full transition-all duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </span>
      {showSpeed && (
        <span className="text-[10px] text-gray-400 tabular-nums">
          {Math.round(pct)}%
        </span>
      )}
    </span>
  );
}