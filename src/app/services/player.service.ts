import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
  
})
export class PlayerService {

  urlPlayers = '/assets/players.json';

  constructor(
    private http: HttpClient
  ) { }

  getPlayers():Observable<any>{
    return this.http.get<any>(this.urlPlayers);
  }
}
