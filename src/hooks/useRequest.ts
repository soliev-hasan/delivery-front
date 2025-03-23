import {useState, useCallback, useContext, useRef} from 'react';
import axios from 'axios';
import {DEVELOP_URL} from '../helper/helper';
import AuthContext from '../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

const BASE_URL = `${DEVELOP_URL}/api/`;

export const useApiRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | unknown>(null);
  const [data, setData] = useState(null);
  const {token, setToken, setRefreshToken} = useContext(AuthContext);

  // 🔹 Хранит последний запрос (метод, URL, данные)
  const lastRequestRef = useRef<{
    method: string;
    endpoint: string;
    requestData?: any;
  } | null>(null);

  const sendRequest = useCallback(
    async (
      method: string,
      endpoint: string,
      requestData = {},
      retry = false,
    ) => {
      setLoading(true);
      setError(null);

      try {
        const url = `${BASE_URL}${endpoint}`;
        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type':
            method === 'put' ? 'multipart/form-data' : 'application/json',
        };

        let response;

        if (method === 'get') {
          response = await axios.get(url, {headers, params: requestData});
        } else if (method === 'post') {
          response = await axios.post(url, requestData, {headers});
        } else if (method === 'put') {
          response = await axios.put(url, requestData, {headers});
        } else if (method === 'delete') {
          response = await axios.delete(url, {headers});
        } else {
          throw new Error('Unsupported request method');
        }

        setData(response.data);
        return response;
      } catch (err: any) {
        console.error('Error in API request:', err);

        setError(err);
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Ошибка',
          textBody: 'Попробуйте позже',
        });

        if (err.response) {
          const status = err.response.status;

          // 🔹 Если ошибка 401 (токен устарел) → обновляем токен и пробуем снова
          if (status === 401 && !retry) {
            console.log('Повтор запроса через 2 секунды... TOKEN');
            try {
              const refreshToken = await AsyncStorage.getItem('refreshToken');
              const refreshResponse = await axios.get(
                `${BASE_URL}auth/refresh-token?refreshToken=${refreshToken}`,
              );

              const newToken = refreshResponse.data.token;
              const newRefreshToken = refreshResponse.data.refreshToken;

              await AsyncStorage.setItem('token', newToken);
              await AsyncStorage.setItem('refreshToken', newRefreshToken);
              setToken(newToken);
              setRefreshToken(newRefreshToken);

              // 🔄 Повторяем последний запрос после обновления токена
              return sendRequest(method, endpoint, requestData, true);
            } catch (refreshError) {
              console.log('Ошибка обновления токена:', refreshError);
            }
          }

          // 🔄 Автоматический **повторный запрос** (например, при ошибке сервера 500)
          if ((status === 500 || status === 429) && !retry) {
            console.log('Повтор запроса через 2 секунды...');
            return new Promise(resolve =>
              setTimeout(
                () => resolve(sendRequest(method, endpoint, requestData, true)),
                2000,
              ),
            );
          }
        }

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [token, setToken, setRefreshToken],
  );

  return {sendRequest, loading, error, data};
};
