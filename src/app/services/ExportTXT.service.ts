import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InformationService } from './information.service';

@Injectable({
  providedIn: 'root'
})
export class ExportTXTService {

constructor(private http:HttpClient,
            private informationService: InformationService) { }

exportTajne(userId: number) {
  this.informationService.getTajne(userId).subscribe(
    (data) => {
      const filename = 'tajne.txt';

      let text = '';

      
      data.forEach((tajna: {type: string, username: string, password: string, url: string}) => {
        text += `Application: ${tajna.type}\n`;
        text += `URL: ${tajna.url}\n`;
        text += `Username: ${tajna.username}\n`;
        text += `Password: ${tajna.password}\n\n`;
      });

      
      const blob = new Blob([text], {type: 'text/plain;charset=utf-8;'});

      
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
