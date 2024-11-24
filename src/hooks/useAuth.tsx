import {useState} from 'react';

const useAuth = () => {
  const [token, setToken] = useState<string | null>('');

  return {
    token,
    setToken,
  };
};

export default useAuth;
