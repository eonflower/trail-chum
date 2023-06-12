import React, { useState, useContext } from 'react'
import { Routes, Route, Navigate} from 'react-router-dom'
import { UserContext } from './context/UserProvider'
import ProtectedRoute from './components/ProtectedRoute'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Post from './pages/Post'
import Nav from './components/NavBar'
import Trails from './pages/Trails'
import TrailNotes from './pages/TrailNotes'

import './App.css'
import NoteList from './components/notes/NoteList'
import SoloLog from './pages/SoloLog'



function App() {
  const { token, logout } = useContext(UserContext);

  return (
    <div className='app'>
      {token && <Nav logout={logout} />}
      <Routes>
        <Route
          path='/'
          element={token ? <Navigate to='/home' /> : <Auth />}
        />
        <Route
          path='/home'
          element={
            <ProtectedRoute token={token} redirectTo='/'>
              <Home />
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
          path='/trails/:id/notes'
          element={
            <ProtectedRoute token={token} redirectTo='/'>
              <TrailNotes />
            </ProtectedRoute>
          }
        />
        <Route
          path='/notes/:id/'
          element={
            <ProtectedRoute token={token} redirectTo='/'>
              <SoloLog />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
