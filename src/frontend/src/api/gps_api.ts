import { GpxFormData } from '@src/store/gpx/types';

export class GpsApi {

  private _baseUrl: string = 'http://localhost:82/api/v1';
  public get baseUrl() { return this._baseUrl; }

  public async newGpxAsync(form: GpxFormData): Promise<boolean> {
    let formData = new FormData();
    formData.append('name', form.name as string);
    formData.append('file', form.file as File);
  
    const response: Response = await fetch(`${this.baseUrl}/new`, {
      method: 'POST',
      body: formData
    });
    const data: boolean = await response.json();

    return data;
  }

  public async getGpxAsync(): Promise<object> {
    const response: Response = await fetch(`${this.baseUrl}/get`, {
      method: 'GET'
    });
    const data: object = await response.json();

    return data;
  }
}
