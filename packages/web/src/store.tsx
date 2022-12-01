import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { ITransaction } from './interfaces/transactions-interface';

type Store = {
    logon: boolean;
    token: string;
    history: ITransaction[] | string;

    setLogon: (_state: boolean) => void;
    setToken: (_token: string) => void;
    setHistory: (_state: ITransaction[] | string) => void;
};

const useStore = create<Store>()(
  devtools((set) => ({
    logon: false,
    token: 'token',
    history: 'Você não possui nenhuma transação !',

    setLogon(state: boolean) {
      set({ logon: state });
    },

    setToken(token: string) {
      set({ token });
    },

    setHistory(state: ITransaction[] | string) {
      set({ history: state });
    },
  })),
);

export default useStore;
