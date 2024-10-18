import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { Profile } from '../interfaces/profile';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject: BehaviorSubject<Profile | null> = new BehaviorSubject<Profile | null>(null);;
  userBehaviorSubject$ = this.userSubject.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  getProfileUser(token:any, email:any):Observable<any>{
    const body = { token, email };
    console.log(token, email);
    return this.http.post('http://192.168.1.44:3000/profile', body).pipe(
      tap((response: any) => {
        if (response && response.user) {
          this.userSubject.next(response.user);
        } else {
          console.error('No user data in response', response);
        }
      })
    );;
  }

  updateProfileUser(user: Profile):Observable<any>{
    console.log(user);
    return this.http.put('http://192.168.1.44:3000/update-profile', user);
  }
}
