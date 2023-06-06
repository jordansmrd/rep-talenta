import { Box, Center, Flex, Input, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';

export default function Login() {
 const dispatch = useDispatch();
 const [user, setUser] = useState({
  email: '',
  password: ''
 });

 const nav = useNavigate();

 const inptHandler = (e) => {
  const { id, value } = e.target;
  const tempUser = { ...user };
  tempUser[id] = value;
  setUser(tempUser);
  console.log(tempUser);
 };

 const login = async () => {
  let token;
  await axios
   .post('http://localhost:2000/auth/v2', user)
   .then((res) => {
    localStorage.setItem('auth', JSON.stringify(res.data.token));

    token = res.data.token;
   })
   .catch((err) => alert('email/password salah'));

  //   console.log(token);

  //get user berdasarkan token

  await axios
   .get('http://localhost:2000/auth/v3', {
    headers: {
     Authorization: `Bearer ${token}`
    }
    // params : {
    //     token
    // }
   })
   .then(async (res) => {
    await dispatch({
     type: 'login',
     payload: res.data
    });
    nav('/');

    // console.log(res.data);
   });

  //   console.log(result.data);
  //   alert(result.data.message);
  //   if (result.data.message) {
  //   }
  return;
 };

 return (
  <Box w="100vw" h="100vh" bgColor={'#F2F4F7'}>
   <Center w="100%" h="100%">
    <Flex
     bgColor={'white'}
     w="300px"
     flexDir={'column'}
     padding="20px"
     gap="10px"
     borderRadius={'10px'}
    >
     <Box fontWeight={'500'} fontSize={'30px'} fontFamily={'sans-serif'}>
      Absensi
     </Box>
     <Box>
      <Box fontWeight={'500'} paddingBottom={'10px'}>
       Email
      </Box>
      <Input id="email" onChange={inptHandler}></Input>
     </Box>
     <Box>
      <Box fontWeight={'500'} paddingBottom={'10px'}>
       {' '}
       Password
      </Box>
      <Input type="password" id="password" onChange={inptHandler}></Input>
     </Box>
     {/* <Link to="/"> */}
     <Button
      marginTop={'25px'}
      bgColor="#035EBF"
      color={'white'}
      w="100%"
      onClick={login}
     >
      Sign In
     </Button>
     {/* </Link> */}

     <Link to="/register">
      <Center>don't have an account? register</Center>
     </Link>
    </Flex>
   </Center>
  </Box>
 );
}
