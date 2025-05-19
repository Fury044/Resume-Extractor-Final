import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Upload from './pages/Upload';
import Loading from './pages/Loading';
import Results from './pages/Results';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Upload />} />
          <Route path="loading" element={<Loading />} />
          <Route path="results" element={<Results />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App; 