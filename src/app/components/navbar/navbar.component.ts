import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  // Tamaño pantalla
  widthWindow: any;
  stateWidth: boolean = false;

  // Estado light o dark
  state: boolean = true;

  // show menu
  showMenuBol: boolean = false;

  links = [
    { title: 'Inicio', url: '', selected: false },
    { title: 'Jugadores', url: 'players', selected: false },
    { title: 'Ranking', url: '/', selected: false },
    { title: 'Foro', url: '/', selected: false },
    { title: 'Pistas', url: '/', selected: false },
  ]

  ngOnInit(): void {
    this.checkWindowSize();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.checkWindowSize();
  }

  private checkWindowSize(): void {
    this.widthWindow = window.innerWidth;
    this.stateWidth = this.widthWindow < 768 ? false : true;
  }

  changeState(){
    this.state = !this.state;
  }

  setUserTheme(theme: 'light' | 'dark') {
    document.documentElement.setAttribute('data-theme', theme);
  }

  showMenu(){
    this.showMenuBol = !this.showMenuBol;
  }
  
}
