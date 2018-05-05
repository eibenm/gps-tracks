import { GpxFormData } from '@src/store/gpx/types';

export class GpsApi {

  private _baseUrl: string = 'http://localhost:82';
  public get baseUrl() { return this._baseUrl; }

  public newGpx(data: GpxFormData): Promise<boolean> {
    let formData = new FormData();
    formData.append('name', data.name as string);
    formData.append('file', data.file as File);
  
    const promise: Promise<boolean> = fetch(`${this.baseUrl}/gpx_new.php`, {
      method: 'POST',
      body: formData
    })
    .then(response => response.json());

    return promise;
  }

  public getGpx(): Promise<object> {
    const promise: Promise<object> = fetch(`${this.baseUrl}/gpx_get.php`, {
      method: 'GET'
    })
    .then(response => response.json());
    
    return promise;
  }
}
