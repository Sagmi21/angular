import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Computer } from '../model/data.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {
  constructor(private http: HttpClient) {}

  getComputers() {
    return this.http.get<Computer[]>(`${environment.apiUrl}/computers`);
  }

  getComputer(id: number) {
    return this.http.get<Computer>(`${environment.apiUrl}/computers/${id}`);
  }

  saveComputer(data: Computer, id?: number) {
    if (id) {
      return this.http.put(`${environment.apiUrl}/computers/${id}`, data);
    }
    return this.http.post(`${environment.apiUrl}/computers`, data);
  }

  deleteComputer(id: number) {
    return this.http.delete(`${environment.apiUrl}/computers/${id}`);
  }

}
