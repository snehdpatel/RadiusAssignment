import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private readonly http: HttpClient) { }

  public get(serviceURL: string) {
    return this.http.get(serviceURL).toPromise();
  }
}
