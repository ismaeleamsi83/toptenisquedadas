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
import { NewMatchComponent } from "../../../shared/new-match/new-match.component";

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [RatingModule, CommonModule, FormsModule, DialogModule, ButtonModule, InputTextModule, EditorModule, NewMatchComponent],
  providers:[BrowserModule, BrowserAnimationsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent implements OnInit {

  player:any;
  yearsOld: any;
  playerSelected: boolean = false;


  //Dialog notas
  visible: boolean = false;
  showDialog() {
      this.visible = true;
  }
  saveNote(){
    console.log(this.text);
    this.visible = false;
  }
  //Editor
  text: string | undefined;


  //Variable Dialog Match
  visibleMatch: boolean = false;
  changeDialogMatch(newValue:boolean){
    this.visibleMatch = newValue;
  }

  constructor(
    private playerService: PlayerService
  ){}

  ngOnInit(): void {
     
    this.playerService.playerSelected$.subscribe(
        playerSelected => {
          console.log("playerSelected: ", playerSelected);
          this.player = playerSelected;

          if(this.isObjectEmpty(this.player)){
            console.log("esta vacio");
          }else{
            console.log(this.player);
            const dateBirthday = new Date(this.player.dateOfBirth);
            const nowDate = new Date();
            this.getYearsOld(dateBirthday, nowDate);
          }
          
        }
      )
  }

  isObjectEmpty(obj: any): boolean {
    return Object.keys(obj).length === 0;
  }

  getYearsOld(dateBirthday: Date, nowDate: Date){
    
    let days = nowDate.getDate() - dateBirthday.getDate();
    let mounths = nowDate.getMonth() - dateBirthday.getMonth();
    let years = nowDate.getFullYear() - dateBirthday.getFullYear();
          
      if (mounths < 0 || (mounths === 0 && days < 0)) {
            years--;
            mounths += 12;
      }
      if (days < 0) {
            mounths--;
            const ultimoDiaMesAnterior = new Date(nowDate.getFullYear(), nowDate.getMonth(), 0).getDate(); // Obtiene los días del mes anterior
            days += ultimoDiaMesAnterior;
      }
          
      this.yearsOld = years;
      this.playerSelected = true;
  }
}
