import { Component, WritableSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { WeatherService } from './services/weather-service';
import { getConstants } from './utils/constants';
import { DatePipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, DatePipe, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = getConstants('TITLE');
  app_title = getConstants('APP_TITLE');
  emptyCity: boolean = true;
  searchQuery: string = '';
  weatherDetail: string | undefined = '';
  displayWeatherInfo: boolean = false;
  cityName: WritableSignal<string> = signal('');
  date: WritableSignal<Date> = signal(new Date());
  temperature: WritableSignal<string> = signal('');
  feel_temperature: WritableSignal<string> = signal('');
  description: WritableSignal<string> = signal('');
  wind_speed: WritableSignal<string> = signal('');
  weather_icon: WritableSignal<string> = signal('');
  constructor(private weatherService: WeatherService) { }

  searchWeather = () => {
    this.weatherDetail = "";
    if (this.searchQuery && this.searchQuery.length > 2) {
      this.weatherDetail = getConstants('IN_PROGRESS');

      this.weatherService.getWeatherDetail(this.searchQuery).subscribe((results) => {
        console.log(results)
        if (results?.name) {
          this.weatherDetail = "";
          this.displayWeatherInfo = true;
          this.displayWeather(results);
        } else {
          this.weatherDetail = "City not found. Please try again.";
          this.displayWeatherInfo = false;
        }
      }, error => {
        this.displayWeatherInfo = false;
        this.weatherDetail = "City not found. Please try again.";
      });
    } else {
      this.displayWeatherInfo = false;
      this.weatherDetail = "Please enter valid city name"
    }
  }

  displayWeather(data: any) {
    let temp = (data.main.temp - 273.15).toFixed(2);
    let feeltemp = (data.main.feels_like - 273.15).toFixed(2);
    let dateObj = new Date()
    this.cityName.set(data.name);
    this.date.set(dateObj);
    this.temperature.set(`${temp}°C`);
    this.description.set(data.weather[0].description);
    this.wind_speed.set(`Wind Speed: ${data.wind.speed} m/s`);
    this.weather_icon.set(data.weather[0].icon);
    this.feel_temperature .set(`${feeltemp}°C`);
    // $('#weather-info').fadeIn();
  }
}
