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
  isWelcomeShown: localStorage.getItem("isWelcomeShown") === "true",
  login: (user) => {
    set({ user });
    localStorage.setItem("user-info", JSON.stringify(user)); 
  },
  logout: () => {
    set({ user: null, isWelcomeShown: false });
    localStorage.removeItem("user-info"); 
    localStorage.setItem("isWelcomeShown", "false"); 
  },
  setUser: (user) => {
    set({ user });
    localStorage.setItem("user-info", JSON.stringify(user)); 
  },
  setWelcomeShown: (status) => {
    set({ isWelcomeShown: status });
    localStorage.setItem("isWelcomeShown", status ? "true" : "false"); 
  }
}));

export default useAuthStore;
