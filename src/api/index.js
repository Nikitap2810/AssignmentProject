import {useSelector} from 'react-redux';
import api from './config';
import axios from 'axios';
import {store} from '../redux/store';

export const loginApi = async payload => {
  // Enter the end point of api
  let response = api.get('', {
    params: payload,
  });
  return response;
};

const token = async () => {
  // Authorization token
  console.log('resp', store.getState().user.loginToken);
  api.defaults.headers['Authorization'] = `token`;
  console.log('a', api);
};
