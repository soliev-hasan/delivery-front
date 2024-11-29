import {useState, useCallback} from 'react';
import axios from 'axios';
import {DEVELOP_URL, port} from '../helper/helper';

const BASE_URL = `${DEVELOP_URL}:${port}/api/`;

export const useApiRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | unknown>(null);
  const [data, setData] = useState(null);

  const sendRequest = useCallback(
    async (method: string, endpoint: string, requestData = {}) => {
      setLoading(true);
      setError(null);

      try {
        const url = `${BASE_URL}${endpoint}`;

        let response;

        if (method === 'get') {
          response = await axios.get(url, {params: requestData});
        } else if (method === 'post') {
          response = await axios.post(url, requestData);
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
    [],
  );

  return {sendRequest, loading, error, data};
};
