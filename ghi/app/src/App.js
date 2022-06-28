import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Nav from './Nav';
import './CSS/index.css';
import Logout from './Accounts/Logout';
import LoginForm from './Accounts/LoginForm';
import SignupForm from './Accounts/SignupForm';
import ConnectionList from './Connections/ConnectionsList';
import ConnectionsDetail from './Connections/ConnectionsDetail';
import MainPage from './MainPage';
import { useToken } from './authApi';
import ProfileForm from './Profiles/ProfileForm';
import ProfileDetail from './Profiles/ProfileDetail';
import AccountForm from './Accounts/AccountForm';
import ReviewForm from './Ratings/RatingForm';
import Explore from './Connections/Explorepg';
import ProfileCreation from './Profiles/ProfileCreation';
import MessageList from './Chat/MessageList';
import MessageDetail from './Chat/MessageDetail'

function App() {
  const [token, login, logout, signup] = useToken();
  console.log('token:', token);

  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, '');
  return (
    <BrowserRouter basename={basename}>
    <div className="navColor">
    <Nav token={token} />
    </div>
        <Routes>

          <Route path="/" element={<MainPage />} />
          <Route path="/messages" element={<MessageList />} />
          <Route path="/messages/:id" element={<MessageDetail />} />
          <Route path="/logout" element={<Logout logout={logout} />} />
          <Route path="/reviews" element={<ReviewForm />} />
          <Route path="/my_profile" element={<ProfileDetail token={token}/>} />
          <Route path="/random" element={<Explore token={token} />} />
          <Route path="/my-matches" element={<ConnectionList token={token} />} />
          <Route path="/profiles/:id" element={<ConnectionsDetail token={token} />} />


        <Route path="/my_profile">
          <Route index element={<ProfileDetail token={token}/>} />
          <Route path="/my_profile/account" element={<AccountForm token={token} />} />
        </Route>

          <Route path="/login">
            <Route index element={<LoginForm token={token} login={login} />} />
            <Route path="/login/new" element={<SignupForm token={token} signup={signup} />} />
          </Route>

          <Route path="/profiles">
            <Route index element={<ProfileCreation />} />
            <Route path="/profiles/myself" element={<ProfileForm token={token}/>} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
