import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  // 🔑 USE YOUR REAL API KEY HERE
  private API_KEY = 'a8cee239a0b77655c0288420bee98632';
  private BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  // 🌍 Weather by City
  getWeatherByCity(city: string): Observable<any> {
    return this.http.get<any>(
      `${this.BASE_URL}?q=${city}&units=metric&appid=${this.API_KEY}`
    );
  }

  // 📍 Weather by GPS Coordinates
  getWeatherByCoords(lat: number, lon: number): Observable<any> {
    return this.http.get<any>(
      `${this.BASE_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${this.API_KEY}`
    );
  }
}
