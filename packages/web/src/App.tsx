import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/home';
import NotFound from './pages/not-found';
import Login from './pages/login';
import NewUser from './pages/new-user';
import NewTransaction from './pages/new-transaction';
import Transactions from './pages/transactions';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/newUser" element={<NewUser />} />
        <Route path="/newTransaction" element={<NewTransaction />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
