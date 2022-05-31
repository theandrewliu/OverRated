import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
