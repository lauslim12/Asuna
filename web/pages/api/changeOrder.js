import axios from 'axios';
import Cookies from 'cookies';

export default async (req, res) => {
  const cookies = new Cookies(req, res);
  const token = cookies.get('jwt');
  const id = req.body.orderId;

  try {
    await axios.post(
      `${process.env.PRIVATE_API_URL}/api/v1/orders/change-order-status/${id}`,
      req.body,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (e) {
    return res.status(401).json({
      status: 'fail',
      response: e.response.data,
    });
  }

  return res.status(200).json({
    status: 'success',
  });
};
