import React from "react";
import { makeStyles, CssBaseline, Container } from "@material-ui/core";
import { Weather, ForecastData } from "../services/WeatherProvder";
import CustomHeader from "./CustomHeader";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton"
import WeatherCard from "./WeatherCard";
import CustomGraph from "./CustomGraph";


const useStyles = makeStyles({
    root: {
        flex: 1,
        width: 500
    }
});

interface IAppContainerProps {
    weatherResult: Weather[];
    forecast: ForecastData[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClick: (event: React.MouseEvent<HTMLSpanElement>) => void;
}
const AppContainer = ({ weatherResult, forecast, onChange, onClick }: IAppContainerProps): JSX.Element => {

    return <>
        <CssBaseline />
        <Container maxWidth={"xs"} fixed={true}>
            <CustomHeader text={"Weather App"} />
            <CustomInput onChange={onChange} label={"City Name"} id={""} error={false} />
            <CustomButton onClick={onClick} label={"Click Me"} />
            {
                weatherResult ?
                    weatherResult.map((current, key) => {
                        return <WeatherCard
                            temp={current.currentTemperature}
                            category={current.category}
                            windSpeed={current.windSpeed}
                            cityName={current.cityName}
                            country={current.country}
                            currentTime={current.currentTime}
                            key={key}
                        />
                    })
                    : null
            }
            { forecast.length ? <CustomGraph data={forecast} /> : null }
        </Container>
    </>
}

export default AppContainer;