import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
  
})
export class PlayerService {

  urlPlayers = '/assets/players.json';

  private playerSelected: BehaviorSubject<any> = new BehaviorSubject<any>({});
  playerSelected$: Observable<any> = this.playerSelected.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  getPlayers():Observable<any>{
    return this.http.get<any>(this.urlPlayers);
  }

  setPlayerSelected(player: any){
    this.playerSelected.next(player);
  }


}
