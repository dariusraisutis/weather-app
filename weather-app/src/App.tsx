import React from 'react';
import './App.css';
import WeatherProvider, { Weather, ForecastData } from "./services/WeatherProvder";
import config from './config';
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

  private handleButtonClick(event: React.SyntheticEvent<HTMLSpanElement>): void {
    event.preventDefault();
    WeatherProvider.getForcast(this.state.cityName, config.appId, config.forecastByCityUrl)
      .then((result) => {
        this.setState({ weather: WeatherProvider.weatherParser(result) });
      })
      .catch((error: Error | any) => {
        console.log(error);
      });

    WeatherProvider.getForcast(this.state.cityName, config.appId, config.foreCastFiveDays)
      .then((result) => {
        this.setState({ forecast: WeatherProvider.forecastParser(result) });
      })
      .catch((error: Error | any) => {
        console.log(error);
      });
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
