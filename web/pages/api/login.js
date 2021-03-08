import axios from 'axios';
import Cookies from 'cookies';

export default async (req, res) => {
  const cookies = new Cookies(req, res);
  const dataToBeSent = {
    username: req.body.username,
    password: req.body.password,
  };

  return axios
    .post(`${process.env.PRIVATE_API_URL}/api/v1/users/login`, dataToBeSent)
    .then((response) => {
      if (response.data.status === 'success') {
        cookies.set('jwt', response.data.token, {
          httpOnly: true,
          expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 60 * 1000),
          sameSite: 'lax',
        });

        return res.status(200).json({
          status: 'success',
        });
      }

      return null;
    })
    .catch((err) => {
      return res.status(401).json({
        status: 'fail',
        message: err.response.data.message,
      });
    });
};
