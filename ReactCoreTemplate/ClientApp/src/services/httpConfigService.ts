import { AxiosRequestConfig } from 'axios';

class HttpConfigService {
  private _config?: AxiosRequestConfig; 

  get config(){ return this._config }
  set config(config){ this._config = config }
}

export const httpConfigService = new HttpConfigService();