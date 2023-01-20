import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/assets/Envoirnments/enviornment.prod';
import { Gender } from '../Models/api-model/gender.model';

@Injectable({
  providedIn: 'root',
})
export class GenderService {
  private BaseUrl= environment.BaseUrl;
  constructor(private _httpClient: HttpClient) {}

  getGenders(): Observable<Gender[]> {
    return this._httpClient.get<Gender[]>(this.BaseUrl + '/Gender/GetGenderList');
  }
}
