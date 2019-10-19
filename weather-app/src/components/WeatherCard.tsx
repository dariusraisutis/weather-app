import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  card: {
    minWidth: 250,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
    fontWeight: 100
  },
  pos: {
    marginBottom: 12,
  },
});

interface IWeatherCardProps {
    temp: number;
    maxTemp?: number;
    minTemp?: number;
    category?: string;
    averageTemperature?: number;
    windSpeed?: number;
    weekDay?: string
    key: number;
    cityName?: string;

}

const WeatherCard = (props: IWeatherCardProps): JSX.Element => {
    const { temp, category, windSpeed, cityName } = props;
    const celcius = `${temp}\xB0C`;
    const speed = `${windSpeed} m/s`;
    const classes = useStyles();

    return <>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} variant={"h5"} color="textSecondary" gutterBottom>
              {cityName}
            </Typography>
            <Typography>
              {category}
            </Typography>
            <Typography>
            {"Temperature: "}{celcius}
            </Typography>
            <Typography>
              {"Wind Speed: "}{speed}
            </Typography>
          </CardContent>
          
        </Card>
    </>
}

export default WeatherCard;