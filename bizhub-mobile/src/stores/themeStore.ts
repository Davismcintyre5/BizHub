import { create } from 'zustand';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemePreference = 'light' | 'dark' | 'system';

interface ThemeStore {
  preference: ThemePreference;
  hydrated: boolean;
  hydrate: () => Promise<void>;
  setPreference: (p: ThemePreference) => Promise<void>;
  resolve: () => 'light' | 'dark';
}

const STORAGE_KEY = 'bizhub.theme';

export const useThemeStore = create<ThemeStore>((set, get) => ({
  preference: 'system',
  hydrated: false,

  async hydrate() {
    try {
      const saved = (await AsyncStorage.getItem(STORAGE_KEY)) as
        | ThemePreference
        | null;
      if (saved) set({ preference: saved });
    } finally {
      set({ hydrated: true });
    }
  },

  async setPreference(p) {
    set({ preference: p });
    await AsyncStorage.setItem(STORAGE_KEY, p);
  },

  resolve() {
    const pref = get().preference;
    if (pref === 'system') {
      return Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';
    }
    return pref;
  },
}));