import { Profile } from './../interfaces/profile';
import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';
import { UserService } from '../services/user.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ToastModule, ButtonModule, RippleModule, CommonModule],
  providers: [MessageService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  token:any;
  email:any;
  user: Profile = {
    name: '',
    lastname: '',
    preference: 'Pista dura',
    level: 'Novato',
    matchesPlayed: 0,
    matchesWon: 0,
    about: '',
    availability: [],
    birthday: new Date,
    sex: ''
  };

  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router
  ){}

  ngOnInit(): void {
    
    this.getToken();
  }

  getToken(){
    this.tokenService.getToken().subscribe({
      next: (token:any) => {
        // console.log(token.message);
        if(!token){
          console.log("TOkeno no valido o inexistente");
          this.router.navigateByUrl('/');
        }else{
          console.log("token recibido");
          this.token = token;
          this.getEmail();
        }
        
      },
      error: (err) => {
        
        console.log("Error al obtener el token");
        this.router.navigateByUrl('/');
      },
      complete: () => {
        console.log('Token retrieved complete');
      }
    })
  }

  getEmail(){
    this.tokenService.getEmail().subscribe({
      next: (email) => {
        if(email === null){
          console.log("No hay email asociado");
          return;
        }else{
          this.email = email;
          console.log(this.email);
          this.showProfileUser();
        }
        
      },
      error: (err) => {
        console.log(err);
        this.tokenService.clearToken();
        this.router.navigateByUrl('/');
      },
      complete: () => {
        console.log('Email retrieved');
      }
    })
  }

  showProfileUser(){
    this.userService.getProfileUser(this.token, this.email).subscribe({
      next: (user) => {
        // this.user =  user.user;
        this.user = Object.assign({}, this.user, user.user);
        if(this.user.birthday){
          this.user.age = this.calculateAge(this.user.birthday);
        }
        console.log(this.user);
        this.show(user.message);
      },
      error: (err) => {
        if(err.status === 402){
          console.log("Error 402:", err.message);
          // localStorage.removeItem("token");
          this.tokenService.clearToken();
          this.router.navigateByUrl('/');
        }else{
          console.log(err);
        }
      },
      complete: () => {
        console.log("User retrieved");
      }
    })
  }

  show(message:any) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  editProfile(){
    this.router.navigate([`profile/${this.user.name}/edit`]);
  }


  calculateAge(dateOfBirth: string | Date): number{
    const dob = typeof dateOfBirth === 'string' ? new Date(dateOfBirth) : dateOfBirth;

    if (isNaN(dob.getTime())) {
      throw new Error('Fecha de nacimiento inválida');
    }
    const now = new Date();
    console.log(typeof(dateOfBirth));
    const diff = Math.abs(now.getTime() - dob.getTime());
    const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365)); 
    return age;
  }
}
