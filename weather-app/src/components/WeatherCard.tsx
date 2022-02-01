import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from "@material-ui/core";
import { Weather } from "../services/WeatherProvder";

const useStyles = makeStyles({
  card: {
    minWidth: 150,
  },
});

interface IWeatherCardProps {
    weather: Weather;
}

const WeatherCard = ({ weather }: IWeatherCardProps): JSX.Element => {
    const { currentTemperature, category, windSpeed, cityName, country, currentTime } = weather;
    const termperature = `Temperature: ${currentTemperature}\xB0C`;
    const speed = `Wind Speed: ${windSpeed} m/s`;
    const location = `${cityName}, ${country}`;
    const classes = useStyles();
    return <>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant={"h5"} color="textSecondary" gutterBottom>
              {location}
            </Typography>
            <Typography>
              {currentTime}
            </Typography>
            <Typography>
              {category}
            </Typography>
            <Typography>
              {termperature}
            </Typography>
            <Typography>
              {speed}
            </Typography>
          </CardContent>
        </Card>
    </>
}

export default WeatherCard;