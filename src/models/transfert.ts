import create from "zustand";

export interface Transfert {
  id: string;
  amount: number;
  label: string;
  receiver: string;
  sender: string;
}

interface TransfertState {
  current: Partial<Transfert>;
  items: [];
  //set: (key: string) => void;
}

export const useTransfert = create<TransfertState>((set) => ({
  current: {},
  items: [],
}));
