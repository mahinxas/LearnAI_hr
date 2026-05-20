import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useProgressStore = create(
  persist(
    (set, get) => ({
      welcomeVisited: false,
      purposeVisited: false,
      learningTabs: [],
      safetyChecks: {},
      purposeQuizPassed: false,
      learningQuizPassed: false,
      darkMode: false,

      markVisited: (module) => set({ [`${module}Visited`]: true }),

      markLearningTab: (tabId) => {
        const tabs = get().learningTabs;
        if (!tabs.includes(tabId)) set({ learningTabs: [...tabs, tabId] });
      },

      toggleSafetyCheck: (index) => {
        const checks = get().safetyChecks;
        set({ safetyChecks: { ...checks, [index]: !checks[index] } });
      },

      setSafetyChecks: (checks) => set({ safetyChecks: checks }),

      markQuizPassed: (module) => set({ [`${module}QuizPassed`]: true }),

      toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),
    }),
    { name: 'promptlab-progress' }
  )
);
