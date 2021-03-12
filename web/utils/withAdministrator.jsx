/* eslint-disable no-return-await */
import { getAuth } from './apiHelper';
import webRoutes from './webRoutes';

export default (GetServerSidePropsFunction) => async (ctx) => {
  // 1. Check if there is a token.
  const token = ctx.req.cookies?.jwt || null;

  // 2. Perform an authorized HTTP GET request to the private API to get user data.
  const { data } = await getAuth(`${process.env.PRIVATE_API_URL}/api/v1/users/me`, token);

  // 3. If there is no user, or the user is not an admin, then redirect to unauthorized.
  if (!data || (data.role !== 'admin' && data.role !== 'owner')) {
    return {
      redirect: {
        destination: webRoutes.unauthorized,
        permanent: false,
      },
    };
  }

  // 4. Return via closure: 'GetServerSidePropsFunction'.
  return await GetServerSidePropsFunction(ctx);
};
