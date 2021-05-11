import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NbuService {
  uri = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange';
  constructor(private httpClient: HttpClient) {
  }
  getExchacngeRate(currency: string, year: string): Observable<any> {
    return this.httpClient.get(`${this.uri}?valcode=${currency}&date=${year}&json`);
  }
}
