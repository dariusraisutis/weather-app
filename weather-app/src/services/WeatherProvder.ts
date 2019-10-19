import config from "../config";

export type Weather = {
    currentTemperature: number;
    category: string;
    averageTemperature?: number;
    windSpeed: number;
    weekDay?: string;
    cityName: string;
}

const WeatherProvider = {
    forecastByCityName: (cityName: string, appId: string): Promise<any> => {
        return new Promise<any>((resolve, reject) => {
            if (cityName && appId) {
                let url = config.forecastByCityUrl.replace(config.cityNamePlaceHolder, cityName).replace(config.appIdPlaceHolder, appId);
                fetch(url)
                    .then((result: Response) => {
                        resolve(result.json());
                    })
                    .catch((error: Error | any) => {
                        reject(error);
                    })
            } else {
                reject(">>> City name or appId was not provided!")
            }
        });
    },
    weatherParser: (weatherData: any): Weather[] => {
        let weather: Weather[] = [];
        if (weatherData) {
            let currentweatherData: Weather = {
                category: weatherData.weather[0].description,
                currentTemperature: weatherData.main.temp,
                windSpeed: weatherData.wind.speed,
                cityName: weatherData.name
            };
            weather.push(currentweatherData);
        }
    
        return weather;
    }
}

export default WeatherProvider;