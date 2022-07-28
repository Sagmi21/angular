import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Car } from '../model/data.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  getCars() {
    return this.http.get<Car[]>(`${environment.apiUrl}/cars`)
  }

  getCar(id: number) {
    return this.http.get<Car>(`${environment.apiUrl}/cars/${id}`);
  }

  saveCar(data: Car, id?: number) {
    if (id) {
      return this.http.put(`${environment.apiUrl}/cars/${id}`, data);
    }
    return this.http.post(`${environment.apiUrl}/cars`, data);
  }

  deleteCar(id: number) {
    return this.http.delete(`${environment.apiUrl}/cars/${id}`);
  }
}
