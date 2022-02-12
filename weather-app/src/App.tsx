import React from 'react';
import './App.css';
import WeatherProvider, { Weather, ForecastData } from "./services/WeatherProvder";
import AppContainer from './components/AppContainer';

interface IAppState {
  weather?: Weather;
  forecast: ForecastData[];
  cityName: string;
  error: boolean;
  errorMessage: string;
}

export default class App extends React.Component<{}, IAppState> {
  public constructor(props: any) {
    super(props);
    this.state = {
      weather: undefined,
      forecast: [],
      cityName: "",
      error: false,
      errorMessage: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  private handleInputChange(event: React.SyntheticEvent<HTMLInputElement>): void {
    event.preventDefault();
    const { currentTarget: { value } } = event;
    const { error } = this.state;
    if (error){
      this.setState({ error: false, errorMessage: "" });
    } 

    this.setState({ cityName: value });
  }

  private async handleButtonClick(event: React.SyntheticEvent<HTMLButtonElement>): Promise<void> {
    event.preventDefault();
    try {
      const { cityName } = this.state;
      let weatherResult = await WeatherProvider.getCurrentWeather(cityName);
      let forecastResult = await WeatherProvider.getCurrentWeatherForecast(cityName);
      this.setState({ 
        weather: WeatherProvider.weatherParser(weatherResult),
        forecast: WeatherProvider.forecastParser(forecastResult)
      });
    } catch (error) {
        this.setState({ error: true, errorMessage: error.message, weather: undefined, forecast: [] });
    }
  }

  public render(): React.ReactElement<{}> {
    const { weather, forecast, cityName, error, errorMessage } = this.state;
    return (
    <AppContainer
      weather={weather} 
      forecast={forecast} 
      isButtonDisabled={!cityName || error}
      onInputChange={this.handleInputChange}
      onButtonClick={this.handleButtonClick}
      error={error}
      errorMessage={errorMessage}
    />
    );
  }
}
