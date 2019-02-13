import { SampleDataSource } from './SampleDataSrouce';
import Axios, { AxiosRequestConfig, CancelTokenSource } from 'axios';

export class HttpSources {
  sampleData: SampleDataSource;
  cancelTokenSource: CancelTokenSource;

  constructor(axiosConfig?: AxiosRequestConfig) {
    this.cancelTokenSource = Axios.CancelToken.source();

    const defualtConfig = { cancelToken: this.cancelTokenSource.token };
    const config = axiosConfig ? Object.assign({}, axiosConfig, defualtConfig) : defualtConfig;

    this.sampleData = new SampleDataSource(config);
  }

  cancelAll = () => {
    this.cancelTokenSource.cancel();
  }
}