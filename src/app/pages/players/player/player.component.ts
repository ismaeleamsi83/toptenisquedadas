import { routes } from './../../../app.routes';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { PlayerService } from '../../../services/player.service';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { EditorModule } from 'primeng/editor';
import { NewMatchComponent } from '../../../shared/new-match/new-match.component';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Profile } from '../../../interfaces/profile';
import { UserService } from '../../../services/user.service';
import { TokenService } from '../../../services/token.service';
import { NotesService } from '../../../services/notes.service';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [
    RatingModule,
    CommonModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    EditorModule,
    NewMatchComponent,
    RouterLink,
    RouterModule,
  ],
  providers: [BrowserModule, BrowserAnimationsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css',
})
export class PlayerComponent implements OnInit {
  player: any;
  yearsOld: any;
  playerSelected: boolean = false;
  //Editor
  text: string | undefined;

  //Variable Dialog Match
  visibleMatch: boolean = false;

  //Dialog notas
  visible: boolean = false;

  //notes
  notes: any;

  //user
  user: any;
  token: any;
  email: any;

  constructor(private playerService: PlayerService, private router: Router,
    private userService: UserService, private tokenService: TokenService,
    private notesServices: NotesService
  ) {
  }

  ngOnInit(): void {
    this.playerService.playerSelected$.subscribe((playerSelected) => {
      console.log('playerSelected: ', playerSelected);
      this.player = playerSelected;

      // calcula la edad pero luego lo pongo en marcha
      if (this.isObjectEmpty(this.player)) {
        console.log('esta vacio');
        this.router.navigateByUrl('/players');
      } else {
        console.log(this.player);
        const dateBirthday = new Date(this.player.birthday);
        const nowDate = new Date();
        this.getYearsOld(dateBirthday, nowDate);
      }
    });

    this.userService.userBehaviorSubject$.subscribe({
      next: res => {
        if (res) {
          this.user = res;
          console.log('user: ', this.user);
        } else {
          console.log('No user data received yet');
        }
      },
      error: err => console.error('Error receiving user data', err)
    });
  }

  showDialog() {
    this.visible = true;
    console.log(this.user);
    this.user.notes.forEach((res: any) => {
      
      if(res._id == this.player._id){
        this.text = res.content;
      }
    })
  }

  saveNote() {
    console.log(this.text);
    this.visible = false;
    this.notes = { _id: this.player._id, content: this.text, createdAt: new Date() };
    console.log(this.notes);
    
    this.updateNote(this.user._id, this.notes);
  }

  

  

  updateNote(_id:any, notes:any){
    this.notesServices.updateNotes(_id, notes).subscribe({
      next: res => {
        console.log('Ok Actualizado');
        this.user.notes.forEach((res: any) => {
          if(res._id == this.player._id){
            res.content = this.text;
          }
        });
      },
      error: err => {
        console.error(err);
      }
    })
  }

  changeDialogMatch(newValue: boolean) {
    this.visibleMatch = newValue;
  }

  isObjectEmpty(obj: any): boolean {
    return Object.keys(obj).length === 0;
  }

  getYearsOld(dateBirthday: Date, nowDate: Date) {
    let days = nowDate.getDate() - dateBirthday.getDate();
    let mounths = nowDate.getMonth() - dateBirthday.getMonth();
    let years = nowDate.getFullYear() - dateBirthday.getFullYear();

    if (mounths < 0 || (mounths === 0 && days < 0)) {
      years--;
      mounths += 12;
    }
    if (days < 0) {
      mounths--;
      const ultimoDiaMesAnterior = new Date(
        nowDate.getFullYear(),
        nowDate.getMonth(),
        0
      ).getDate(); // Obtiene los días del mes anterior
      days += ultimoDiaMesAnterior;
    }

    this.yearsOld = years;
    this.playerSelected = true;
  }

  sendMessage() {
    console.log(this.player);
    let namePlayer = this.player.name;
    const name = namePlayer.replace(' ', '-');
    this.router.navigateByUrl(`/messages/${name}`);
  }
}
