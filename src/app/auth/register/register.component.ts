import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PlayerService } from '../../services/player.service';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { Touchpad } from 'lucide-angular';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, ToastModule, ButtonModule, RippleModule],
  providers: [MessageService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  formRegister = new FormGroup({
    name: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    sex: new FormControl('', [Validators.required]),
    population: new FormControl('', [Validators.required]),
    birthday: new FormControl('', [Validators.required]),
    level: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.pattern(/[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/)]),
    password: new FormControl('', [Validators.required,  Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/)]),
    confpassword: new FormControl('', [Validators.required,  Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/)], ),
  });

  submitted: boolean = false;
  constructor(
    private playerService: PlayerService,
    private messageService: MessageService
  ) { 
  }

  ngOnInit(): void {
    
  }

  sendForms(){

    

    this.submitted = true;
    if(this.confirmPass() && this.formRegister.valid){
      console.log('passwords match');
      
      if(this.formRegister.value.birthday){
        const birth = new Date(this.formRegister.value.birthday);
        const dateBirthday = this.transformDateBirthday(birth);
        
        this.formRegister.value.birthday = dateBirthday;
      }
      
      
      const formData = {...this.formRegister.value};
      delete formData.confpassword;

      this.playerService.newPlayer(formData).subscribe({
        
        next: (res: any) => {
          if (res.status === 201) {  
            console.log('Player created successfully!', res.body);
            this.showSuccess();
            
          } else {
            console.log('Unexpected status code:', res.status);
          }
        },
        error: (err) => {
          let message = err.error.message;
          this.showError(message);
        },
        complete: () => console.info('complete')
      });
    }
  }

  transformDateBirthday(birthday: Date){
    console.log(birthday.getDate().toString().padStart(2, '0'));
    console.log((birthday.getMonth() + 1).toString().padStart(2, '0'));
    console.log(birthday.getFullYear());

    const day = birthday.getDate().toString().padStart(2, '0');
    const mounth = (birthday.getMonth() + 1).toString().padStart(2, '0');
    const year = birthday.getFullYear();

    const birthdayFormated = `${year}-${mounth}-${day}`;
    return birthdayFormated;
  }

  confirmPass():boolean{
    if(this.formRegister.get('password')!.value == this.formRegister.get('confpassword')!.value){
      return true;
    }
    return false;
  }


  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Te has registrado !!!' });
  }

  showError(error: string){
    this.messageService.add({ severity: 'error', summary: 'error', detail: error })
  }

}
