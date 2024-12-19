import { create } from "zustand";

export interface User {
  uid: string;
  email: string;
  username: string;
  fullname: string;
  bio: string;
  profilePicURL: string;
  coverPicURL: string;
  followers: string[];
  following: string[];
  createdAt: number;
}

interface AuthState {
  user: User | null;
  isWelcomeShown: boolean;
  login: (user: User) => void;
  logout: () => void;
  setUser: (user: User) => void;
  setWelcomeShown: (status: boolean) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: localStorage.getItem("user-info")
    ? JSON.parse(localStorage.getItem("user-info") as string)
    : null,
  isWelcomeShown: localStorage.getItem("isWelcomeShown") === "true", // Read the value from localStorage
  login: (user) => {
    set({ user });
    localStorage.setItem("user-info", JSON.stringify(user)); // Save user info in localStorage
  },
  logout: () => {
    set({ user: null, isWelcomeShown: false });
    localStorage.removeItem("user-info"); // Remove user info from localStorage
    localStorage.setItem("isWelcomeShown", "false"); // Reset isWelcomeShown on logout
  },
  setUser: (user) => {
    set({ user });
    localStorage.setItem("user-info", JSON.stringify(user)); // Update user info in localStorage
  },
  setWelcomeShown: (status) => {
    set({ isWelcomeShown: status });
    localStorage.setItem("isWelcomeShown", status ? "true" : "false"); // Save the status in localStorage
  }
}));

export default useAuthStore;
