import {
 Box,
 Center,
 Flex,
 Input,
 Button,
 Textarea,
 Select
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
export default function Register() {
 const [user, setUser] = useState({
  email: '',
  name: '',
  password: '',
  CompanyId: 0,
  address: ''
 });

 const [companies, setCompanies] = useState([]);

 const inptHandler = (e) => {
  const { id, value } = e.target;
  const tempUser = { ...user };
  tempUser[id] = value;
  setUser(tempUser);
  console.log(tempUser);
 };

 useEffect(() => {
  async function getCompany() {
   const res = await axios.get('http://localhost:2000/auth/companies');
   console.log(res.data);
   setCompanies(res.data);
  }
  getCompany();
 }, []);

 const register = async () => {
  const result = await axios.post('http://localhost:2000/auth', user);
  return alert(result.data.message);
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
      Daftar Absensi
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

     <Box>
      <Box fontWeight={'500'} paddingBottom={'10px'}>
       Nama
      </Box>
      <Input id="name" onChange={inptHandler}></Input>
     </Box>

     <Box>
      <Box fontWeight={'500'} paddingBottom={'10px'}>
       Address
      </Box>
      <Textarea id="address" onChange={inptHandler}></Textarea>
     </Box>

     <Select id="CompanyId" onChange={inptHandler} placeholder="Pilih Company">
      {companies.map((val) => (
       <option key={val.id} value={val.id}>
        {val.name}
       </option>
      ))}
     </Select>

     <Button
      marginTop={'20px'}
      bgColor="#035EBF"
      color={'white'}
      onClick={register}
     >
      Register
     </Button>

     <Link to="/login">
      <Center fontWeight={'500'}>Have an account? Sign in</Center>
     </Link>
    </Flex>
   </Center>
  </Box>
 );
}
