import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PlayerService } from '../../services/player.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TokenService } from '../../services/token.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink,
    ToastModule, ButtonModule, RippleModule
  ],
  providers:[MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/)]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/)]),
  });

  submitted: boolean = false;

  constructor(
    private playerService: PlayerService,
    private messageService: MessageService,
    private router: Router,
    private tokenService: TokenService
  ) { 
  }

  ngOnInit(): void {
    
  }

  sendForms(){
    this.submitted = true;
    if(this.formLogin.valid){
      console.log('formulario valido para enviar');
      this.playerService.loginPlayer(this.formLogin.value).subscribe({
        next:(response) =>{
          console.log(response.body.message);
          console.log(response.body);
          this.show(response.body.message);
          // localStorage.setItem('token', response.body.token);
          this.tokenService.setToken(response.body.token);
          setTimeout(()=>{
            this.router.navigate([`/profile/${this.formLogin.value.email}`]);
          }, 1500);
        },
        error:(err) =>{
          console.log(err.error.message);
          this.showError(err.error.message);
        },
        complete: () =>{
          console.log('Login completado');
        }
      })
    }
  }

  show(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }
}
