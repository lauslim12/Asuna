import Cookies from 'cookies';

export default async (req, res) => {
  const cookies = new Cookies(req, res);
  const token = cookies.get('jwt');

  if (!req.body.key || !token) {
    return res.status(401).json({
      status: 'fail',
      authorized: false,
    });
  }

  return res.status(200).json({
    status: 'success',
    authorized: true,
    token,
  });
};
