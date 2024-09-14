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

  players!: any[];


  constructor(
    private playerService: PlayerService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.playerService.getPlayers().subscribe(
      data => {
        this.players = data;
      },
      error => {
        console.error(error);
      }
    )
  }

  selectPlayer(player: any){
    this.playerService.setPlayerSelected(player);
    let namePlayer = player.name;
    const name = namePlayer.replace(" ", "-");
    this.router.navigateByUrl(`/players/${name}`);
  }

 
  
}
