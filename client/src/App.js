import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AttendanceLog from './components/AttendanceLog';
import Login from './components/Login';
import Register from './components/Register';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Center, Spinner } from '@chakra-ui/react';
import ForgotPassword, {
 RequestForgotPassword
} from './components/ForgotPassword';
import axios from 'axios';

function App() {
 const dispatch = useDispatch();
 const [isLoading, setIsLoading] = useState(true);

 async function getUser() {
  try {
   const token = JSON.parse(localStorage.getItem('auth'));

   const user = await axios.get('http://localhost:2000/auth/v3', {
    headers: {
     Authorization: `Bearer ${token}`
    }
   });

   console.log(user);
   if (user) {
    await dispatch({
     type: 'login',
     payload: user.data
    });
   }
   console.log(user);
  } catch (err) {
   console.log(err);
  }
 }

 useEffect(() => {
  getUser();
  new Promise((resolve) => {
   setTimeout(() => {
    resolve(setIsLoading(false));
   }, 1000);
  });
 }, []);

 return (
  <>
   {isLoading ? (
    <Center h="100vh">
     <Spinner />
    </Center>
   ) : (
    <Routes>
     <Route path="/" key="dashboard" element={<Dashboard />}></Route>
     <Route
      path="/attendance-log"
      key="attendance-log"
      element={<AttendanceLog />}
     ></Route>

     <Route path="/login" key="login" element={<Login />}></Route>
     <Route path="/register" key="register" element={<Register />}></Route>

     <Route
      path="/forgot-password"
      key="request-forgot-password"
      element={<RequestForgotPassword />}
     ></Route>

     <Route
      path="/forgot-password/:token"
      key="forgot-password"
      element={<ForgotPassword />}
     ></Route>

     {/* <Route></Route>
     <Route></Route>
     <Route></Route> */}
    </Routes>
   )}
  </>
 );
}

export default App;
