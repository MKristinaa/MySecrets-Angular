import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Information } from '../model/information';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class InformationService {

  constructor(private http: HttpClient) { }

  public getTajne(userId: number): Observable<any> {
    // const url = `http://mkristina-001-site1.dtempurl.com/api/Tajne/tajneById/${userId}`;
    const url = `https://localhost:7082/api/Tajne/tajneById/${userId}`;
    return this.http.get<any>(url, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: 'bearer ' + localStorage.getItem("token"),
      },
    });
  }

  public getDescTajne(page: number, pageSize: number): Observable<any> {
    let userId = Number(localStorage.getItem('userId'));
    // const url = `http://mkristina-001-site1.dtempurl.com/api/Tajne/tajneDESC/${page}/${pageSize}/${userId}`;
    const url = `https://localhost:7082/api/Tajne/tajneDESC/${page}/${pageSize}/${userId}`;
    return this.http.get<any>(url, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: 'bearer ' + localStorage.getItem("token"),
      },
    });
  }

  public postTajne(tajna: Information): Observable<any> {
    // const url = 'http://mkristina-001-site1.dtempurl.com/api/Tajne/dodajTajnu';
    const url = 'https://localhost:7082/api/Tajne/dodajTajnu';
    return this.http.post<any>(url, tajna, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: 'bearer ' + localStorage.getItem("token"),
      },
    });
  }

  public searchTajne(ime: string): Observable<any> {
    let userId = Number(localStorage.getItem('userId'));
    // const url = `http://mkristina-001-site1.dtempurl.com/api/Tajne/tajne/SearchPost/${ime}?id=${userId}`;
    const url = `https://localhost:7082/api/Tajne/tajne/SearchPost/${ime}?id=${userId}`;
    return this.http.get<any>(url, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: 'bearer ' + localStorage.getItem("token"),
      },
    });
  }

  public page(page: number, pageSize: number): Observable<any> {
    let userId = Number(localStorage.getItem('userId'));
    // const url = `http://mkristina-001-site1.dtempurl.com/api/Tajne/tajne/Page/${page}/${pageSize}/${userId}`;
    const url = `https://localhost:7082/api/Tajne/tajne/Page/${page}/${pageSize}/${userId}`;
    return this.http.get<any>(url, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: 'bearer ' + localStorage.getItem("token"),
      },
    });
  }
}
