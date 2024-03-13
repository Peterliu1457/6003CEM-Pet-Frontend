import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignupPage from './authpages/SignUp';
import SignInPage from './authpages/SignIn';
import axios from 'axios';
import CharityDashboard from './charitypages/CharityDashboard';
import UploadDogPage from './charitypages/UploadDog';
import PrivateRoute from './components/PrivateRoute';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
function App() {
  return (
    <Routes>
      <Route path='/auth/sign-in' element={<SignInPage />}/>
      <Route path='/auth/sign-up' element={<SignupPage />}/>
      <Route path='/charity' element={
        <PrivateRoute>
          <CharityDashboard/>
        </PrivateRoute>
      }>
        <Route path='upload-dog' element={<UploadDogPage />} />
      </Route>
    </Routes>
  );
}

export default App;
