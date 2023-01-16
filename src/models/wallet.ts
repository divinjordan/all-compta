import create from "zustand";
import { Transaction } from "./transaction";

export interface Wallet {
  id: string;
  balance: string;
  transactions: Transaction[];
}

interface WalletState {
  current: Partial<Wallet>;
  items: [];
  //set: (key: string) => void;
}

export const useWallet = create<WalletState>((set) => ({
  current: {},
  items: [],
}));
