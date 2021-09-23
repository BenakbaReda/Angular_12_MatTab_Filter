 


import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ICrud } from  './icrud';


@Injectable({
  providedIn: 'root'
})
export class BaseService<T, ID> implements ICrud<T, ID> {

  constructor(
    protected _http: HttpClient,
    @Inject(String) private _Linkbase: string
  ) {}

  Add(t: T): Observable<T> {
    return this._http.post<T>(this._Linkbase, t);
  }

  AddJson(t: T): Observable<T> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(t);
    console.log(body);
    return this._http.post<T>(this._Linkbase, body,{'headers':headers});
  }
  Update(id: ID, t: T): Observable<T> {
    return this._http.put<T>(this._Linkbase + "/" + id, t, {});
  }

  GetById(id: ID): Observable<T> {
    return this._http.get<T>(this._Linkbase + "/" + id);
  }

  GetAll(): Observable<T[]> {
    return this._http.get<T[]>(this._Linkbase)
  }

  Delete(id: ID): Observable<T> {
    return this._http.delete<T>(this._Linkbase + '/' + id);
	}
}
