import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options, Product } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    // used to make REST API calls to a specific url
    private httpClient: HttpClient
  ) { }

  // used to communicate with server
  // Options inclueds params, headers, etc
  get<T>(url: string, options: Options): Observable<T> {
    return this.httpClient.get<T>(url, options) as Observable<T>;
  }

  // body includes data
  post<T>(url: string, body: Product, options: Options): Observable<T> {
    return this.httpClient.post<T>(url,body,options) as Observable<T>;
  }

  // url will also include an id
  put<T>(url: string, body: Product, options: Options): Observable<T> {
    return this.httpClient.put<T>(url,body,options) as Observable<T>;
  }

  delete<T>(url: string, options: Options): Observable<T> {
    return this.httpClient.delete<T>(url,options) as Observable<T>;
  }
}
