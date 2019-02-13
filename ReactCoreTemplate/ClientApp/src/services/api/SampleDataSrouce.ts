import { BaseHttpSource } from './BaseHttpSource';

export class SampleDataSource extends BaseHttpSource {
  getLanguageJson = (language: string) => {
    return this._axios.get(`/media/translations/${language}.json`)
      .then((response) => {
        return response.data;
      });
  };
}
