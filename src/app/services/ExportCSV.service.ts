import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InformationService } from './information.service';

@Injectable({
  providedIn: 'root'
})
export class ExportCSVService {

constructor(private http:HttpClient,
            private informationService: InformationService) { }



exportTajne(userId:number) {
  this.informationService.getTajne(userId).subscribe(
    (data) => {
      const filename = 'tajne.csv';

      let csv = 'No., Application,URL,Username,Password\n\n';

      let counter = 1;
      
      data.forEach((tajna: {type: string, username: string, password: string, url: string}) => {
        csv += `${counter}, ${tajna.type}, ${tajna.url}, ${tajna.username}, ${tajna.password}\n`;
        counter++;
      });

      
      const blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});

      
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.download = filename;
      anchor.href = url;
      anchor.click();
      window.URL.revokeObjectURL(url);
    },
    (error) => {
      
      console.error(error);
    }
  );

  }
}
