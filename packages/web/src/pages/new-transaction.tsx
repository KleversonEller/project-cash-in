/* eslint-disable no-alert */
/* eslint-disable no-use-before-define */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { INewTransaction } from '../interfaces/new-transaction-interface';

import NavBar from '../components/nav-bar';
import { setNewTransaction } from '../services/api-ng';
import useStore from '../store';
import SubmitForm from '../utils/submit-forms';

function NewTransaction() {
  const navigate = useNavigate();
  const [inputValid, setInputValid] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<string | undefined>();
  const logon = useStore((set) => set.logon);
  const token = useStore((set) => set.token);

  const handleClickCancel = () => {
    navigate('/');
  };

  const handleFinish = async () => {
    const transaction = await setNewTransaction({
      ...values,
      value: Number(values.value),
    } as INewTransaction, token);

    if (transaction?.data) {
      alert(transaction.data.message);
      navigate('/');
    } else {
      setMessageError(transaction as unknown as string);
      setInputValid(true);
    }
  };

  const { onChange, onSubmit, values } = SubmitForm(handleFinish, {} as INewTransaction);

  return (
    <div className="h-screen w-screen">
      <NavBar buttonText={logon ? 'Logout' : 'Login'} />

      <div className="p-10 flex items-center justify-center h-5/6 w-full">

        <form
          onSubmit={onSubmit}
          className="bg-zinc-200 flex flex-col justify-evenly drop-shadow-2xl rounded h-full w-2/3"
        >
          <div className="w-full h-1/2 flex items-center justify-evenly">
            <div className="flex flex-col gap-4 justify-center font-bold text-2xl w-3/5">
              <label htmlFor="username">
                Para quem quer transferir ?
                <input
                  onChange={onChange}
                  placeholder="Ex: Maria Eduarda"
                  name="username"
                  className="rounded h-9 w-full drop-shadow-lg p-6 font-normal text-lg"
                  type="text"
                />
              </label>
            </div>

            <div className="flex flex-col gap-4 justify-center w-1/6 font-bold text-2xl">
              <label htmlFor="value">
                Valor
                <input
                  onChange={onChange}
                  placeholder="Ex: 55,50"
                  name="value"
                  step="0.01"
                  min="0"
                  className="rounded h-9 w-full drop-shadow-lg p-6 font-normal text-lg"
                  type="number"
                />
              </label>
            </div>
          </div>

          {inputValid && <span className="text-red-500 text-lg text-center">{messageError}</span>}

          <div className="w-full h-1/4 flex justify-evenly">
            <button
              onClick={handleClickCancel}
              type="button"
              className="bg-red-500 h-1/2 w-1/3 rounded-lg text-xl font-bold hover:bg-red-400"
            >
              Cancelar
            </button>

            <button
              name="entrar"
              className="bg-green-500 h-1/2 w-1/3 rounded-lg text-xl font-bold hover:bg-green-400"
              type="submit"
            >
              Finalizar
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default NewTransaction;
