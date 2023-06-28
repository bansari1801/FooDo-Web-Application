// ==========================================
//  Author: Meet Master
// ==========================================

import axios from 'axios';
import { getInstance } from '../config/token';

export function createNewOrder(payload) {
  let url = '/order';
  let config = getInstance('POST', url, payload);
  return axios(config)
    .then((res) => res.data)
    .catch(function (err) {
      console.log(err);
    });
}

export function updateOrder(payload) {
  let url = '';
  if (payload.isChef) {
    url = `/order/chef/${payload._id}`;
  } else {
    url = `/order/${payload._id}`;
  }

  let config = getInstance('PUT', url, payload);
  return axios(config)
    .then((res) => res.data)
    .catch(function (err) {
      console.log(err);
    });
}

export function getAllCurrentOrders(queryParams) {
  const page = queryParams.pageId + 1;
  const limit = queryParams.limit;

  let query = '';
  if (queryParams.filterOrder) {
    query = `&searchOrders=${queryParams.filterOrder}`;
  }
  if (queryParams.status != null && queryParams.status !== 'All') {
    query = query + `&status=${queryParams.status}`;
  }
  let url = '';
  if (queryParams.isChef) {
    url = `/order/chef?pageId=${page}&limit=${limit}${query}`;
  } else {
    url = `/order?pageId=${page}&limit=${limit}${query}`;
  }
  let config = getInstance('GET', url);
  return axios(config)
    .then((res) => res.data)
    .catch(function (err) {
      console.log(err);
    });
}

export function getOrderById(params) {
  let url = `/order/${params}`;
  let config = getInstance('GET', url);
  return axios(config)
    .then((res) => res.data)
    .catch(function (err) {
      console.log(err);
    });
}

export function getMenuItems() {
  let url = `/menu/list`;
  let config = getInstance('GET', url);
  return axios(config)
    .then((res) => res.data)
    .catch(function (err) {
      console.log(err);
    });
}
