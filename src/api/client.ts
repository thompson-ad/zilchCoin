import {Platform} from 'react-native';

// https://www.bigbinary.com/learn-react-native/accessing-localhost-from-rn
export const apiURL =
  Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

interface FetchConfig {
  method: 'GET' | 'PUT';
  body?: any;
  headers?: {
    'Content-Type': 'application/json';
  };
}

export const client = async (endpoint: string, config: FetchConfig) => {
  return fetch(`${apiURL}/${endpoint}`, config).then(async response => {
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};
