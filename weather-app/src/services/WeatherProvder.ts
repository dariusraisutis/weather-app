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
    weatherParser: ({ weather, main: { temp }, wind: { speed }, name, sys: { country }, dt, timezone }: any): Weather => {
        const { description } = weather[0];
        return {
            category: description,
            currentTemperature: temp,
            windSpeed: speed,
            cityName: name,
            country: country,
            currentTime: Utils.weatherDateParser(dt, timezone)
        };
    },
    forecastParser: ({ list, city: { timezone } }: any): ForecastData[] => {
        let forecastData = list.splice(0, 6);
        return forecastData.map(({ main: { temp }, dt }: any) => {
            return {
                temp: temp,
                time: Utils.forecastDateParser(dt, timezone)
            };
        });
    },
    fetchData: async (url: string): Promise<any> => {
        try {
            let data = await fetch(url);

            if (!data || data.status === 404) {
                throw new Error("Did not find any data.");
            } else if (data.status === 401){
                throw new Error("Not authorized. Please check API key.")
            } else if (data.status === 400){
                throw new Error ("Request is not valid.");
            } else if (data.status === 200){
                return data.json();
            } else {
                throw new Error("Unexpected exception.");
            }      
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : String(error));
        }
    }
}

export default WeatherProvider;