import client from './apolloClient';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthenticationContext";
import ProtectedRoute from "./components/ProtectedRoute.js";
import Sidebar from "./components/Sidebar";
import Login from "./components/LoginForm";
import Signup from "./components/SignupForm";
import Overview from "./pages/Overview";
import Dashboard from "./pages/Dashboard";
import Gallery from "./pages/Gallery";
import Chat from "./pages/Chat";

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Router>
          <Sidebar />
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/management" element={<Dashboard />} />
            <Route 
              path="/chat" 
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              } 
            />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
