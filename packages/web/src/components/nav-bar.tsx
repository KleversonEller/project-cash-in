import { useNavigate } from 'react-router-dom';

import logo from '../images/ng-logo.svg';
import useStore from '../store';

type NavBarProps = {
    buttonText: string;
};

function NavBar(props: NavBarProps) {
  const navigate = useNavigate();
  const setLogon = useStore((set) => set.setLogon);
  const setToken = useStore((set) => set.setToken);
  const setHistory = useStore((set) => set.setHistory);
  const { buttonText } = props;

  const handleClick = () => {
    if (buttonText === 'Login') {
      navigate('/login');
    } else {
      setLogon(false);
      setToken('token');
      setHistory('Você não possui nenhuma transação !');
      navigate('/');
    }
  };

  return (
    <div className="flex justify-between items-center bg-zinc-500/50 w-full h-20 px-10">
      <img className="h-20 w-50" src={logo} alt="Logo ng.cash" />

      <button
        type="button"
        onClick={handleClick}
        className="bg-zinc-900 h-3/5 w-1/5 rounded-lg text-white text-xl font-bold hover:bg-zinc-700"
      >
        {buttonText}
      </button>
    </div>
  );
}

export default NavBar;
