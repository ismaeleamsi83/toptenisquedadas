import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  formRegister = new FormGroup({
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
    if(this.formRegister.get('password')!.value == this.formRegister.get('confpassword')!.value){
      return true;
    }
    return false;
  }

}
