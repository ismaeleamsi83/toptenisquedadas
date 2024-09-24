import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../../services/token.service';

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

  token$: Observable<string | null>;

  constructor(public tokenService: TokenService,
    private router: Router
  ) {
    this.token$ = this.tokenService.getToken();
   }

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

  cleanToken(){
    this.tokenService.clearToken();
  }
  
}
