import fetch from 'isomorphic-fetch';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

/*
 Isomorphic fetch that can be used as in in both the server and the client. Usage:
 import dataFetch from 'src/common/dataFetch';
 dataFetch({method: 'GET', url: '/v1/hey', query: {fullLength: true}, useDefaultHost: true})
 .then((json) => {
    console.log(json);
  })
 .catch((err)=> {
    //do something {}
  })
 */

const API_URL = 'https://api.amfoss.in/';

export default ({ query, variables }) => {
  const body = {
    query,
    variables,
  };

  const token = cookies.get('token');

  const apiConfig = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `JWT ${token}` : null,
    },
    body: JSON.stringify(body),
  };

  return fetch(API_URL, apiConfig).then(function(response) {
    const contentType = response.headers.get('content-type');
    if (response.ok) {
      if (contentType && contentType.indexOf('application/json') !== -1) {
        return response.json().then(json => json);
      }
      if (contentType && contentType.indexOf('text') !== -1) {
        return response.text().then(text => text);
      }
      return response;
    }
    console.error(`Response status ${response.status} during dataFetch for url ${response.url}.`);
    throw response;
  });
};
