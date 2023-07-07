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
  // const data = JSON.parse(localStorage.getItem('newProp')!);
  this.informationService.getTajne(userId).subscribe(
    (data) => {
      const filename = 'tajne.csv';

      // kreiraj zaglavlje
      let csv = 'No., Application,URL,Username,Password\n\n';

      let counter = 1;
      // dodaj tajne u CSV
      data.forEach((tajna: {type: string, username: string, password: string, url: string}) => {
        csv += `${counter}, ${tajna.type}, ${tajna.url}, ${tajna.username}, ${tajna.password}\n`;
        counter++;
      });

      // kreiraj Blob sa CSV podacima
      const blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});

      // prikaži fajl kao preuzimanje
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.download = filename;
      anchor.href = url;
      anchor.click();
      window.URL.revokeObjectURL(url);
    },
    (error) => {
      // Obrada greške
      console.error(error);
    }
  );

  }
}
