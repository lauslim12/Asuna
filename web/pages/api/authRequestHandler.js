import axios from 'axios';
import Cookies from 'cookies';

/**
 * This serverless API hosts an API proxy.
 * The following function is used to handle every request that needs authorization.
 *
 * Note #1: that this function will not work if you intend to upload an image to the custom API.
 * Note #2: One has to send 'requestType' and 'url' in the request body to be able to use this endpoint.
 */
export default (req, res) => {
  const cookies = new Cookies(req, res);
  const token = cookies.get('jwt') || null;

  // 0. Parse our essential variables here.
  const { requestType, requestUrl } = req.body;

  // 1. If not 'POST', then return rejection message.
  if (req.method !== 'POST') {
    return res.status(501).json({
      status: 'fail',
      message: 'Method not allowed in this API endpoint!',
    });
  }

  // 2. If one of 'requestType' and 'requestUrl' is not present, send back an error.
  if (!requestType || !requestUrl) {
    return res.status(400).json({
      status: 'fail',
      message: "Please also submit 'requestType' and 'requestUrl' to this API endpoint!",
    });
  }

  // 3. Construct the new 'axios' object.
  // 4. If status is not 'success', send back the error message to the user.
  // 5. If the status is 'success', then send 'success' to the user.
  return axios({
    method: requestType,
    url: requestUrl,
    data: req.body,
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(() => {
      return res.status(200).json({
        status: 'success',
      });
    })
    .catch((err) => {
      return res.status(err.response.status).json({
        status: 'fail',
        message: err.response.data.message,
      });
    });
};
