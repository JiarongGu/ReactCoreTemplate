import { AxiosRequestConfig } from 'axios';

export function getDefualtAxiosConfig(defualtLanguage: string, axiosConfig?: AxiosRequestConfig) {
    const defualtAxiosConfig = {
      headers: {
        'Cache-Control': 'no-cache',
        'Accept-Language': defualtLanguage
      }
    };
    return axiosConfig ? Object.assign({}, axiosConfig, defualtAxiosConfig) : defualtAxiosConfig;
  }