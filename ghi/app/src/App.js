import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import './index.css';
import Logout from './Logout';
import LoginForm from './Profiles/LoginForm';
import SignupForm from './Profiles/SignupForm';
import ConnectionList from './Profiles/ConnectionsList';
import ConnectionsDetail from './Profiles/ConnectionsDetail';
import MainPage from './MainPage';
import { useToken } from './authApi';
import ProfileForm from './Profiles/ProfileForm';
import ProfileDetail from './Profiles/ProfileDetail';
import AccountForm from './Profiles/AccountForm';
import ReviewForm from './Profiles/ReviewForm';
import ReviewList from './Profiles/ReviewList';
import Explore from './Profiles/Explorepg';
import ProfileCreation from './Profiles/ProfileCreation';
import MessageList from './Profiles/MessageList';

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
          <Route path="/messages" element={<MessageList />} />
          <Route path="/logout" element={<Logout logout={logout} />} />
          <Route path="/reviews" element={<ReviewForm />} />
          <Route path="/api/my_profile" element={<ProfileDetail token={token}/>} />
          <Route path="/api/random" element={<Explore token={token} />} />
          <Route path="/api/my-matches" element={<ConnectionList token={token} />} />
          <Route path="/api/profiles/:id" element={<ConnectionsDetail token={token} />} />
          
          <Route path="/api/accounts/myself" element={<AccountForm token={token} />} />

        <Route path="/my_profile"> 
          <Route index element={<ProfileDetail token={token}/>} />
          <Route path="/my_profile/account" element={<AccountForm token={token} />} />
          <Route path="/my_profile/reviews" element={<ReviewList />} />
        </Route>

          <Route path="/login">
            <Route index element={<LoginForm token={token} login={login} />} />
            <Route path="/login/new" element={<SignupForm token={token} signup={signup} />} />
          </Route>

          <Route path="/api/profiles">
            <Route index element={<ProfileCreation />} />
            <Route path="/api/profiles/myself" element={<ProfileForm token={token}/>} />
          </Route>



        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
