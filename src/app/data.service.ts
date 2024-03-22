import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { 

  }
  sendData(data:any): Observable <any>{
    return this.http.post<any>('http://localhost:3000/employees',data)


  }

  getData():Observable<any>{
    return this.http.get<any>('http://localhost:3000/employees')

  }

  updateEmployee(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${'http://localhost:3000/employees'}/${id}`, data);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete<any>(`${'http://localhost:3000/employees'}/${id}`);
  }




}
