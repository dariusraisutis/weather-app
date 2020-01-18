import config from "../config";
import Utils from "../utils/Utils";

export type Weather = {
    currentTemperature: number;
    category: string;
    windSpeed: number;
    weekDay?: string;
    cityName: string;
    country: string;
    currentTime: string;
}

export type ForecastData = {
    temp: number;
    time: string;
}

const WeatherProvider = {
    getForcast: (cityName: string, appId: string, requestUrl: string): Promise<any> => {
        return new Promise<any>((resolve, reject) => {
            if (!cityName || !appId || !requestUrl) {
                reject(">>> City name, appId or request url was not provided!");
            } else {
                let url = requestUrl.replace(config.cityNamePlaceHolder, cityName).replace(config.appIdPlaceHolder, appId);
                fetch(url)
                    .then((result: Response) => {
                        resolve(result.json());
                    })
                    .catch((error: Error | any) => {
                        reject(error);
                    });
            }
        });
    },
    weatherParser: (weatherData: any): Weather[] => {
        let weather: Weather[] = [];

        if(!weather){
            return weather;
        }

        let currentweatherData: Weather = {
            category: weatherData.weather[0].description,
            currentTemperature: weatherData.main.temp,
            windSpeed: weatherData.wind.speed,
            cityName: weatherData.name,
            country: weatherData.sys.country,
            currentTime: Utils.weatherDateParser(weatherData.dt, weatherData.timezone)
        };
        weather.push(currentweatherData);
        
        return weather;
    },
    forecastParser: (weatherData: any): ForecastData[] => {
        let forecast: ForecastData[] = [];

        if (!weatherData) {
            return forecast;
        }

        let forecastData = weatherData.list.splice(0, 6);
        forecastData.map((current: any) => {
            let forecastByHour: ForecastData = {
                temp: current.main.temp,
                time: Utils.forecastDateParser(current.dt, weatherData.city.timezone)
            };
            forecast.push(forecastByHour);
        });
        
        return forecast;
    }
}

export default WeatherProvider;