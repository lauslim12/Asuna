import { Button, Grid, Heading, Icon, Select, Text, useToast, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { GiCancel } from 'react-icons/gi';
import { IoMdAirplane } from 'react-icons/io';

import { post } from '../../helpers/apiHelper';
import webRoutes from '../../helpers/webRoutes';
import { FailedOperationToast, SuccessfulOperationToast } from '../Toasts';

const BookingForm = ({ roomData }) => {
  const [startMonth, setStartMonth] = useState('01');
  const [endMonth, setEndMonth] = useState('01');
  const [startYear, setStartYear] = useState(new Date().getFullYear());
  const [endYear, setEndYear] = useState(new Date().getFullYear());
  const router = useRouter();
  const toast = useToast();

  const allPossibleYears = [
    ...Array(5)
      .fill(new Date().getFullYear())
      .map((year, index) => year + index),
  ];
  const allPossibleMonths = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const handleOrder = async () => {
    const startDate = new Date(`${startYear}-${startMonth}-01`);
    const endDate = new Date(`${endYear}-${endMonth}-27`);

    const dataToBeSent = {
      requestedRoom: roomData._id,
      startDate,
      endDate,
      requestType: 'POST',
      requestUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/orders/place-order`,
    };

    const response = await post(dataToBeSent, '/api/authRequestHandler');

    if (response.status === 'success') {
      SuccessfulOperationToast(
        toast,
        'Yay! You have booked this room. Redirecting shortly to your profile.'
      );

      return setTimeout(() => router.push(webRoutes.profile), 3000);
    }

    return FailedOperationToast(toast, response.message);
  };

  return (
    <VStack bg="#f7f7f7" pt={10} pb={10} color="black" spacing={5}>
      <Heading textTransform="uppercase" letterSpacing="0.2rem" lineHeight={1.3}>
        Order Now! 🚀
      </Heading>

      <Grid
        templateColumns={{ lg: 'repeat(2, 1fr)' }}
        gap={10}
        justifyItems="center"
        alignItems="center"
      >
        <VStack>
          <Text>🔥 Enter your desired start year here</Text>
          <Select
            bg="green.300"
            borderColor="green.300"
            placeholder="Current year"
            w="200px"
            onChange={({ currentTarget: { value } }) => setStartYear(value)}
          >
            {allPossibleYears.map((year) => (
              <option key={`start-year-${year}`} value={year}>
                {year}
              </option>
            ))}
          </Select>
        </VStack>

        <VStack>
          <Text>✔️ Enter your desired end year here</Text>
          <Select
            bg="green.300"
            borderColor="green.300"
            placeholder="Current year"
            w="200px"
            onChange={({ currentTarget: { value } }) => setEndYear(value)}
          >
            {allPossibleYears.map((year) => (
              <option key={`end-year-${year}`} value={year}>
                {year}
              </option>
            ))}
          </Select>
        </VStack>

        <VStack>
          <Text>📅 Enter your desired start month here</Text>
          <Select
            bg="green.300"
            borderColor="green.300"
            placeholder="Current month"
            w="200px"
            onChange={({ currentTarget: { value } }) => setStartMonth(value)}
          >
            {allPossibleMonths.map((month, index) => (
              <option key={`start-month-${month}`} value={index + 1}>
                {month}
              </option>
            ))}
          </Select>
        </VStack>

        <VStack>
          <Text>🎫 Enter your desired end month here</Text>
          <Select
            bg="green.300"
            borderColor="green.300"
            placeholder="Current month"
            w="200px"
            onChange={({ currentTarget: { value } }) => setEndMonth(value)}
          >
            {allPossibleMonths.map((month, index) => (
              <option key={`end-month-${month}`} value={index + 1}>
                {month}
              </option>
            ))}
          </Select>
        </VStack>
      </Grid>

      <VStack>
        <Text>😄 And then, click the below button to make your request</Text>
        <Button
          colorScheme="linkedin"
          w="200px"
          leftIcon={<Icon as={IoMdAirplane} />}
          onClick={handleOrder}
        >
          Book Now
        </Button>
        <Button
          colorScheme="red"
          w="200px"
          leftIcon={<Icon as={GiCancel} />}
          onClick={() => router.push(webRoutes.listOfRooms)}
        >
          Cancel
        </Button>
      </VStack>
    </VStack>
  );
};

BookingForm.propTypes = {
  roomData: PropTypes.instanceOf(Object).isRequired,
};

export default BookingForm;
