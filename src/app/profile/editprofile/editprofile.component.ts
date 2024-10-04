import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TokenService } from '../../services/token.service';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Profile } from '../../interfaces/profile';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



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
    password: '',
    preference: 'Pista dura',
    level: 'Novato',
    matchesPlayed: 0,
    matchesWon: 0,
    about: '',
    availability: [],
    sex: '',
    population: '',
    fileName: '',
    fileRaw: '',
    imageUrl: ''
  };
  day:any = "";
  fringe:any = "";
  populations:any = "";
  fileImage: any;
  
  fileRaw:any;
  fileName:any;
  

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.forms = new FormGroup({
      name: new FormControl('', Validators.required),
      // lastname: new FormControl('', Validators.required),
      // email: new FormControl('', Validators.required),
    });
    
    this.getPopulations().subscribe({
      next: (data) => {
        this.populations = [...data];
        this.populations.sort((a:any, b:any) => {
          if (a.label < b.label) {
            return -1;
          } else if (a.label > b.label) {
            return 1;
          } else {
            return 0;
          }
        });
      }
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
        if(this.user.imageUrl != null){
          this.user.imageUrl = `data:image/jpeg;base64,${this.user.imageUrl}`;
        }
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
    
    // const user: Profile = {
    //   ...this.user,
    //   fileRaw: this.fileRaw,
    //   fileName: this.fileName
    // }
    
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

  getPopulations(): Observable<any> {

    return this.http.get('/assets/poblaciones.json');
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0]; // Obtener el archivo seleccionado
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Convertimos el archivo a base64 y lo almacenamos en user.imageUrl
        this.user.imageUrl = e.target.result.split(',')[1]; // Guardamos solo la parte base64, sin el encabezado
        this.fileName = file.name;
      };
  
      reader.readAsDataURL(file); // Leemos el archivo como base64
    }
    
  }

}
