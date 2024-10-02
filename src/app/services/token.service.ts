import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private tokenBehaviorSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  tokenBehaviorSubject$: Observable<string | null> = this.tokenBehaviorSubject.asObservable();

  private emailBehaviorSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(this.getEmailFromToken(localStorage.getItem('token')));
  emailBehaviorSubject$: Observable<string | null> = this.emailBehaviorSubject.asObservable();

  constructor() { }

  getToken():Observable<string | null>{
    return this.tokenBehaviorSubject$;
  }

  setToken(token: string | null):void{
    if(token){
      localStorage.setItem('token', token);

      this.setEmail(token);
    }else{
      localStorage.removeItem('token');
      this.emailBehaviorSubject.next(null);
    }
    this.tokenBehaviorSubject.next(token);
  }

  clearToken():void{
    localStorage.removeItem('token');
    this.tokenBehaviorSubject.next(null);
    this.emailBehaviorSubject.next(null);
  }

  setEmail(token: string | null):void{
    const decodedEmail = this.getEmailFromToken(token);
    this.emailBehaviorSubject.next(decodedEmail);
  }

  private getEmailFromToken(token: string | null): string | null {
    if (!token) {
      return null;
    }
    
    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken?.email || null;  // Asegúrate de que el email esté presente en el token decodificado
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  getEmail(): Observable<string | null> {
    return this.emailBehaviorSubject$;
  }
}
