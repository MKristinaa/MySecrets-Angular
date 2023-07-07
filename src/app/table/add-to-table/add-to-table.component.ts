import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Information } from 'src/app/model/information';
import { AlertityService } from 'src/app/services/alertity.service';
import { InformationService } from 'src/app/services/information.service';
import { AES } from 'crypto-js';

@Component({
  selector: 'app-add-to-table',
  templateUrl: './add-to-table.component.html',
  styleUrls: ['./add-to-table.component.css']
})
export class AddToTableComponent implements OnInit {

  addForm!: FormGroup;
  infoSubmitted: boolean = false;
  info!: Information;

  constructor(private fb: FormBuilder,
              private alertify: AlertityService,
              private router: Router,
              private infoService: InformationService) { }

  ngOnInit() {
    this.createAddInfo();
  }

  createAddInfo(){
    this.addForm = this.fb.group({
      application: [null, Validators.required],
      url: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  get application(){
    return this.addForm.get('application') as FormControl;
  }
  get url(){
    return this.addForm.get('url') as FormControl;
  }
  get username(){
    return this.addForm.get('username') as FormControl;
  }
  get password(){
    return this.addForm.get('password') as FormControl;
  }
num:any;

  onSubmit(){
    console.log(this.addForm.value);
    this.infoSubmitted = true;

    if(this.addForm.valid){
      this.infoService.postTajne(this.mapInfo()).subscribe(x=>{this.num=x});
      this.addForm.reset();
      this.infoSubmitted = false;
      this.alertify.success('Your secret is saved!');

    }else{
      this.alertify.error('Please fill all fields!');
    }
  }

  mapInfo(): Information{

    let userId = Number(localStorage.getItem('userId'));
    console.log(userId);

    // Šifrovanje unetog passworda
    const key = 'kljuc'; // Ključ za šifrovanje
    const encryptedPassword = AES.encrypt(this.password.value, key).toString();

  return this.info = {
    idKorisnika: userId ,
    type: this.application.value,
    url: this.url.value,
    username: this.username.value,
    password: encryptedPassword
   }
  }


}
