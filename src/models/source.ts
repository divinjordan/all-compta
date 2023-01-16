import create from "zustand";
import { Transaction } from "./transaction";

export interface Source {
  id: string;
  name: string;
  type: string;
  transactions: Transaction[];
}

interface SourceState {
  current: Partial<Source>;
  items: [];
  //set: (key: string) => void;
}

export const useSource = create<SourceState>((set) => ({
  current: {},
  items: [],
}));
