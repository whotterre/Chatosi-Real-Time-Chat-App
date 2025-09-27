import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
  isSettingOpen: false,
  isProfileOpen: false,

  openSettings: (open) => {
    set({ isSettingsOpen: open });
  },
  openProfile: (open) => set({ isProfileOpen: open }),
}));