import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDetails } from '../models/UserDetails';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: BehaviorSubject<UserDetails>;
  public user: Observable<UserDetails>;
  baseUrl = environment.baseUrl

  constructor(private http: HttpClient) {
    this.currentUser = new BehaviorSubject<UserDetails>(JSON.parse(localStorage.getItem('user')));
    this.user = this.currentUser.asObservable();
  }

  public get loggedinUser(): UserDetails {
    return this.currentUser.value;
}

  login(username, pwd) {
    return this.http.post<any>(this.baseUrl+'/login', { username, pwd })
        .pipe(map(data => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            if(data.status === 'Success') {
              localStorage.setItem('user', JSON.stringify(data.data));
              this.currentUser.next(data.data);
            }
            return data;
        }));
}

logout() {
  const id = this.loggedinUser.id;
    return this.http.post<any>(this.baseUrl+'/logout', { id})
        .pipe(map(user => {
            localStorage.removeItem('user');
            this.currentUser.next(null);
            return user;
        }));
}

}
