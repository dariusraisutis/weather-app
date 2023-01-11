import React, { useState } from 'react';
import './App.css';
import WeatherProvider, { ForecastData, Weather } from "./services/WeatherProvder";
import AppContainer from './components/AppContainer';

const App = (): JSX.Element => {
  const [weather, setWeather] = useState<Weather | undefined>(undefined);
  const [forecast, setForecast] = useState<ForecastData[] | []>([]);
  const [cityName, setCityName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);

  const handleInputChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { currentTarget: { value } } = event;

    if (error){
      setError(false);
      setErrorMessage('');
    } 

    setCityName(value);
  }

  const handleButtonClick = async (event: React.SyntheticEvent<HTMLButtonElement>): Promise<void> => {
    event.preventDefault();
    try {
      let weatherResult = await WeatherProvider.getCurrentWeather(cityName);
      let forecastResult = await WeatherProvider.getCurrentWeatherForecast(cityName);
      setWeather(WeatherProvider.weatherParser(weatherResult));
      setForecast(WeatherProvider.forecastParser(forecastResult));
    } catch (error) {
        setError(true);
        setErrorMessage(error instanceof Error ? error.message : String(error));
        setWeather(undefined);
        setForecast([]);
    }
  }

  return (
    <>
      <AppContainer
        weather={weather}
        forecast={forecast} 
        isButtonDisabled={!cityName || error}
        onInputChange={handleInputChange}
        onButtonClick={handleButtonClick}
        error={error}
        errorMessage={errorMessage} />
    </>
  )
}

export default App;