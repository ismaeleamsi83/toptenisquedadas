import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(
    private http: HttpClient
  ) { }

  updateNotes(_id:any, newNote:any): Observable<any>{
    const body = {
      _id,
      newNote
    }
    return this.http.put('http://localhost:3000/update-notes', body );
  }
}
