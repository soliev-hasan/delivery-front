import {useState, useCallback, useContext} from 'react';
import axios from 'axios';
import {DEVELOP_URL, port} from '../helper/helper';
import AuthContext from '../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

const BASE_URL = `${DEVELOP_URL}/api/`;

export const useApiRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | unknown>(null);
  const [data, setData] = useState(null);
  const {token, setToken, setRefreshToken, refreshToken} =
    useContext(AuthContext);

  const sendRequest = useCallback(
    async (method: string, endpoint: string, requestData = {}) => {
      setLoading(true);
      setError(null);

      try {
        const url = `${BASE_URL}${endpoint}`;

        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // Add this for POST requests
        };

        let response;

        if (method === 'get') {
          response = await axios.get(url, {headers, params: requestData});
        } else if (method === 'post') {
          response = await axios.post(url, requestData, {headers});
        } else if (method === 'put') {
          (headers as Record<string, string>)['Content-Type'] =
            'multipart/form-data';

          response = await axios.put(url, requestData, {headers});
        } else if (method === 'delete') {
          response = await axios.delete(url, {headers});
        } else {
          throw new Error('Unsupported request method');
        }

        setData(response.data);
        return response;
      } catch (err) {
        setError(err);
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Ошибка',
          textBody: 'Попоробуйте позже',
        });
        console.error('Error in API request:', err);
        if (err.response && err.response.status === 401) {
          let refreshToken = await AsyncStorage.getItem('refreshToken');
          axios
            .get(`${BASE_URL}auth/refresh-token?refreshToken=${refreshToken}`)
            .then(response => {
              AsyncStorage.setItem('refreshToken', response.data.refreshToken);
              AsyncStorage.setItem('token', response.data.token);
              setRefreshToken(response.data.refreshToken);
              setToken(response.data.token);
            })
            .catch(e => console.log(e));
        }
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [token, refreshToken],
  );

  return {sendRequest, loading, error, data};
};
