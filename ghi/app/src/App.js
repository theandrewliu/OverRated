import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import MainPage from './MainPage';
import './index.css';
import LoginForm from './Profiles/LoginForm';
import SignupForm from './Profiles/SignupForm';
// import Users from './Profiles/Users';
import MatchesList from './Profiles/MatchesList';
import ConnectionList from './Profiles/ConnectionsList';

function App() {
  return (
    <BrowserRouter>
    <div className="navColor">
    <Nav />
    </div>
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />

          {/* <Route path="users">
          <Route index element={<UsersForm />} />
          <Route path="history" element={<UsersList />} />
          </Route> */}

          <Route path="login">
            <Route index element={<LoginForm />} />
            <Route path="new" element={<SignupForm />} />
          </Route> 

          <Route path="matches">
            <Route index element={<MatchesList />} />
            <Route path="history" element={<ConnectionList />} />
          </Route> 

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
