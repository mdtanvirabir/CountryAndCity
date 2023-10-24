import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City, CityResponse, Country, CountryResponse, LoginRequestModel, LoginResult } from '../models/commonmodel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'https://localhost:40443';
  private readonly AUTH_TOKEN_HEADER = 'Authorization';

  getHeadersWithAuthToken(): HttpHeaders {
    const authToken = localStorage.getItem('auth_token'); // Change the key to 'auth_token'
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      [this.AUTH_TOKEN_HEADER]: `Bearer ${authToken}`
    });
    return headers;
  }
  
  login(model: LoginRequestModel) {
    return this.http.post<LoginResult>(this.baseUrl + '/api/Account/Login', model);
  }
  getCountries(): Observable<CountryResponse> {
    return this.http.get<CountryResponse>(`${this.baseUrl}/api/Countries`);
  }

  postCountry(country: Country): Observable<Country> {
    return this.http.post<Country>(`${this.baseUrl}/api/Countries`, country);
  }

  updateCountry(countryId: number, updatedCountry: Country): Observable<Country> {
    const url = `${this.baseUrl}/api/Countries/${countryId}`;
    return this.http.put<Country>(url, updatedCountry);
  }

  getCountryById(id: number): Observable<Country> {
    const url = `${this.baseUrl}/api/Countries/${id}`;
    return this.http.get<Country>(url);
  }

  deleteCountry(countryId: number): Observable<any> {
    const url = `${this.baseUrl}/api/Countries/${countryId}`;
    return this.http.delete(url);
  }


  getCities(): Observable<CityResponse> {
    return this.http.get<CityResponse>(`${this.baseUrl}/api/Cities`);
  }
 
  postCity(city: City): Observable<City> {
    return this.http.post<City>(`${this.baseUrl}/api/Cities`, city);
  }
  putCity(city: City): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/api/Cities/${city.id}`, city);
  }

  getCityById(id: number): Observable<City> {
    const url = `${this.baseUrl}/api/Cities/${id}`;
    return this.http.get<City>(url);
  }
  deleteCity(cityId: number): Observable<any> {
    const url = `${this.baseUrl}/api/Cities/${cityId}`;
    return this.http.delete(url);
  }
}
