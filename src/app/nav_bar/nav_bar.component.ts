import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertityService } from '../services/alertity.service';

@Component({
  selector: 'app-nav_bar',
  templateUrl: './nav_bar.component.html',
  styleUrls: ['./nav_bar.component.css']
})
export class Nav_barComponent implements OnInit {

  loggedinUser?: string;
  constructor(private alertify: AlertityService,
              private router: Router) { }

  ngOnInit() {
  }

  loggedin(){
    const item = localStorage.getItem('Username');
    if(item){
      this.loggedinUser = item;
    }
    return this.loggedinUser;
  }

  onLogout(){
    localStorage.removeItem('token');
    this.loggedinUser = '';
    this.alertify.success('You are logged out!');
    this.router.navigate(['/']);
  }

}
