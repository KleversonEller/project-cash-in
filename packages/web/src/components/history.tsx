/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import { getTransactions, getUserBalance } from '../services/api-ng';
import useStore from '../store';
import loadingGif from '../images/loading.gif';

type HistoryProps = {
    text: string;
    slice: number
};

function History(props: HistoryProps) {
  const token = useStore((set) => set.token);
  const transactions = useStore((set) => set.history);
  const setTransactions = useStore((set) => set.setHistory);
  const [accountId, setAccountId] = useState<string>();
  const { text, slice } = props;

  useEffect(() => {
    const getBalance = async () => {
      const accountBalance = await getUserBalance(token);
      const accountTransactions = await getTransactions({}, token);

      setAccountId(accountBalance.data.accountId);
      setTransactions(accountTransactions.data);
    };

    getBalance();
  }, []);

  return (
    <div className="h-full w-1/2 flex flex-col justify-evenly items-center border border-black p-6 gap-6">
      <h3 className="font-bold text-2xl">
        {text}
      </h3>

      {transactions
        ? (typeof transactions === 'string'
          ? (
            <div className="w-full h-full flex justify-around items-center text-xl">
              <span className="text-orange-400 font-bold">
                {transactions}
              </span>
            </div>
          )
          : (
            transactions.slice(slice).reverse().map((transaction) => ((transaction.creditedAccountId === accountId)
              ? (
                <div
                  key={transaction.id}
                  className="w-full h-full flex justify-around items-center text-xl"
                >
                  <span>{transaction.createdAt.slice(0, 10).replace(/([0-9]+)-([0-9]+)-([0-9]+)/, '$3/$2/$1')}</span>
                  <span> Entrada </span>
                  <span className="text-green-700">
                    {`+ ${transaction.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`}
                  </span>
                </div>
              )
              : (
                <div
                  key={transaction.id}
                  className="w-full h-full flex justify-around items-center text-xl"
                >
                  <span>{transaction.createdAt.slice(0, 10).replace(/([0-9]+)-([0-9]+)-([0-9]+)/, '$3/$2/$1')}</span>
                  <span> Saida </span>
                  <span className="text-red-700">
                    {`- ${transaction.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`}
                  </span>
                </div>
              )))
          ))
        : <img src={loadingGif} alt="Loading" />}
    </div>
  );
}

export default History;
