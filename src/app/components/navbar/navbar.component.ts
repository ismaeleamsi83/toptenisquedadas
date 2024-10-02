import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { TokenService } from '../../services/token.service';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy  {

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

  emailToken:any;

  // Subject para manejar la destrucción de las suscripciones
  private destroy$ = new Subject<void>();

  constructor(public tokenService: TokenService,
    private router: Router
  ) {
    this.token$ = this.tokenService.getToken();
   }

  ngOnInit(): void {
    this.checkWindowSize();
    
    // this.updateEmailToken();

    this.getEmailToken();
  }

  ngOnDestroy(): void {
    // Emitimos para cancelar todas las suscripciones
    this.destroy$.next();
    this.destroy$.complete();
  }

  getEmailToken(): void {
    this.tokenService.getEmail().pipe(
      takeUntil(this.destroy$)  // Cancelamos la suscripción al destruir el componente o cuando se emite destroy$
    ).subscribe({
      next: (item: any) => {
        if (item) {
          this.emailToken = item;
        } else {
          this.emailToken = null; // Asigna null si el token no es válido
        }
      },
      error: (err) => {
        console.error("Error obteniendo el token de email", err);
      }
    });
  }
  // async getEmailToken(){
  //   const email = this.tokenService.getEmail().subscribe({
  //     next: (item:any) => {
  //       if(item){
  //         this.emailToken = item;
  //       }else{
  //         // this.emailToken = null;
  //       }
  //     }
  //   });
  // }

  // async updateEmailToken(){
  //   try{
  //     const token = await this.token$;
  //     console.log("tengo el token");
  //     const emailToken = this.token$.subscribe({
  //       next:(res)=>{
  //         console.log(res);
  //         if(res !== null){
  //           this.emailToken = jwtDecode(res);
  //           console.log(this.emailToken.email);
  //         }

  //       }
  //     })
  //   }catch(e){
  //     console.log("error al conseguir el token");
  //   }
  // }

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
    this.emailToken = null;
  }
  
  goProfile(){
    if (this.emailToken) {
      this.router.navigate([`/profile/${this.emailToken}`]);
    } else {
      console.warn("No hay token de email disponible");
    }
  }

}
