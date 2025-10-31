import React, { lazy, Suspense } from 'react'
import './App.css'
import '@ant-design/v5-patch-for-react-19';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
const Login = lazy(() => import('./pages/Login/Login'));
const MainLayout = lazy(() => import('./layouts/MainLayout'));
import store from './app/store';
const PublicRoute = ({ component }) => {
  const token = localStorage.getItem("token");
  return !token ? component : <Navigate to="/mainLayout" />;
};

const ProtectedRoute = ({ component }) => {
  const token = localStorage.getItem("token");  
  return token ? component : <Navigate to="/" />;
};
function App() {
  return (
    <>
    <Provider store={store}>
     <Router>
         <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route
              path="/login"
              element={<PublicRoute component={<Login/>}/>}
            />
            <Route
              path="/mainLayout"
              element={<ProtectedRoute component={<MainLayout />} />}
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
         </Suspense>
        </Router>
        </Provider>
    </>
  )
}

export default App
