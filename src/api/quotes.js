import axios from 'axios';
import store from '../store';
import NetInfo from '@react-native-community/netinfo';

const BASE_URL = 'https://api.pfizer-dev.redis.tv/v1/';

export const getQuotes = async () => {
  try {
    const data = await axios.get(
      `${BASE_URL}users/c90a5e99-a80e-434b-8717-431bc854a325/reports/2021-03-24`,
      {
        headers: {
          Authorization:
            'Bearer 21bb98afba4f9ed7c22ec8712b920dfc924e13929d02824c4d127749c6fbb3e9',
        },
      },
    );
    if (data.error) {
      console.log('dataerror', data);
      throw data.error;
    } else {
      console.log(1, JSON.parse(data.request._response));
      return JSON.parse(data.request._response);
    }
  } catch (e) {
    console.log('get Quotes error', e);
    throw e;
  }
};

export const postData = async totalCount => {
  let isConnected = NetInfo.fetch().then(state => {
    return state.isConnected;
  });

  const config = {
    tasks: [
      {
        completed: 1,
        is_boolean: true,
        name: 'Глюкоза',
        task_id: 'glucose',
        total: totalCount,
      },
    ],
    version: 1,
  };

  if (store.quoteStore.net) {
    try {
      await axios.post(`${BASE_URL}reports/2021-03-24`, config, {
        headers: {
          Authorization:
            'Bearer 8d63a79067bf72cac7f8a710c552b9d6b7b54aac0af78786a7d61b980a99b755',
          'Content-Type': 'application/json',
        },
      });
    } catch (e) {
      console.log('get Quotes error', e);
      throw e;
    }
  } else {
    store.quoteStore.setLocalRequests(totalCount);
  }
};

export const sendTotalCounts = async () => {
  store.quoteStore.localRequests
    .slice()
    .reverse()
    .forEach(async item => {
      const config = {
        tasks: [
          {
            completed: 1,
            is_boolean: true,
            name: 'Глюкоза',
            task_id: 'glucose',
            total: item,
          },
        ],
        version: 1,
      };
      try {
        const response = await axios.post(
          `${BASE_URL}reports/2021-03-24`,
          config,
          {
            headers: {
              Authorization:
                'Bearer 8d63a79067bf72cac7f8a710c552b9d6b7b54aac0af78786a7d61b980a99b755',
              'Content-Type': 'application/json',
            },
          },
        );
        if (response.status >= 200 && response.status < 300) {
          console.log("ADJASJDASJDASJDJASDJASDJ", response.status)
          store.quoteStore.sliceLocalRequests();
        }
      } catch (e) {
        console.log('get Quotes error', e);
        throw e;
      }
    });
};
