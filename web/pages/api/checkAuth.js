import Cookies from 'cookies';

export default async (req, res) => {
  const cookies = new Cookies(req, res);
  const token = cookies.get('jwt');

  if (req.method !== 'POST') {
    return res.status(501).json({
      status: 'fail',
      message: 'Method not implemented!',
    });
  }

  if (!req.body.key || !token) {
    return res.status(401).json({
      status: 'fail',
      message: 'Not authorized!',
      authorized: false,
    });
  }

  return res.status(200).json({
    status: 'success',
    message: 'You are authorized!',
    authorized: true,
    token,
  });
};
