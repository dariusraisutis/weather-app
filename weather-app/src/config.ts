export interface IConfig {
    appId: string;
    cityNamePlaceHolder: string;
    forecastByCityUrl: string;
    appIdPlaceHolder: string;
}

let config: IConfig = require('./config.json');
export default config as IConfig;