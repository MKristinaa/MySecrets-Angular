import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// export class korisnik{

//   username?:string;
//   password?:string


//   }
export class UserServiceService {

constructor(private http: HttpClient) { }


public postKorisnike(kori: User): Observable<any> {
  const url = 'http://mkristina-001-site1.dtempurl.com/register'
  return this.http.post<User>(url,kori);
}


public logKorisnike(kor: any): Observable<any> {
  const url = 'http://mkristina-001-site1.dtempurl.com/login';
  return this.http.post<User>(url,kor);
}

}


