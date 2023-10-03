import React, { useContext } from 'react'
import { Routes, Route, Navigate} from 'react-router-dom'
import { UserContext } from './context/UserProvider'
import ProtectedRoute from './components/ProtectedRoute'
import Auth from './pages/Auth'
import Account from './pages/AccountSettings'
import Logs from './pages/Logs'
import Post from './pages/Post'
import Nav from './components/NavBar'
import Trails from './pages/Trails'
import TrailLogs from './pages/TrailLogs'

import './App.css'
import SoloLog from './pages/SoloLog'
import Footer from './components/Footer'



function App() {
  const { token, logout } = useContext(UserContext);

  return (
    <div className='app'>
      {token && <Nav logout={logout} />}
      <Routes>
        <Route
          path='/'
          element={token ? <Navigate to='/trails' /> : <Auth />}
        />
        <Route
          path='/logs'
          element={
            <ProtectedRoute token={token} redirectTo='/'>
              <Logs />
            </ProtectedRoute>
          }
        />
        <Route
          path='/post'
          element={
            <ProtectedRoute token={token} redirectTo='/'>
              <Post />
            </ProtectedRoute>
          }
        />
        <Route
          path='/trails'
          element={
            <ProtectedRoute token={token} redirectTo='/'>
              <Trails />
            </ProtectedRoute>
          }
        />
        <Route
          path='/account'
          element={
            <ProtectedRoute token={token} redirectTo='/'>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route
          path='/trails/:id/logs'
          element={
            <ProtectedRoute token={token} redirectTo='/'>
              <TrailLogs />
            </ProtectedRoute>
          }
        />
        <Route
          path='/logs/:id/'
          element={
            <ProtectedRoute token={token} redirectTo='/'>
              <SoloLog />
            </ProtectedRoute>
          }
        />
      </Routes>
      {token && <Footer />}
    </div>
  );
}

export default App;
