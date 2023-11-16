import axiosClient from './axiosClient';

class AuthorizationApi {
  login(params) {
    const url = `/auth/login`;
    return axiosClient.post(url, params);
  }
  register(params) {
    const url = `/auth/register`;
    return axiosClient.post(url, params);
  }
}

export default new AuthorizationApi();
