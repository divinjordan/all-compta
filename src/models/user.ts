import create from "zustand";

export interface User {
  username: string;
  email: string;
  password: string;
}

interface UserState {
  data: Partial<User>;
  isLogged: boolean;
  set: (data: Partial<User>) => void;
  login: () => void;
  logout: () => void;
}

export const useUser = create<UserState>((set) => ({
  data: {},
  isLogged: false,
  set: (data: Partial<User>) =>
    set((state) => ({
      data: {
        ...state.data,
        ...data,
      },
    })),
  login: () => set(() => ({ isLogged: true })),
  logout: () => set(() => ({ isLogged: false })),
}));
