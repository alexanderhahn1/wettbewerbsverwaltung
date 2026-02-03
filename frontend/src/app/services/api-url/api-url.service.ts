import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlService {
  isDev: boolean = false;

  public getApiUrl(): string {
    if (this.isDev) {
      return "http://localhost:8080/api";
    } else {
      return "https://it210182.cloud.htl-leonding.ac.at/api"
    }
  }
}
