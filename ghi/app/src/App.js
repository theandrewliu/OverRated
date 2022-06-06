import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import './index.css';
import Logout from './Logout';
import LoginForm from './Profiles/LoginForm';
import SignupForm from './Profiles/SignupForm';
// import Users from './Profiles/Users';
import MatchesList from './Profiles/MatchesList';
import ConnectionList from './Profiles/ConnectionsList';
import MainPage from './MainPage';
import MyProfile  from './Profiles/CurtisFakeDetailView';
import { useToken } from './authApi';

function App() {
  const [token, login, logout, signup] = useToken();
  console.log('token:', token);

  return (
    <BrowserRouter>
    <div className="navColor">
    <Nav token={token} />
    </div>
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="logout" element={<Logout logout={logout} />} />

          {/* <Route path="users">
          <Route index element={<UsersForm />} />
          <Route path="history" element={<UsersList />} />
          </Route> */}

          <Route path="login">
            <Route index element={<LoginForm token={token} login={login} />} />
            <Route path="new" element={<SignupForm token={token} signup={signup} />} />
          </Route>

          <Route path="matches">
            <Route index element={<MatchesList />} />
            <Route path="connections" element={<ConnectionList />} />
          </Route>

          <Route path="/my_profile" element={<MyProfile token={token} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
