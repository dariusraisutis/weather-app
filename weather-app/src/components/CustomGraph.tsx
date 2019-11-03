import React from "react"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import { ForecastData } from "../services/WeatherProvder";


interface ICustomGraphProps {
    data: ForecastData[];
}

const CustomGraph = (props: ICustomGraphProps) => {
    return <>
        <AreaChart
        width={500}
        height={120}
        data={props.data}
        margin={{
          top: 10, right: 30, left: 0, bottom: 0,
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
