import { get } from './apiHelper';

const getNumberOfMonths = (startDate, endDate) => {
  const startDateYear = startDate.getFullYear();
  const endDateYear = endDate.getFullYear();
  const startDateMonth = startDate.getMonth();
  const endDateMonth = endDate.getMonth();

  const numberOfMonths = endDateMonth + 12 * endDateYear - (startDateMonth + 12 * startDateYear);

  // Return with one inclusive.
  return numberOfMonths + 1;
};

const calculatePrice = async (price, startDate, endDate, code = 'null') => {
  const numberOfMonths = getNumberOfMonths(new Date(startDate), new Date(endDate));
  let response = null;

  if (code) {
    response = await get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/vouchers/${code}`);
  }

  // Maximum of discount is 1 (100%), so the formula is reduced.
  const totalPrice = price * numberOfMonths;
  const discountPrice = totalPrice * (1 - (response?.discount || 0));

  return discountPrice;
};

export default calculatePrice;
