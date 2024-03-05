import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import '@mantine/core/styles.css';
import './App.css';

import PlayerPage from './pages/PlayerPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlayerPage />} />
      </Routes>
    </Router>
  );
}
