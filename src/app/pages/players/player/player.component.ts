import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../../services/player.service';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [],
  providers:[],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent implements OnInit {

  player!:any;

  constructor(
    private playerService: PlayerService
  ){}

  ngOnInit(): void {  
    this.playerService.playerSelected$.subscribe(
        playerSelected => {
          console.log("playerSelected: ", playerSelected);
          this.player = playerSelected;
        }
      )
  }
}
