import {createContext} from 'react';
const noop = (text: string) => {
  text;
};
const AuthContext = createContext({
  token: '',
  setToken: noop,
  phone: '',
  setPhone: noop,
  address: [],
  setAddress: {},
  user: {
    name: '',
    surname: '',
    photoUri: '',
    email: '',
  },
  setUser: noop,
  refreshToken: '',
  setRefreshToken: noop,
});

export default AuthContext;
