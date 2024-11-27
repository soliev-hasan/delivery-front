import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

const useAuth = () => {
  const [token, setToken] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetch() {
    let token = await AsyncStorage.getItem('refreshToken');
    setIsLoading(true);
    if (token == null) {
      setToken('');
    } else {
      setToken(token);
    }
  }
  useEffect(() => {
    fetch();
  }, []);
  return {
    token,
    setToken,
    phone,
    setPhone,
    address,
    setAddress,
    isLoading,
  };
};

export default useAuth;
