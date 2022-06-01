import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import MainPage from './MainPage';
import './index.css';

function App() {
  return (
    <BrowserRouter>
    <div className="navColor">
    <Nav />
    </div>
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/profile" element={() => <Profile authorized={true}/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;