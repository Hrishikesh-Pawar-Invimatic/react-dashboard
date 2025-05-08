import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { LoadingProvider } from './context/LoadingContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import DragDrop from './pages/DragDrop';
import InfiniteScroll from './pages/InfiniteScroll';
import { theme } from './styles/theme';

const App: React.FC = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <LoadingProvider>
        <Router>
          <ThemeProvider>
            <AuthProvider>
              <CssBaseline />
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="/home" replace />} />
                    <Route path="home" element={<Home />} />
                    <Route path="drag-drop" element={<DragDrop />} />
                    <Route path="infinite-scroll" element={<InfiniteScroll />} />
                  </Route>
                </Routes>
              </Suspense>
            </AuthProvider>
          </ThemeProvider>
        </Router>
      </LoadingProvider>
    </MuiThemeProvider>
  );
};

export default App;
