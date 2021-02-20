import Cookies from 'cookies';

export default async (req, res) => {
  const cookies = new Cookies(req, res);

  cookies.set('jwt', 'loggedOut', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
    sameSite: 'lax',
  });

  return res.status(200).json({
    status: 'success',
  });
};
