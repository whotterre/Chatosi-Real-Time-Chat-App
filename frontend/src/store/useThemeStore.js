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
    set({ isProfileOpen: false });
    set({ isSettingOpen: open });
  },
  openProfile: (open) => {
    set({ isSettingsOpen: false });
    set({ isProfileOpen: open })
  },
}));