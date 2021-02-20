import Cookies from 'cookies';

export default (req, res) => {
  const cookies = new Cookies(req, res);

  cookies.set('jwt', 'loggedOut', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  });

  return res.status(200).json({
    status: 'success',
    isLoggedOut: req.body.isLoggedOut,
  });
};
