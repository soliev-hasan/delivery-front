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
});

export default AuthContext;
