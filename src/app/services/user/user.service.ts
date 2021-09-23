import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User, number> {

  constructor(protected _http: HttpClient) {
    super(_http, `${environment.api.baseUrl}/users`);
  }
}
