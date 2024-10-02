import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TokenService } from '../../services/token.service';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Profile } from '../../interfaces/profile';



@Component({
  selector: 'app-editprofile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './editprofile.component.html',
  styleUrl: './editprofile.component.css'
})
export class EditprofileComponent implements OnInit{

  

  forms: FormGroup = new FormGroup({})

  email:any;
  token:any;
  user: Profile = {
    name: '',
    lastname: '',
    preference: 'Pista dura',
    level: 'Novato',
    matchesPlayed: 0,
    matchesWon: 0,
    about: '',
    availability: [],
    sex: ''
  };
  day:any = "";
  fringe:any = "";

  constructor(
    private userService: UserService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.forms = new FormGroup({
      name: new FormControl('', Validators.required),
      // lastname: new FormControl('', Validators.required),
      // email: new FormControl('', Validators.required),
    });
    this.getEmail();
  }


  getEmail(){
    this.tokenService.getEmail().subscribe({
      next: (response) => {
        console.log(response);
        this.email = response;
        this.getToken();
      },
      error: (error) => {
        console.error("error al recibir el email");
      },
      complete: () => {
        console.log("completado el email");
      }
    })
  }

  getToken(){
    this.tokenService.getToken().subscribe({
      next: (response) => {
        this.token = response;
        console.log(response);
        this.getUser();
      },
      error: (error) => {
        console.error("error al recibir el token");
      },
      complete: () => {
        console.log("completado el token");
      }
    })
  }

  getUser(){{
    this.userService.getProfileUser(this.token, this.email).subscribe({
      next: (response) => {
        console.log(response);
        this.user = Object.assign({}, this.user, response.user);
        
        console.log(response.user);
      },
      error: (error) => {
        console.error("error al recibir el usuario");
      },
      complete: () => {
        console.log("completado el usuario");
      }
    })
  }}

  onSubmit(){
    this.user.token = this.token;
    console.log(this.user);

    this.userService.updateProfileUser(this.user).subscribe({
      next: (response) => {
        console.log("Perfil actualizado");
      },
      error: (err) => {
        console.error("Error al actualizar el perfil");
      },
      complete: () => {
        console.log("Perfil actualizado");
      }
    })
  }

  addAvailability(){
    console.log(this.day, this.fringe);
    console.log("availability");
    const newAvailability = `${this.day} por la ${this.fringe}`;
    this.user.availability?.push(newAvailability)
  }

}
