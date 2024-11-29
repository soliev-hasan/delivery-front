import {useState, useCallback, useContext} from 'react';
import axios from 'axios';
import {DEVELOP_URL, port} from '../helper/helper';
import AuthContext from '../contexts/AuthContext';

const BASE_URL = `${DEVELOP_URL}:${port}/api/`;

export const useApiRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | unknown>(null);
  const [data, setData] = useState(null);
  const {token} = useContext(AuthContext); // Достаем токен из контекста

  const sendRequest = useCallback(
    async (method: string, endpoint: string, requestData = {}) => {
      setLoading(true);
      setError(null);

      try {
        const url = `${BASE_URL}${endpoint}`;

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        let response;

        if (method === 'get') {
          response = await axios.get(url, {headers, params: requestData});
        } else if (method === 'post') {
          response = await axios.post(url, requestData, {headers});
        } else {
          throw new Error('Unsupported request method');
        }

        setData(response.data);
        return response;
      } catch (err) {
        setError(err);
        console.error('Error in API request:', err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [token],
  );

  return {sendRequest, loading, error, data};
};
