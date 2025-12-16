import { create } from 'zustand'

const useEngineStore = create((set) => ({
  // Authentication state
  loggedInUser: null, // 'Aadi' or 'Nanniii' after chronometric key unlock
  setLoggedInUser: (user) => set({ loggedInUser: user }),

  // Navigation state
  currentMechanism: 'chronometric', // 'chronometric', 'console', 'loom', 'press', 'coils'
  setCurrentMechanism: (mechanism) => set({ currentMechanism: mechanism }),

  // Global mood/memory data
  moodSummary: {}, // Future: aggregate mood data
  updateMoodSummary: (mood) => set((state) => ({
    moodSummary: { ...state.moodSummary, ...mood },
  })),

  // Letters/Memories
  letters: [],
  setLetters: (letters) => set({ letters }),
  addLetter: (letter) => set((state) => ({
    letters: [...state.letters, letter],
  })),
}))

export default useEngineStore
