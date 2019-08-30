import axios from 'axios';
import { flickrConfig } from './config';

export const getImages = (query) => {
  let params = ''
  Object.keys(query).map((prop) => {
    params += `&${prop}=${query[prop]}`
  })
  return axios({
    url: flickrConfig.endPoints.images + params,
    baseURL: flickrConfig.baseUrl,
    method: 'GET'
  });

}