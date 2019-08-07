import { AxiosRequestConfig } from 'axios';

class ConfigurationService {
  private _axiosConfig?: AxiosRequestConfig;

  get axiosConfig() { 
    return this._axiosConfig 
  }

  set axiosConfig(config) { 
    this._axiosConfig = config 
  }
}

export const globals = new ConfigurationService();