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
    const { currentTarget: { value } } = event;
    if (!value){
      this.setState({ cityName : ""})
    } else {
      this.setState({ cityName: value });
    }
  }

  private async handleButtonClick(event: React.SyntheticEvent<HTMLSpanElement>): Promise<void> {
    event.preventDefault();
    try {
      const { cityName } = this.state;
      let weatheResult = await WeatherProvider.getCurrentWeather(cityName);
      let forecastResult = await WeatherProvider.getCurrentWeatherForecast(cityName);
      this.setState({ 
        weather: WeatherProvider.weatherParser(weatheResult),
        forecast: WeatherProvider.forecastParser(forecastResult)
      });
    } catch (error) {
        throw new Error(error);
    }
  }

  public render(): React.ReactElement<{}> {
    console.log(this.state)
    return (
    <AppContainer
      weatherResult={this.state.weather} 
      forecast={this.state.forecast} 
      isButtonDisabled={!this.state.cityName}
      onChange={this.handleChange}
      onClick={this.handleButtonClick}
    />
    );
  }
}
