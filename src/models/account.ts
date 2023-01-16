import create from "zustand";
import { Transaction } from "./transaction";
import { Transfert } from "./transfert";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import app from "../libs/firebase";

const db = getFirestore(app);

export interface Account {
  id: string;
  balance: string;
  name: string;
  transactions: Transaction[];
  transferts: Transfert[];
}

interface AccountState {
  current: Partial<Account>;
  items: Partial<Account>[];
  setCurrent: (input: Partial<Account>) => void;
  setItems: (inputs: Account[]) => void;
  add: (item: Partial<Account>) => Promise<any>;
  fetch: () => Promise<any>;
}

export async function addAccount(account: Partial<Account>) {
  try {
    const accounts = collection(db, "accounts");
    const docRef = await addDoc(accounts, {
      transactions: [],
      transferts: [],
      balance: 0,
      created_at: new Date().getTime(),
      ...account,
    });
    return Promise.resolve(docRef.id);
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function getAccounts() {
  try {
    const accounts = collection(db, "accounts");
    const querySnapshot = await getDocs(accounts);
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return Promise.resolve(items);
  } catch (e) {
    return Promise.reject(e);
  }
}

export const useAccount = create<AccountState>((set) => ({
  current: {},
  items: [],
  setCurrent: (input: Partial<Account>) =>
    set((state) => ({
      current: {
        ...state.current,
        ...input,
      },
    })),
  setItems: (inputs: Account[]) =>
    set(() => ({
      items: inputs,
    })),
  add: async (item: Partial<Account>) => {
    try {
      const id = await addAccount(item);
      set((state) => ({
        items: [...state.items, { id, ...item }],
      }));
      return Promise.resolve(id);
    } catch (e) {
      return Promise.reject(e);
    }
  },
  fetch: async () => {
    try {
      const items = await getAccounts();
      set(() => ({
        items: items,
      }));
      return Promise.resolve(items);
    } catch (e) {
      return Promise.reject(e);
    }
  },
}));
