import React from 'react';
import './App.css';
import WeatherCard from "./components/WeatherCard";
import WeatherProvider, { Weather, ForecastData } from "./services/WeatherProvder";
import config from './config';
import CustomInput from './components/CustomInput';
import CustomButton from './components/CustomButton';
import CustomHeader from "./components/CustomHeader";
import CustomContainer from "./components/CustomContainer";
import CustomGraph from "./components/CustomGraph";

interface IAppState {
  weatherResult: Weather[];
  forecast: ForecastData[];
  cityName: string;
}


export default class App extends React.Component<{}, IAppState> {

  public constructor(props: any) {
    super(props);
    this.state = {
      weatherResult: [],
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
        this.setState({ weatherResult: WeatherProvider.weatherParser(result) });
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
      <div className={"App"}>

        <CustomContainer/>
        <CustomHeader text={"Weather App"} />
        <CustomInput onChange={this.handleChange} label={"City Name"} id={""} error={false} />
        <CustomButton onClick={this.handleButtonClick} label={"Go"} />
        <div>
          {
            this.state.weatherResult ?
              this.state.weatherResult.map((current, key) => {
                return <WeatherCard
                  temp={current.currentTemperature}
                  category={current.category}
                  windSpeed={current.windSpeed}
                  cityName={current.cityName}
                  country={current.country}
                  currentTime={current.currentTime}
                  key={key}
                />
              })
              : null
          }
          { this.state.forecast.length ? <CustomGraph data={this.state.forecast} /> : null }
        </div>
      </div>
    );
  }
}
