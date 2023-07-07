
import { Component, OnInit } from '@angular/core';
import { Information } from 'src/app/model/information';
import { ExportTXTService } from 'src/app/services/ExportTXT.service';
import { ExportCSVService } from 'src/app/services/ExportCSV.service';
import { InformationService } from 'src/app/services/information.service';
import { AES } from 'crypto-js';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  allInfo: Information[] = [];
  imeParametar!: string;
  sortDirection ='asc';
  len?: Information[] = [];
  page:any=1;
  pageSizee:any=2;


  constructor(private exportTXTService: ExportTXTService,
              private exportCSVService: ExportCSVService,
              private info:InformationService) { }


  ngOnInit() {
    let userId = +localStorage.getItem('userId')!;

    this.info.page(this.page,this.pageSizee).subscribe(x => {
      this.allInfo = x;
      console.log(this.allInfo)
    });

    this.info.getTajne(userId).subscribe(res =>{this.len = res;
      console.log(this.len?.length);
      }
      );

  }


  //FILTER
  submit() {
    console.log(this.imeParametar);
    this.info.searchTajne(this.imeParametar).subscribe((x) => {
      this.allInfo = x;
    });
  }



  //SORT
  sortDescending(){
    let userId = +localStorage.getItem('userId')!;
    this.sortDirection = 'desc';
    this.info.getDescTajne(this.page, this.pageSizee).subscribe(res =>
      this.allInfo = res);
  }
  sortAscending(){
    let userId = +localStorage.getItem('userId')!;
    this.sortDirection = 'asc';
    this.info.page(this.page, this.pageSizee).subscribe(res =>
      this.allInfo = res);
  }




  //PAGING
  nextPage(){
    if(this.page < this.len!.length / 2 ){
    this.page++;
    this.info.page(this.page,this.pageSizee).subscribe(x => {
      this.allInfo = x;
    });}
  }

  prevPage(){
    if(this.page>1){
    this.page--;
    this.info.page(this.page,this.pageSizee).subscribe(x => {
      this.allInfo = x;
    });}

  }


  //EXPORT
  exportTXTTajne() {
    let userId = +localStorage.getItem('userId')!;
    this.exportTXTService.exportTajne(userId);
  }
  exportCSVTajne(){
    let userId = +localStorage.getItem('userId')!;
    this.exportCSVService.exportTajne(userId);
  }



  //PASSWORD DESCRYPTOR
  showPassword: boolean = false;
  selectedRow: number | null = null;

  togglePassword(index: number) {
    if (this.selectedRow === index) {
      this.selectedRow = null;
    } else {
      this.selectedRow = index;
    }
    this.showPassword = !this.showPassword;
  }

  decryptPassword(encryptedPassword: string): string {
    const key = 'kljuc'; // Ključ za dešifrovanje
    const decryptedPasswordBytes = AES.decrypt(encryptedPassword, key);
    const decryptedPassword = decryptedPasswordBytes.toString(CryptoJS.enc.Utf8);
    return decryptedPassword;
  }
 }
