// ==========================================
//  Author: Khushalkumar Gondaliya, Bansari Shah
// ==========================================

import axios from 'axios';
import { getInstance } from '../config/token';

export const getDailySalesData = async (numberOfDays) => {
  const config = getInstance("GET", "/dashboard/daily-sales-data", {
    numberOfDays: numberOfDays,
  });

  return axios(config)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

export const getCuisineSalesData = () => {
  const config = getInstance('GET', '/dashboard/cuisine-sales-data');

  return axios(config)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

export const getMenuItemsSalesData = () => {
  const config = getInstance('GET', '/dashboard/item-sales-data');

  return axios(config)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

export const getCounts = () => {
    const config = getInstance('GET', '/dashboard/get-counts');
  
    return axios(config)
      .then((res) => res.data)
      .catch((err) => err.response.data);
  };


