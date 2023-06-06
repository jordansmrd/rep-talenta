import { Box, Center } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

export default function Footer() {
 const nav = useNavigate();

 async function logout() {
  localStorage.removeItem('auth');
  nav('/login');
 }

 return (
  <>
   <Center
    position={'fixed'}
    bottom={'0'}
    w="100%"
    zIndex={2}
    fontSize={'14px'}
   >
    <Center
     h="70px"
     w="100vw"
     bgColor={'#BF2935'}
     justifyContent={'space-between'}
     padding={'10px'}
     color="white"
     fontWeight={'500'}
     maxW="768px"
    >
     <Link to="/">
      <Box>DASHBOARD</Box>
     </Link>
     <Link to="/attendance-log">
      <Box>ATTENDANCE LOG</Box>
     </Link>

     <Box onClick={logout}>LOG OUT</Box>
    </Center>
   </Center>
  </>
 );
}
