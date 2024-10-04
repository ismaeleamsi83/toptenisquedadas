import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PlayerService } from '../../services/player.service';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Profile } from '../../interfaces/profile';


@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule, TableModule, RatingModule, TagModule, 
    FormsModule, RouterModule, IconFieldModule, InputIconModule, InputTextModule],
  providers: [BrowserAnimationsModule, BrowserModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css'
})
export class PlayersComponent implements OnInit{

  players: Profile[] = [
    {
      name: '',
      lastname: '',
      password: '',
      preference: 'Pista dura',
      level: 'Novato',
      matchesPlayed: 0,
      matchesWon: 0,
      about: '',
      availability: [],
      birthday: new Date,
      sex: '',
      population: '',
      imageUrl: ''
    }
  ];


  constructor(
    private playerService: PlayerService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.playerService.getPlayers().subscribe(
      data => {
        this.players = data.players;
        
        this.players.forEach( (item:any ) =>{
          if(item.imageUrl != null){
            item.imageUrl = `data:image/jpeg;base64,${item.imageUrl}`;
          }
        });
        
        console.log(this.players);
      },
      error => {
        console.error(error);
      }
    )
  }

  selectPlayer(player: any){
    console.log(player);
    this.playerService.setPlayerSelected(player);
    let namePlayer = player.name;
    const name = namePlayer.replace(" ", "-");
    this.router.navigateByUrl(`/players/${name}`);
  }

 
  
}
