import React from "react";
import { CssBaseline, Container } from "@material-ui/core";
import { Weather, ForecastData } from "../services/WeatherProvder";
import CustomHeader from "./CustomHeader";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton"
import WeatherCard from "./WeatherCard";
import CustomGraph from "./CustomGraph";

interface IAppContainerProps {
    weatherResult: Weather;
    forecast: ForecastData[];
    isButtonDisabled: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClick: (event: React.MouseEvent<HTMLSpanElement>) => void;
}
const AppContainer = ({ weatherResult, forecast, isButtonDisabled, onChange, onClick }: IAppContainerProps): JSX.Element => {
    return <>
        <CssBaseline />
        <Container maxWidth={"xs"} fixed={true}>
            <CustomHeader text={"Weather App"} />
            <CustomInput onChange={onChange} label={"City Name"} id={""} error={false} />
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