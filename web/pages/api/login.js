import axios from 'axios';
import Cookies from 'cookies';

export default async (req, res) => {
  const { username, password } = req.body;
  let response;

  try {
    response = await axios.post(`${process.env.PRIVATE_API_URL}/api/v1/users/login`, {
      username,
      password,
    });
  } catch (e) {
    return res.status(401).json({
      status: 'fail',
      response: e.response.data,
    });
  }

  const cookies = new Cookies(req, res);
  cookies.set('jwt', response.data.token, {
    httpOnly: true,
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 60 * 1000),
    sameSite: 'lax',
  });

  return res.status(200).json({
    status: 'success',
  });
};
