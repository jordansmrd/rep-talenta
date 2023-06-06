import { Box, Center, Flex, Input, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';

export default function ForgotPassword() {
 const location = useLocation();
 const [user, setUser] = useState({});
 const [token, setToken] = useState();

 async function fetchUser(token) {
  await axios
   .get('http://localhost:2000/auth/v3', {
    headers: {
     Authorization: `Bearer ${token}`
    }
   })
   .then((res) => {
    console.log(res.data);
    setUser(res.data);
   })
   .catch((err) => console.log(err));
 }

 async function changePassword() {
  console.log(token);

  await axios
   .patch(
    'http://localhost:2000/auth/v4',
    {
     user
    },
    {
     headers: {
      Authorization: `Bearer ${token}`
     }
    }
   )
   .then((res) => {
    console.log(res.data);
    // window.location.reload(false);
    nav('/login');
   });
 }

 useEffect(() => {
  console.log(location);
  const token2 = location.pathname.split('/')[2]; // ini variable sementara untuk nampung
  fetchUser(token2);
  setToken(token2);
 }, []);

 const dispatch = useDispatch();

 const nav = useNavigate();

 const inptHandler = (e) => {
  const { id, value } = e.target;
  const tempUser = { ...user };
  tempUser[id] = value;
  setUser(tempUser);
  console.log(tempUser);
 };

 return (
  <>
   {user.id ? (
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
        Forgot Password
       </Box>

       <Box>
        <Box fontWeight={'500'} paddingBottom={'10px'}>
         {' '}
         New Password
        </Box>
        <Input type="password" id="password" onChange={inptHandler}></Input>
       </Box>

       <Button
        marginTop={'25px'}
        bgColor="#035EBF"
        color={'white'}
        w="100%"
        onClick={changePassword}
       >
        Change Password
       </Button>
       {/* </Link> */}
      </Flex>
     </Center>
    </Box>
   ) : (
    <Center h="100vh">
     <h1> Link has Expired </h1>
    </Center>
   )}
  </>
 );
}

export function RequestForgotPassword() {
 const [email, setEmail] = useState('');
 const nav = useNavigate();

 async function forgotPassword() {
  await axios
   .get('http://localhost:2000/auth/generate-token/email', {
    params: {
     email
    }
   })
   .then(
    (res) => alert(res.data.message)
    // /forgot-password/token
    //    console.log(res.data));
   );
 }
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
     <Box fontWeight={'500'} fontSize={'20px'} fontFamily={'sans-serif'}>
      Request Forgot Password
     </Box>

     <Box>
      <Box fontWeight={'500'} paddingBottom={'10px'}>
       {' '}
       Email
      </Box>
      <Input
       id="email"
       onChange={(e) => {
        setEmail(e.target.value);
       }}
      ></Input>
     </Box>

     <Button
      marginTop={'25px'}
      bgColor="#035EBF"
      color={'white'}
      w="100%"
      onClick={forgotPassword}
     >
      Forgot Password
     </Button>
     {/* </Link> */}
    </Flex>
   </Center>
  </Box>
 );
}
