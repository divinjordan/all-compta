import { Source } from "postcss";
import create from "zustand";
import { Account } from "./account";
import { Wallet } from "./wallet";

export interface Transaction {
  id: string;
  amount: number;
  date: number;
  importance: number;
  label: string;
  type: string;
  wallet: Wallet;
  account: Account;
  source: Source;
}

interface TransactionState {
  current: Partial<Transaction>;
  items: [];
  //set: (key: string) => void;
}

export const useTransaction = create<TransactionState>((set) => ({
  current: {},
  items: [],
}));
