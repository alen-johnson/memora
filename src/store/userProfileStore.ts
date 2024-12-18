import {create} from 'zustand'
import { User } from './authStore';

  interface UserProfileState {
    userProfile: User | null;
    setUserProfile: (user: User) => void;
  }

  const useUserProfileStore = create<UserProfileState>((set) => ({
    userProfile: null,
    setUserProfile: (user) => set({ userProfile: user }),
  }));


export default useUserProfileStore;