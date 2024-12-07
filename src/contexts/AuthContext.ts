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
    phone: '',
  },
  setUser: {
    name: '',
    surname: '',
    email: '',
    phone: '',
    __v: '',
    _id: '',
    createdAt: '',
    photoUri: '',
    updatedAt: '',
  },
  refreshToken: '',
  setRefreshToken: noop,
  logout: noop,
});

export default AuthContext;
