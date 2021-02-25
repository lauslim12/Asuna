import axios from 'axios';
import Cookies from 'cookies';

export default async (req, res) => {
  const { entity, id } = req.body;

  const cookies = new Cookies(req, res);
  const token = cookies.get('jwt');

  try {
    await axios.delete(`${process.env.PRIVATE_API_URL}/api/v1/${entity}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
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
