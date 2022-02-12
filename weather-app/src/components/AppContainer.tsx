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
    error: boolean;
    errorMessage: string;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
const AppContainer = ({ 
        weather, 
        forecast, 
        isButtonDisabled, 
        error, 
        errorMessage, 
        onInputChange, 
        onButtonClick
     }: IAppContainerProps): JSX.Element => {
    return <>
        <CssBaseline />
        <Container maxWidth={"xs"} fixed={true}>
            <CustomHeader text={"Weather App"} />
            <CustomInput onChange={onInputChange} label={"City Name"} id={""} error={error} errorMessage={errorMessage} />
            <CustomButton onClick={onButtonClick} label={"Click Me"} isDisabled={isButtonDisabled} />
            {
                weather
                    ? <WeatherCard weather={weather} />
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