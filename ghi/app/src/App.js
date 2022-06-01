import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import MainPage from './MainPage';
import './index.css';
import LoginForm from './Profiles/LoginForm';
import SignupForm from './Profiles/SignupForm';
import Users from './Profiles/Users';

function App() {
  return (
    <BrowserRouter>
    <div className="navColor">
    <Nav />
    </div>
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />

          <Route path="users" element={<Users />}></Route>

          <Route path="login">
            <Route index element={<LoginForm />} />
            <Route path="new" element={<SignupForm />} />
          </Route> 

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
