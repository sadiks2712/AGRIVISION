import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-alert.html',
  styleUrls: ['./weather-alert.css']
})
export class WeatherAlertComponent implements OnInit {

  // ================== STATE ==================
  weather: any = null;
  forecast: any[] = [];          // 📅 weekly forecast
  alertMessage = '';
  loading = true;
  error = '';

  // animation flags
  showRain = false;
  showClouds = true;

  constructor(
    private weatherService: WeatherService,
    private cdr: ChangeDetectorRef
  ) {}

  // ================== INIT ==================
  ngOnInit(): void {
    this.getWeatherByLocation();
  }

  /* =====================================
     GET WEATHER (GPS → CITY FALLBACK)
  ====================================== */
  getWeatherByLocation(): void {
    if (!navigator.geolocation) {
      this.getWeatherByCity('Pune');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;

        this.weatherService.getWeatherByCoords(latitude, longitude).subscribe({
          next: (data: any) => this.handleWeatherSuccess(data),
          error: () => this.getWeatherByCity('Pune')
        });
      },
      () => this.getWeatherByCity('Pune')
    );
  }

  /* =====================================
     CITY FALLBACK
  ====================================== */
  getWeatherByCity(city: string): void {
    this.weatherService.getWeatherByCity(city).subscribe({
      next: (data: any) => this.handleWeatherSuccess(data),
      error: () => this.handleError()
    });
  }

  /* =====================================
     SUCCESS HANDLER
  ====================================== */
  handleWeatherSuccess(data: any): void {
    this.weather = data;
    this.loading = false;

    this.generateAlert();
    this.setWeatherEffects();
    this.generateWeeklyForecast();

    this.cdr.detectChanges();
  }

  /* =====================================
     FARMER ALERT LOGIC
  ====================================== */
  generateAlert(): void {
    if (!this.weather) return;

    const temp = this.weather.main?.temp ?? 0;
    const condition = this.weather.weather?.[0]?.main ?? '';
    const rain = this.weather.rain?.['1h'] || 0;

    if (condition === 'Thunderstorm') {
      this.alertMessage =
        '⛈️ Storm alert. Secure equipment and avoid open fields.';
    } else if (rain > 10 || condition === 'Rain') {
      this.alertMessage =
        '🌧️ Rainfall expected. Avoid pesticide spraying today.';
    } else if (temp >= 40) {
      this.alertMessage =
        '🔥 Heat wave alert. Irrigate crops early morning or evening.';
    } else if (temp <= 5) {
      this.alertMessage =
        '❄️ Frost warning. Cover crops overnight to prevent damage.';
    } else {
      this.alertMessage =
        '✅ Weather conditions are normal. Farming activities are safe.';
    }
  }

  /* =====================================
     WEATHER ANIMATION LOGIC
  ====================================== */
  setWeatherEffects(): void {
    const condition = this.weather.weather?.[0]?.main ?? '';

    this.showRain =
      condition === 'Rain' ||
      condition === 'Drizzle' ||
      condition === 'Thunderstorm';

    this.showClouds =
      condition === 'Clouds' ||
      condition === 'Rain' ||
      condition === 'Drizzle';
  }

  /* =====================================
     WEEKLY FORECAST (DEMO / PLACEHOLDER)
     Replace later with OpenWeather OneCall API
  ====================================== */
  generateWeeklyForecast(): void {
    const icons = ['☀️', '⛅', '🌧️', '🌦️', '☁️'];
    const baseTemp = this.weather?.main?.temp ?? 30;

    this.forecast = Array.from({ length: 7 }, (_, i) => ({
      day: new Date(Date.now() + i * 86400000)
        .toLocaleDateString('en-US', { weekday: 'short' }),
      temp: Math.round(baseTemp + (Math.random() * 4 - 2)),
      icon: icons[Math.floor(Math.random() * icons.length)]
    }));
  }

  /* =====================================
     ERROR HANDLER
  ====================================== */
  handleError(): void {
    this.loading = false;
    this.error = 'Unable to fetch weather data. Please try again later.';
    this.cdr.detectChanges();
  }
}
