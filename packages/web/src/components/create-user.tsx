import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const navigate = useNavigate();

  return (
    <div className="my-16 p-10 h-3/4 w-3/4 flex flex-col items-center justify-around drop-shadow-2xl rounded">
      <p
        className="text-center text-2xl font-bold"
      >
        Para começar a utilizar a pagina crie um usuário, caso já tenha um usuário cadastrado basta apenas fazer login !!

      </p>

      <button
        type="button"
        onClick={() => { navigate('/newUser'); }}
        className="bg-green-500 h-28 w-44 rounded-lg text-2xl font-bold hover:bg-green-400"
      >
        Criar usuário
      </button>
    </div>
  );
}

export default CreateUser;
