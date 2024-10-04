import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
  
})
export class PlayerService {

  urlPlayers = '/assets/players.json';
  urlAPI = 'http://localhost:3000/register';

  urlApi2 = 'http://192.168.1.44:3000';

  urlApi3 = 'http://192.168.1.44:3000/players';

  private playerSelected: BehaviorSubject<any> = new BehaviorSubject<any>({});
  playerSelected$: Observable<any> = this.playerSelected.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  getPlayers():Observable<any>{
    // return this.http.get<any>(this.urlPlayers);
    return this.http.get<any>(this.urlApi3);
  }

  setPlayerSelected(player: any){
    this.playerSelected.next(player);
  }

  newPlayer(newPlayer:any ): Observable<any>{
    console.log(newPlayer);
    return this.http.post(this.urlAPI, newPlayer, { observe: 'response' });
  }

  loginPlayer(player: any): Observable<any>{
    return this.http.post(`${this.urlApi2}/login`, player, { observe: 'response' });
  }

}
