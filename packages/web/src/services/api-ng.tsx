import axios from 'axios';

import type { AxiosResponse } from 'axios';
import type { ILogin } from '../interfaces/login-interface';
import type { IGetTransaction } from '../interfaces/get-transactions-interface';
import { INewTransaction } from '../interfaces/new-transaction-interface';

const URL = 'http://localhost:3015/';

const login = async (data: ILogin): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(`${URL}login`, data);
    return response;
  } catch (error: any) {
    return error.response.data.message;
  }
};

const setNewUser = async (data: ILogin): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(`${URL}newUser`, data);
    return response;
  } catch (error: any) {
    return error.response.data.message;
  }
};

const getUserBalance = async (token: string): Promise<AxiosResponse> => {
  try {
    const response = await axios.get(`${URL}getUserBalance`, { headers: { Authorization: token } });
    return response;
  } catch (error: any) {
    return error.response.data.message;
  }
};

const getTransactions = async (data: IGetTransaction, token: string): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(
      `${URL}filterTransactions`,
      data,
      { headers: { Authorization: token } },
    );
    return response;
  } catch (error: any) {
    return error.response.data.message;
  }
};

const setNewTransaction = async (data: INewTransaction, token: string): Promise<AxiosResponse> => {
  try {
    const response = await axios.patch(
      `${URL}cashOut`,
      data,
      { headers: { Authorization: token } },
    );
    return response;
  } catch (error: any) {
    return error.response.data.message;
  }
};

export { login, setNewUser, getUserBalance, getTransactions, setNewTransaction };
