// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor(private router:Router) { }

//   addUsername(username:string){
//     localStorage.setItem('username',username);
//   }

//   addAccessToken(accessToken:string){
//     localStorage.setItem('accessToken',accessToken);
//   }

//   addRefreshToken(refToken:string){
//     localStorage.setItem('refreshToken',refToken);
//   }

//   getAccessToken(){
//     return localStorage.getItem('accessToken');
//   }

//   getUsername(){
//     return localStorage.getItem('username');
//   }

//   getRefreshToken(){
//     return localStorage.getItem('refreshToken');
//   }

//   isLoggedIn(){
//     return !!this.getAccessToken() && !this.isTokenExpired()
//   }

//   isTokenExpired(){
//     const token: string=this.getAccessToken()??"";
//         if(!token)
//           return false;
//         const tokenSplit:string=token.split('.')[1];
//         const decodedString:string=atob(tokenSplit);
//         const jsonString=JSON.parse(decodedString);
//         const expiry = (jsonString).exp;
//         return (Math.floor((new Date).getTime() / 1000)) >= expiry;
//   }

//   logout(){
//     localStorage.removeItem("username");
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     this.router.navigate(['/login']);
//   }

// }

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginResult } from '../models/commonmodel'; // Import the LoginResult interface

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) { }
  baseUrl: string = 'https://localhost:40443';
  addUsername(username: string) {
    localStorage.setItem('username', username);
  }

  // addAccessToken(accessToken: string) {
  //   localStorage.setItem('accessToken', accessToken);
  // }

  

  addAccessToken(accessToken: string) {
    localStorage.setItem('auth_token', accessToken); // Change the key to 'auth_token'
  }

  getAccessToken() {
    return localStorage.getItem('auth_token'); // Change the key to 'auth_token'
  }

  getUsername() {
    return localStorage.getItem('username');
  }

  

  login(credentials: { Email: string, Password: string }): Observable<LoginResult> {
    return this.http.post<LoginResult>(this.baseUrl + '/api/Account/Login', credentials)
      .pipe(
        tap(response => {
          if (response.success) {
            this.addAccessToken(response.token || ''); // Add the token to local storage
            this.addUsername(credentials.Email); // Store the username using the provided Email
          }
        })
      );
  }
  

  isLoggedIn(): boolean {
    return !!this.getAccessToken() && !this.isTokenExpired();
  }

  isTokenExpired(): boolean {
    const token: string = this.getAccessToken() ?? '';
    if (!token) {
      return false;
    }
    const tokenSplit: string = token.split('.')[1];
    const decodedString: string = atob(tokenSplit);
    const jsonString = JSON.parse(decodedString);
    const expiry = jsonString.exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refreshToken');
    this.router.navigate(['/login']);
  }
}
