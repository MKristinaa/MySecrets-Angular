import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { UserServiceService } from 'src/app/services/user-service.service';
import { AlertityService } from 'src/app/services/alertity.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user_register',
  templateUrl: './user_register.component.html',
  styleUrls: ['./user_register.component.css']
})
export class User_registerComponent implements OnInit {

  registerForm!: FormGroup;
  user!: User;
  userSubmitted?: boolean;

  constructor(private fb: FormBuilder,
              public userService: UserServiceService,
              private alertity: AlertityService,
              private router: Router) { }

  ngOnInit() {
    this.createRegistrationForm();
  }

  createRegistrationForm(){
    this.registerForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(8)]]
    })
  }

  get username(){
    return this.registerForm.get('username') as FormControl;
  }

  get password(){
    return this.registerForm.get('password') as FormControl;
  }

  korisnik:any;

  onSubmit(){
    console.log(this.registerForm.value);
    this.userSubmitted = true;

    if(this.registerForm.valid){
      this.userService.postKorisnike(this.userData()).subscribe(x =>{this.korisnik=x});
      this.registerForm.reset();
      this.userSubmitted = false;
      this.alertity.success('Congrats, you are successfully registered!');
      this.router.navigate(['/']);

    }else{
      this.alertity.error('Kindly provide the required fields');
    }
  }




  userData(): User{
    return this.user = {
      korisnickoIme: this.username.value,
      lozinka: this.password.value
    }
  }

}
