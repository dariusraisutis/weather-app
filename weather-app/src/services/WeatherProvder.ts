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
    getCurrentWeather: async (cityName: string): Promise<any> => {
        return await WeatherProvider
            .fetchData(Utils.constructRequestUrl(config.forecastByCityUrl, cityName));    
    },
    getCurrentWeatherForecast: async (cityName: string): Promise<any> => {
        return await WeatherProvider
            .fetchData(Utils.constructRequestUrl(config.forecastFiveDaysUrl, cityName));
    },
    weatherParser: (weatherDataProp: any): Weather => {
        return {
            category: weatherDataProp.weather[0].description,
            currentTemperature: weatherDataProp.main.temp,
            windSpeed: weatherDataProp.wind.speed,
            cityName: weatherDataProp.name,
            country: weatherDataProp.sys.country,
            currentTime: Utils.weatherDateParser(weatherDataProp.dt, weatherDataProp.timezone)
        };
    },
    forecastParser: (weatherData: any): ForecastData[] => {
        let forecastData = weatherData.list.splice(0, 6);
         return forecastData.map((dataItem: any) => {
            return {
                temp: dataItem.main.temp,
                time: Utils.forecastDateParser(dataItem.dt, weatherData.city.timezone)
            };
        });
    },
    fetchData: async (url: string): Promise<any> => {
        try {
            let data = await fetch(url);
            if (!data) throw new Error("Did not receive any data.");

            return data.json();         
        }
        catch (error) {
            throw new Error(error);
        }
    }
}

export default WeatherProvider;