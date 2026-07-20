export function useElectron() {
  const isElectron = typeof window !== 'undefined' && !!window.electronAPI;

  return {
    isElectron,
    platform: isElectron ? window.electronAPI.platform : 'web',
    version: isElectron ? window.electronAPI.getVersion() : null,
  };
}