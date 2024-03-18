import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignupPage from './authpages/SignUp';
import SignInPage from './authpages/SignIn';
import axios from 'axios';
import CharityDashboard from './charitypages/CharityDashboard';
import UploadDogPage from './charitypages/UploadDog';
import PrivateRoute from './components/PrivateRoute';
import { DogsList } from './charitypages/DogsList';
import Applications from './charitypages/Applications';
import EditDog from './charitypages/EditDog';

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
        <Route path='' index element={<Navigate to='dogs'/>} />
        <Route path='applications' element={<Applications />} />
        <Route path='dogs' element={<DogsList />} />
        <Route path='dogs/:dogId' element={<EditDog />}/>
        <Route path='upload-dog' element={<UploadDogPage />} />
      </Route>
    </Routes>
  );
}

export default App;
