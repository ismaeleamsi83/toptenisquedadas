import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getProfileUser(token:any, email:any):Observable<any>{
    const body = { token, email };
    console.log(token, email);
    return this.http.post('http://192.168.1.44:3000/profile', body);
  }

  updateProfileUser(user:any):Observable<any>{
    return this.http.put('http://192.168.1.44:3000/update-profile', user);
  }
}
