import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertityService } from 'src/app/services/alertity.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { User } from 'src/app/model/user';
import { throwError } from 'rxjs';
import jwt_decode from 'jwt-decode';



@Component({
  selector: 'app-user_login',
  templateUrl: './user_login.component.html',
  styleUrls: ['./user_login.component.css']
})
export class User_loginComponent implements OnInit {

  loginForm!: FormGroup;
  userSubmitted!: boolean;


  constructor(private alertify: AlertityService,
              private router: Router,
              private userService: UserServiceService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required] ),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }


  get username(){
      return this.loginForm.get('username') as FormControl;
    }

  get password(){
      return this.loginForm.get('password') as FormControl;
  }
  token:any ;
  error:any = 'bla';
  onSubmit(){
    console.group(this.loginForm.value);
    this.userSubmitted = true;

    this.userService.logKorisnike(this.userData()).subscribe(x=>{this.token=x;

      if(x == null)
      {
        this.error=null;
      }

    if(this.token.token){
      localStorage.setItem('token', this.token.token);
      const token = this.token.token;
      const decodedToken: any = jwt_decode(token);
      const userId = decodedToken.nameid; 
      console.log(decodedToken);

      console.log('User ID:', userId);
      localStorage.setItem('userId', userId);

      const ime = decodedToken.name;
      localStorage.setItem('Username', ime);

      this.alertify.success('Login successfully!');
      this.router.navigate(['/list']);
    }else {

      this.alertify.error('User usarname or password is wrong!');
    }
    });
  }

  user!: User;
  userData(): User{
    return this.user = {
      korisnickoIme: this.username.value,
      lozinka: this.password.value
    }
  }

  removeError(){
    this.error = 'nemaGreska';
  }

}
