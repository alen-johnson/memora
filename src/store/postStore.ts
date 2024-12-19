import { create } from "zustand";

export interface  Post {
  id: string;
  caption: string;
  picURL?: string;
  createdAt: number;
  createdBy: string;
}

interface PostState {
  posts: Post[];
  createPost: (post: Post) => void;
  setPosts: (posts: Post[]) => void; 
}

const usePostStore = create<PostState>((set) => ({
  posts: localStorage.getItem("posts")
    ? JSON.parse(localStorage.getItem("posts") as string)
    : [], 
  createPost: (post) => {
    set((state) => {
      const updatedPosts = [post, ...state.posts];
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
      return { posts: updatedPosts };
    });
  },
  setPosts: (posts) => set({ posts }), 
}));

export default usePostStore;
