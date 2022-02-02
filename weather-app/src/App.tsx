import React from 'react';
import './App.css';
import WeatherProvider, { Weather, ForecastData } from "./services/WeatherProvder";
import AppContainer from './components/AppContainer';

interface IAppState {
  weather: Weather;
  forecast: ForecastData[];
  cityName: string;
}

export default class App extends React.Component<{}, IAppState> {

  public constructor(props: any) {
    super(props);
    this.state = {
      weather: props.weather,
      forecast: [],
      cityName: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  private handleChange(event: React.SyntheticEvent<HTMLInputElement>): void {
    event.preventDefault();
    if (event.currentTarget.value) {
      this.setState({ cityName: event.currentTarget.value });
    }
  }

  private async handleButtonClick(event: React.SyntheticEvent<HTMLSpanElement>) {
    event.preventDefault();
    try {
      let weatheResult = await WeatherProvider.getCurrentWeather(this.state.cityName);
      let forecastResult = await WeatherProvider.getCurrentWeatherForecast(this.state.cityName);
      this.setState({ 
        weather: WeatherProvider.weatherParser(weatheResult),
        forecast: WeatherProvider.forecastParser(forecastResult)
      });
    } catch (error) {
        throw new Error(error);
    }
  }

  public render(): React.ReactElement<{}> {
    return (
    <AppContainer
      weatherResult={this.state.weather} 
      forecast={this.state.forecast} 
      onChange={this.handleChange}
      onClick={this.handleButtonClick}
    />
    );
  }
}
