import NavBar from '../components/nav-bar';
import useStore from '../store';
import AccountUser from '../components/account-user';
import CreateUser from '../components/create-user';

function Home() {
  const logon = useStore((set) => set.logon);

  return (
    <div className="flex flex-col items-center h-screen">
      <NavBar buttonText={logon ? 'Logout' : 'Login'} />

      <div className="flex items-center justify-center h-full w-full">
        {logon ? <AccountUser /> : <CreateUser />}
      </div>
    </div>
  );
}

export default Home;
