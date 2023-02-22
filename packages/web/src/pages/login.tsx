/* eslint-disable no-use-before-define */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { ILogin } from '../interfaces/login-interface';

import useStore from '../store';
import { login } from '../services/api-ng';
import SubmitForm from '../utils/submit-forms';

function Login() {
  const [inputValid, setInputValid] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<string | undefined>();
  const navigate = useNavigate();
  const setLogon = useStore((set) => set.setLogon);
  const setToken = useStore((set) => set.setToken);

  const handleClickCancel = () => {
    navigate('/');
  };

  const handleLogin = async () => {
    const user = await login(values as ILogin);

    if (user?.data) {
      setToken(user.data.token);
      setLogon(true);
      navigate('/');
    } else {
      setMessageError(user as unknown as string);
      setInputValid(true);
    }
  };

  const { onChange, onSubmit, values } = SubmitForm(handleLogin, {} as ILogin);

  return (
    <div className="p-0 flex items-center justify-center h-screen bg-zinc-500/50 sm:p-10">

      <form onSubmit={onSubmit} className="bg-zinc-200 flex flex-col justify-evenly items-center drop-shadow-2xl rounded h-screen w-screen gap-4 sm:h-4/5 sm:w-2/3">
        <div className="flex flex-col gap-4 font-bold text-2xl w-3/5">
          <label htmlFor="username">
            Login
            <input
              name="username"
              onChange={onChange}
              className="rounded h-9 w-full drop-shadow-lg p-6 font-normal text-lg"
              type="text"
            />
          </label>
        </div>

        <div className="flex flex-col gap-4 font-bold text-2xl w-3/5">
          <label htmlFor="password">
            Senha
            <input
              name="password"
              onChange={onChange}
              className="rounded h-9 w-full drop-shadow-lg p-6"
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
            Entrar
          </button>
        </div>
      </form>

    </div>
  );
}

export default Login;
