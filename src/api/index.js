import {useSelector} from 'react-redux';
import api from './config';
import axios from 'axios';
import {store} from '../redux/store';

export const loginApi = async payload => {
  let response = api.get(
    'method/assignment.API.access_token.get_access_token',
    {
      params: payload,
    },
  );
  return response;
};

const token = async () => {
  // const {loginToken} = useSelector(state => state.user);
  console.log('resp', store.getState().user.loginToken);
  api.defaults.headers['Authorization'] = `${store.getState().user.loginToken}`;
  console.log('a', api);
};

export const userDataApi = async payload => {
  await token();
  try {
    let response = api.get('method/assignment.API.all_users_api.get_user', {
      params: payload,
    });
    console.log('r', response);
    return response;
  } catch (error) {
    console.log('User Data error', error);
  }
};

export const userSpecificDataApi = async payload => {
  await token();
  try {
    let response = api.get('method/assignment.API.specific_user.get_specific', {
      params: payload,
    });

    return response;
  } catch (error) {
    console.log('User Specific Data', error);
  }
};

export const userSpecificUpdateApi = async payload => {
  console.log('r', payload);
  await token();
  try {
    let response = api.put('resource/Assignment/' + payload?.name1, payload);

    return response;
  } catch (error) {
    console.log('User Specific Data Update', error);
  }
};
