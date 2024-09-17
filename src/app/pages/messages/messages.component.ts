import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LucideAngularModule, SendHorizontal  } from 'lucide-angular';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    LucideAngularModule,
    CommonModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {

}
