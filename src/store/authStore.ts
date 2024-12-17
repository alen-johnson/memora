import { create } from "zustand";


interface AuthState {
  user: User | null; 
  login: (user: User) => void;
  logout: () => void;
  setUser: (user: User) => void;
}


export interface User {
  uid: string;
  email: string;
  username: string;
  fullname: string;
  bio: string;
  profilePicURL: string;
  coverPicUrl: string;
  followers: string[];
  following: string[];
  createdAt: number;
}


const useAuthStore = create<AuthState>((set) => ({
  user:localStorage.getItem("user-info")
  ? JSON.parse(localStorage.getItem("user-info") as string)
  : null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
  setUser: (user) => set({ user }),
}));

export default useAuthStore;
