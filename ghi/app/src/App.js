import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import './index.css';
import Logout from './Logout';
import LoginForm from './Profiles/LoginForm';
import SignupForm from './Profiles/SignupForm';
import Chat from './Profiles/Chat';
import MatchesList from './Profiles/MatchesList';
import ConnectionList from './Profiles/ConnectionsList';
import MainPage from './MainPage';
import { useToken } from './authApi';
import ProfileForm from './Profiles/ProfileForm';
import ProfileDetail from './Profiles/ProfileDetail';

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
          <Route path="/chat" element={<Chat />} />
          <Route path="/logout" element={<Logout logout={logout} />} />
          <Route path="/my_profile" element={<ProfileDetail token={token}/>} />


          <Route path="/login">
            <Route index element={<LoginForm token={token} login={login} />} />
            <Route path="/login/new" element={<SignupForm token={token} signup={signup} />} />
          </Route>

          <Route path="/update">
            <Route index element={<ProfileForm />} />
            <Route path="/update/my_profile" element={<ProfileDetail token={token}/>} />
          </Route>

          <Route path="/matches">
            <Route index element={<MatchesList />} />
            <Route path="/matches/connections" element={<ConnectionList />} />
          </Route>


        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
