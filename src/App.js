import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import AuthProvider from './components/AuthProvider';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import theme from './theme';
import Navbar from './components/Navbar';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <AuthProvider>
          <Router>
            <Flex direction="column" minH="100vh">
              <Navbar />
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Flex>
          </Router>
        </AuthProvider>
      </Provider>
    </ChakraProvider>
  );
}

export default App;