/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getUserBalance } from '../services/api-ng';
import useStore from '../store';
import loadingGif from '../images/loading.gif';
import History from './history';

function AccountUser() {
  const navigate = useNavigate();
  const token = useStore((set) => set.token);
  const [balance, setBalance] = useState<any>();

  useEffect(() => {
    const getBalance = async () => {
      const accountBalance = await getUserBalance(token);

      setBalance(accountBalance.data.balance);
    };

    getBalance();
  }, []);

  return (
    <div className="p-10 flex h-4/5 w-3/4 rounded bg-zinc-200 drop-shadow-2xl">
      <History text="Ultimas Transações" slice={-5} />

      <div className="h-full w-1/2 flex flex-col justify-around items-end">
        {balance
          ? (
            <span className="font-bold text-3xl text-green-700 mr-16">
              <h3 className="text-black">Saldo em conta</h3>
              {balance.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
            </span>
          )
          : <img src={loadingGif} alt="Loading" />}

        <div className="w-full h-1/3 flex justify-evenly items-center">
          <button
            onClick={() => { navigate('/newTransaction'); }}
            className="bg-blue-500 h-3/5 w-2/5 rounded-lg text-xl font-bold hover:bg-blue-400"
            type="button"
          >
            Transferência
          </button>

          <button
            onClick={() => { navigate('/transactions'); }}
            className="bg-blue-500 h-3/5 w-2/5 rounded-lg text-xl font-bold hover:bg-blue-400"
            type="button"
          >
            Extrato
          </button>
        </div>

      </div>
    </div>
  );
}

export default AccountUser;
