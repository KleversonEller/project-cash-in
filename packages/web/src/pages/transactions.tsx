/* eslint-disable no-use-before-define */
import { useNavigate } from 'react-router-dom';

import NavBar from '../components/nav-bar';
import useStore from '../store';
import History from '../components/history';
import { getTransactions } from '../services/api-ng';

function Transactions() {
  const navigate = useNavigate();
  const logon = useStore((set) => set.logon);
  const token = useStore((set) => set.token);
  const setHistory = useStore((set) => set.setHistory);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData) as {date?: Date | undefined, typeTransaction?: string};

    if (data.typeTransaction === 'credited') {
      const history = await getTransactions({ date: (data.date ? data.date : undefined), credited: true }, token);

      if (history.data) {
        setHistory(history.data);
      } else {
        setHistory('Nenhuma transação encontrada');
      }
    } else if (data.typeTransaction === 'debited') {
      const history = await getTransactions({ date: (data.date ? data.date : undefined), debited: true }, token);

      if (history.data) {
        setHistory(history.data);
      } else {
        setHistory('Nenhuma transação encontrada');
      }
    } else {
      const history = await getTransactions({ date: (data.date ? data.date : undefined) }, token);

      if (history.data) {
        setHistory(history.data);
      } else {
        setHistory('Nenhuma transação encontrada');
      }
    }
  };

  return (
    <div className="h-auto w-full flex flex-col items-center">
      <NavBar buttonText={logon ? 'Logout' : 'Login'} />

      <form onSubmit={onSubmit} className="mt-10 flex justify-evenly items-center w-2/3 h-[80px] font-bold text-xl bg-zinc-100">
        <label
          htmlFor="typeTransaction"
          className="flex items-center gap-3"
        >
          Tipo
          <select
            className="rounded h-9 w-full drop-shadow-lg font-normal text-base bg-white px-3"
            name="typeTransaction"
            id="typeTransaction"
          >
            <option value="all">Todos</option>
            <option value="credited">Entradas</option>
            <option value="debited">Saídas</option>
          </select>
        </label>

        <label
          htmlFor="date"
          className="flex items-center gap-3"
        >
          Data
          <input
            id="date"
            className="rounded h-9 w-full drop-shadow-lg font-normal text-base p-3"
            name="date"
            type="date"
          />
        </label>

        <button
          className="bg-green-500 h-1/2 w-1/6 rounded-lg text-xl font-bold hover:bg-green-400"
          type="submit"
        >
          Filtrar
        </button>

        <button
          onClick={() => navigate('/')}
          className="bg-red-500 h-1/2 w-1/6 rounded-lg text-xl font-bold hover:bg-red-400"
          type="button"
        >
          Voltar
        </button>
      </form>

      <div className="bg-zinc-200 drop-shadow-2xl h-full w-2/3 py-10 flex justify-center mb-16">
        <History text="Transações" slice={0} />
      </div>
    </div>
  );
}

export default Transactions;
