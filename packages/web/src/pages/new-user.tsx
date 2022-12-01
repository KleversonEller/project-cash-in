/* eslint-disable no-alert */
/* eslint-disable no-use-before-define */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SubmitForm from '../utils/submit-forms';
import { setNewUser } from '../services/api-ng';

import type { ILogin } from '../interfaces/login-interface';

function NewUser() {
  const [inputValid, setInputValid] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<string | undefined>();
  const navigate = useNavigate();

  const handleClickCancel = () => {
    navigate('/');
  };

  const handleSave = async () => {
    const newUser = await setNewUser(values as ILogin);

    if (newUser?.data) {
      alert(newUser.data.message);
      navigate('/login');
    } else {
      setMessageError(newUser as unknown as string);
      setInputValid(true);
    }
  };

  const { onChange, onSubmit, values } = SubmitForm(handleSave, {} as ILogin);

  return (
    <div className="p-10 flex items-center justify-center h-screen bg-zinc-500/50">
      <form
        onSubmit={onSubmit}
        className="bg-zinc-200 flex flex-col justify-evenly items-center drop-shadow-2xl rounded h-4/5 w-2/3 gap-4"
      >
        <div className="flex flex-col gap-4 font-bold text-2xl w-3/5">
          <label htmlFor="username">
            *Nome de Usuário
            <input
              placeholder="Ex: Maria Eduarda"
              name="username"
              onChange={onChange}
              className="rounded h-9 w-full drop-shadow-lg p-6 font-normal text-lg"
              type="text"
            />
          </label>
        </div>

        <div className="flex flex-col gap-4 font-bold text-2xl w-3/5">
          <label htmlFor="password">
            *Senha
            <input
              placeholder="Mínimo de 8 caracteres, 1 maiúscula e 1 numero"
              name="password"
              onChange={onChange}
              className="rounded h-9 w-full drop-shadow-lg p-6 font-normal text-lg"
              type="password"
            />
          </label>
        </div>

        {inputValid && <span className="text-red-500 text-lg text-center">{messageError}</span>}

        <div className="w-3/5 h-24 flex justify-evenly">
          <button
            onClick={handleClickCancel}
            type="button"
            className="bg-red-500 h-3/5 w-2/5 rounded-lg text-xl font-bold hover:bg-red-400"
          >
            Cancelar
          </button>

          <button
            name="entrar"
            className="bg-green-500 h-3/5 w-2/5 rounded-lg text-xl font-bold hover:bg-green-400"
            type="submit"
          >
            Criar
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewUser;
