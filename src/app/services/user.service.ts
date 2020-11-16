import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseUrl

  constructor(private http: HttpClient) { }

  register(user: User) {
    return this.http.post(this.baseUrl+'/user/register', user);
}

}
