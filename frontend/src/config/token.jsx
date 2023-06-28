// ==========================================
//  Author: Bansari Shah, Khushalkumar Gondaliya
// ==========================================
import { BACKEND_URL } from './backendUrl';
import { store } from './store';

export function getInstance(method, path, body = '') {
  const state = store.getState();

  const configDetails = state.token;

  const config = generateSignature(configDetails, method, path, body);
  return config;
}

function generateSignature(configDetails, method, path, payload, contentType = 'application/json') {
  const host = BACKEND_URL;

  const jwtOptions = {
    method,
    url: `${host}${path}`,
  };

  jwtOptions.data = payload;
  jwtOptions.headers = jwtOptions.headers || {};
  jwtOptions.headers['Content-Type'] = contentType;
  jwtOptions.headers['Accept'] = 'application/json';

  if (!configDetails) {
    return jwtOptions;
  }

  jwtOptions.headers['Authorization'] = `Bearer ${configDetails}`;
  return jwtOptions;
}
