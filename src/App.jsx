import React from 'react'
import './App.css'
import '@ant-design/v5-patch-for-react-19';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import Login from './pages/Login/Login';
import store from './app/store';
import MainLayout from './layouts/MainLayout';
const PublicRoute = ({ component }) => {
  console.log(localStorage.getItem("token"))
  const token = localStorage.getItem("token");
  console.log(token)
  return !token ? component : <Navigate to="/login" />;
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
          <Routes>
            
            <Route path="/" element={<Navigate to="/login" />} />

            <Route
              path="/login"
              element={<Login  />}
            />
            <Route
              path="/mainLayout"
              element={<MainLayout  />}
            />
          </Routes>
        </Router>
        </Provider>
    </>
  )
}

export default App
