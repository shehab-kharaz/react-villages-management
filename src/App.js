import Sidebar from './components/Sidebar';
import Overview from './pages/Overview';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Gallery from './pages/Gallery';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>  
      <Sidebar />
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/management" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </>
  );
}

export default App;
