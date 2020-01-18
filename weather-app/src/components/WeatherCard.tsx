import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  card: {
    minWidth: 150,
  },
});

interface IWeatherCardProps {
    temp?: number;
    maxTemp?: number;
    minTemp?: number;
    category?: string;
    windSpeed?: number;
    weekDay?: string
    key?: number;
    cityName?: string;
    country?: string;
    currentTime?: string;

}

const WeatherCard = ({ temp, category, windSpeed, cityName, country, currentTime }: IWeatherCardProps): JSX.Element => {
    const termperature = `Temperature: ${temp}\xB0C`;
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