import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  formLogin = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.min(3)]),
    lastname: new FormControl('', [Validators.required, Validators.min(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.min(8)]),
    confpassword: new FormControl('', [Validators.required, Validators.min(8)]),
  });
  constructor() { 
  }

  ngOnInit(): void {
    
  }

  sendForms(){
    if(this.confirmPass()){
      console.log('passwords match');
    }
  }

  confirmPass():boolean{
    if(this.formLogin.get('password')!.value == this.formLogin.get('confpassword')!.value){
      return true;
    }
    return false;
  }
}
