/**
 * appInfo.js
 *
 * Unified bridge for app version + auto-updater state.
 *
 * Sources (in order of preference):
 *   1. window.electron (preload bridge)   → runtime, packaged app
 *   2. __APP_VERSION__ (Vite define)      → build-time, web fallback
 *   3. '1.0.0'                            → hard fallback
 *
 * Works in both Electron and browser. All calls become no-ops
 * when window.electron is absent.
 */

import { useEffect, useState, useCallback } from 'react';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const FALLBACK_VERSION =
  typeof __APP_VERSION__ !== 'undefined' && __APP_VERSION__
    ? __APP_VERSION__
    : '1.0.0';

const INITIAL_UPDATER_STATE = {
  state: 'idle', // idle | checking | available | downloading | ready | installing | error
  currentVersion: FALLBACK_VERSION,
  availableVersion: null,
  releaseNotes: null,
  releaseDate: null,
  progress: { percent: 0, bytesPerSecond: 0, transferred: 0, total: 0 },
  error: null,
  lastCheckAt: 0,
  channel: 'latest',
  isPackaged: false,
};

// ---------------------------------------------------------------------------
// Detection
// ---------------------------------------------------------------------------

export function isElectron() {
  return typeof window !== 'undefined' && !!window.electron?.isElectron;
}

// ---------------------------------------------------------------------------
// Version
// ---------------------------------------------------------------------------

/**
 * Resolve the app version once.
 * @returns {Promise<string>}
 */
export async function getAppVersion() {
  if (isElectron() && window.electron.app?.getVersion) {
    try {
      const v = await window.electron.app.getVersion();
      if (v) return v;
    } catch {
      /* fall through */
    }
  }
  return FALLBACK_VERSION;
}

/**
 * Synchronous best-effort version (for non-React contexts).
 */
export function getAppVersionSync() {
  return FALLBACK_VERSION;
}

// ---------------------------------------------------------------------------
// Updater — imperative API
// ---------------------------------------------------------------------------

export async function getUpdaterStatus() {
  if (isElectron() && window.electron.updater?.getStatus) {
    try {
      return await window.electron.updater.getStatus();
    } catch {
      /* fall through */
    }
  }
  return { ...INITIAL_UPDATER_STATE };
}

export async function checkForUpdates() {
  if (isElectron() && window.electron.updater?.check) {
    return window.electron.updater.check();
  }
  return { ok: false, reason: 'not-electron' };
}

export async function installUpdate() {
  if (isElectron() && window.electron.updater?.install) {
    return window.electron.updater.install();
  }
  return { ok: false, reason: 'not-electron' };
}

export async function dismissUpdate() {
  if (isElectron() && window.electron.updater?.dismiss) {
    return window.electron.updater.dismiss();
  }
  return { ok: false, reason: 'not-electron' };
}

export async function setUpdateChannel(channel) {
  if (isElectron() && window.electron.updater?.setChannel) {
    return window.electron.updater.setChannel(channel);
  }
  return { ok: false, reason: 'not-electron' };
}

// ---------------------------------------------------------------------------
// Progress formatting helpers
// ---------------------------------------------------------------------------

export function formatBytes(bytes) {
  if (!bytes || bytes < 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / Math.pow(1024, i);
  return `${value.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

export function formatSpeed(bytesPerSecond) {
  if (!bytesPerSecond || bytesPerSecond < 0) return '—';
  return `${formatBytes(bytesPerSecond)}/s`;
}

export function formatProgress(progress) {
  if (!progress?.total) return '';
  const { transferred = 0, total = 0, percent = 0 } = progress;
  return `${formatBytes(transferred)} / ${formatBytes(total)} (${Math.round(percent)}%)`;
}

// ---------------------------------------------------------------------------
// React hooks
// ---------------------------------------------------------------------------

/**
 * useAppVersion()
 *   const version = useAppVersion();  // "1.0.1"
 */
export function useAppVersion() {
  const [version, setVersion] = useState(FALLBACK_VERSION);

  useEffect(() => {
    let alive = true;
    getAppVersion().then((v) => {
      if (alive) setVersion(v);
    });
    return () => {
      alive = false;
    };
  }, []);

  return version;
}

/**
 * useUpdater()
 */
export function useUpdater() {
  const [status, setStatus] = useState(INITIAL_UPDATER_STATE);

  useEffect(() => {
    let alive = true;
    getUpdaterStatus().then((s) => {
      if (alive && s) setStatus((prev) => ({ ...prev, ...s }));
    });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!isElectron() || !window.electron.events?.onUpdaterChange) return;

    const unsubscribe = window.electron.events.onUpdaterChange((next) => {
      if (next) setStatus(next);
    });

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  const check = useCallback(() => checkForUpdates(), []);
  const install = useCallback(() => installUpdate(), []);
  const dismiss = useCallback(() => dismissUpdate(), []);

  const isDownloading = status.state === 'downloading';
  const isReady = status.state === 'ready';

  return {
    ...status,
    isDownloading,
    isReady,
    progressLabel: formatProgress(status.progress),
    speedLabel: formatSpeed(status.progress?.bytesPerSecond),
    check,
    install,
    dismiss,
  };
}