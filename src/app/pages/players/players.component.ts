import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule],
  providers: [PlayerService],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css'
})
export class PlayersComponent implements OnInit{

  players: any[]= [];

  constructor(
    private playerService: PlayerService
  ){}

  ngOnInit(): void {
    this.playerService.getPlayers().subscribe(
      data => {
        console.log(data);
        this.players = data;
        console.log(this.players);
      }
    )
  }
}
