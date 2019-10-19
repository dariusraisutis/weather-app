import React from 'react';
import './App.css';
import WeatherCard from "./components/WeatherCard";
import WeatherProvider, { Weather } from "./services/WeatherProvder";
import config from './config';
import CustomInput from './components/CustomInput';
import CustomButton from './components/CustomButton';
import CustomHeader from "./components/CustomHeader";

interface IAppState {
  weatherResult: Weather[];
  cityName: string;
}


export default class App extends React.Component<{}, IAppState> {

  public constructor(props: any) {
    super(props);
    this.state = {
      weatherResult: [],
      cityName: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  private handleChange(event: React.SyntheticEvent<HTMLInputElement>): void {
    event.preventDefault();
    if(event.currentTarget.value) {
      this.setState({cityName: event.currentTarget.value});
    }
  }

  private handleButtonClick(event: React.SyntheticEvent<HTMLSpanElement>): void {
    event.preventDefault();
    WeatherProvider.forecastByCityName(this.state.cityName, config.appId)
    .then((result) => {
      this.setState({weatherResult: WeatherProvider.weatherParser(result)});
    })
    .catch((error: Error | any) => {
      console.log(error);
    });
  }

  public render(): React.ReactElement<{}> {
    return (
      <div className={"App"}>
        <CustomHeader text={"Weather App"}/>
        <CustomInput onChange={this.handleChange} label={"City Name"} id={""}/>
        <CustomButton onClick={this.handleButtonClick} label={"Get Weather"}/>
        <div>
          {
            this.state.weatherResult ?
              this.state.weatherResult.map((current, key) => {
                return <WeatherCard
                  temp={current.currentTemperature}
                  category={current.category}
                  windSpeed={current.windSpeed}
                  averageTemperature={current.averageTemperature}
                  cityName={current.cityName}
                  key={key}
                />
              })
              : null
          }
        </div>
      </div>
    );
  }
}
