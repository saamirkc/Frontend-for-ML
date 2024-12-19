// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class ConnectService {
//   private apiUrl = 'http://127.0.0.1:8000/predict';  // Replace with your FastAPI URL
//
//   constructor(private http: HttpClient) { }
//
//   uploadImage(file: File): Observable<any> {
//     const formData = new FormData();
//     formData.append('file', file, file.name);
//
//     // Send POST request to FastAPI server
//     return this.http.post<any>(this.apiUrl, formData, {
//       headers: new HttpHeaders(),
//       responseType: 'blob' as 'json'
//     });
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectService {
  private apiUrl = 'http://127.0.0.1:8000/predict';

  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<any>(this.apiUrl, formData);
  }
}

