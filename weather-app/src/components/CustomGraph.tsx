import React from "react"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import { ForecastData } from "../services/WeatherProvder";


interface ICustomGraphProps {
    data: ForecastData[];
}

const CustomGraph = (props: ICustomGraphProps) => {
  // TODO: replace graph as this does not satisfy
    return <>
        <AreaChart
          width={350}
          height={100}
          data={props.data}
          margin={{
            top: 0, right: 0, left: 0, bottom: 0,
          }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Area type="basis" dataKey="temp" stroke="#8884d8" fill="#3f51b5" />
      </AreaChart>
    </>;
}

export default CustomGraph;
