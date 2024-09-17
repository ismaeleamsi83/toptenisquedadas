import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-match',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule, CalendarModule, 
    FormsModule, TableModule, CommonModule],
  templateUrl: './new-match.component.html',
  styleUrl: './new-match.component.css',
})
export class NewMatchComponent implements OnInit {

  players: any = [
    { id: 1, name: 'Player 1', set1: 0, set2: 0, set3: 0, set4: 0, set5: 0 },
    { id: 2, name: 'Player 2', set1: 0, set2: 0, set3: 0, set4: 0, set5: 0 },
  ];
  

  date: Date | undefined;

  @Input('showMatch') showMatch!:boolean;

  @Output() newItemEvent = new EventEmitter<boolean>();

  visible: boolean = false;

  ngOnInit(): void {
    
  }

  hideDialog() {
    this.showMatch = false;
    this.newItemEvent.emit(this.showMatch);
  }
}
