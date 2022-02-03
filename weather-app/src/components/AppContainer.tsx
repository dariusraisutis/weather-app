import React from "react";
import { CssBaseline, Container } from "@material-ui/core";
import { Weather, ForecastData } from "../services/WeatherProvder";
import CustomHeader from "./CustomHeader";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton"
import WeatherCard from "./WeatherCard";
import CustomGraph from "./CustomGraph";

interface IAppContainerProps {
    weather?: Weather;
    forecast: ForecastData[];
    isButtonDisabled: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClick: (event: React.MouseEvent<HTMLSpanElement>) => void;
    error: boolean;
    errorMessage: string;
}
const AppContainer = ({ weather: weatherResult, forecast, isButtonDisabled, error, errorMessage, onChange, onClick }: IAppContainerProps): JSX.Element => {
    return <>
        <CssBaseline />
        <Container maxWidth={"xs"} fixed={true}>
            <CustomHeader text={"Weather App"} />
            <CustomInput onChange={onChange} label={"City Name"} id={""} error={error} errorMessage={errorMessage} />
            <CustomButton onClick={onClick} label={"Click Me"} isDisabled={isButtonDisabled} />
            {
                weatherResult
                    ? <WeatherCard weather={weatherResult} />
                    : null
            }
            { 
                forecast.length ? 
                    <CustomGraph data={forecast} /> 
                    : null
            }
        </Container>
    </>
}

export default AppContainer;