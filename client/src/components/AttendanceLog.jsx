import { Box, Center, Flex, Input } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import Footer from './Footer';
import moment from 'moment';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Attendance() {
 const userSelector = useSelector((state) => state.auth);
 const nav = useNavigate();
 const [data, setData] = useState([]);
 async function getAttendances(e) {
  if (!userSelector.id) {
   return nav('/login');
  }
  await axios
   .post('http://localhost:2000/attendances', {
    month: e ? e.target.value.split('-')[1] : moment().format('MM'),
    year: e ? e.target.value.split('-')[0] : moment().format('yyyy'),
    UserId: userSelector.id
   })
   .then((res) => setData(res.data.value));
 }

 useEffect(() => {
  getAttendances();
 }, []);
 return (
  <Flex h="100vh" alignItems={'center'} flexDir={'column'}>
   <Center
    color={'white'}
    bgColor={'#BF2935'}
    // h="40px"
    padding={'20px'}
    fontWeight={'500'}
    w="100%"
    maxW="768px"
   >
    Attendance Log
   </Center>

   <Flex
    maxW="768px"
    h="100%"
    flexDirection={'column'}
    w="100%"
    padding={'10px'}
   >
    <Input
     width="100%"
     type="month"
     defaultValue={moment().format('yyyy-MM')}
     fontWeight={'500'}
     onChange={getAttendances}
    ></Input>

    {data.map((val, idx) => (
     <Center
      justifyContent={'space-between'}
      borderBottom={'1px solid rgba(0, 0, 0, 0.1)'}
      padding={'20px'}
      key={'log_' + idx}
     >
      <Box fontWeight={'bold'}>{moment(val.createdAt).format('DD MMMM')}</Box>
      <Box fontWeight={500}>{val.clock_in}</Box>
      <Box fontWeight={500}>{val.clock_out}</Box>
      <AddIcon fontSize={'8px'} />
     </Center>
    ))}
   </Flex>
   <Footer />
  </Flex>
 );
}

// tanggal,user sebagai where untuk cek di table database
// create
// update
// att = db.Attendance.findOne({
//     where : {
//         create = req.date ,
//         user = req.user
//     }
// })
// att ?
// db.Attendance.update({
//     where :
// })
// :
// db.Attendance.create

// id,in ,out, userid, createdAt,updatedAt
//  createdAt = tgl clockin
//  in = time
