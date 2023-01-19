import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gender } from '../Models/api-model/gender.model';

@Injectable({
  providedIn: 'root',
})
export class GenderService {
  private baseApiUrl = 'https://localhost:44395/api/Gender';
  constructor(private _httpClient: HttpClient) {}

  getGenders(): Observable<Gender[]> {
    return this._httpClient.get<Gender[]>(this.baseApiUrl + '/GetGenderList');
  }
}
