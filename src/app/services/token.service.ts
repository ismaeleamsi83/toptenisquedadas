import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private tokenBehaviorSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  tokenBehaviorSubject$: Observable<string | null> = this.tokenBehaviorSubject.asObservable();

  constructor() { }

  getToken():Observable<string | null>{
    return this.tokenBehaviorSubject$;
  }

  setToken(token: string | null):void{
    if(token){
      localStorage.setItem('token', token);
    }else{
      localStorage.removeItem('token');
    }
    this.tokenBehaviorSubject.next(token);
  }

  clearToken():void{
    localStorage.removeItem('token');
    this.tokenBehaviorSubject.next(null);
  }
}
