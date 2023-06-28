// ==========================================
//  Author: Bansari Shah
// ==========================================

import axios from 'axios';
import { getInstance } from '../config/token';

export function getMenuList(queryParams) {
  let page = queryParams.pageId + 1;
  let limit = queryParams.limit;
  let params = '';
  if (queryParams.name != null) {
    params = `&name=${queryParams.name}`;
  }
  if (queryParams.cuisine != null && queryParams.cuisine !== 'All') {
    params = params + `&cuisine=${queryParams.cuisine}`;
  }
  let config = getInstance('GET', `/menu?pageId=${page}&limit=${limit}${params}`);
  return axios(config)
    .then((res) => res.data)
    .catch(function (error) {
      console.log(error);
    });
}

export function createNewMenuItem(reqBody) {
  let config = getInstance('POST', `/menu`, reqBody);
  return axios(config)
    .then((res) => res.data)
    .catch(function (error) {
      console.log(error);
    });
}

export function deleteMenuItem(id) {
  let config = getInstance('DELETE', `/menu/${id}`, {});
  return axios(config)
    .then((res) => res.data)
    .catch(function (error) {
      console.log(error);
    });
}

export function getMenuItem(id) {
  let config = getInstance('GET', `/menu/${id}`);
  return axios(config)
    .then((res) => res.data)
    .catch(function (error) {
      console.log(error);
    });
}

export function updateMenuItem(reqBody) {
  let config = getInstance('PUT', `/menu/${reqBody._id}`, reqBody);
  return axios(config)
    .then((res) => res.data)
    .catch(function (error) {
      console.log(error);
    });
}
