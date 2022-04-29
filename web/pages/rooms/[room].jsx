import { Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import CustomSpinner from '../../components/CustomSpinner';
import Layout from '../../components/Layout';
import BookingForm from '../../components/Room/BookingForm';
import Details from '../../components/Room/Details';
import Hero from '../../components/Room/Hero';
import Photos from '../../components/Room/Photos';
import { get } from '../../utils/apiHelper';

function RoomInfo() {
  const [roomData, setRoomData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const slug = window.location.href.split('/').pop();

    get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/rooms/view/${slug}`).then(({ data }) => {
      setRoomData(data);
      setIsLoading(false);
    });
  }, []);

  const renderPage = () => {
    if (isLoading) {
      return <CustomSpinner />;
    }

    if (!roomData) {
      return (
        <VStack>
          <Text>That room does not exist!</Text>
        </VStack>
      );
    }

    return (
      <>
        <Hero roomData={roomData} />
        <Details roomData={roomData} />
        <Photos roomData={roomData} />
        <BookingForm roomData={roomData} />
      </>
    );
  };

  return <Layout title={[roomData?.name || 'Room Not Found']}>{renderPage()}</Layout>;
}

export default RoomInfo;
