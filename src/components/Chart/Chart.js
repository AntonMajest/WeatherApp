
import React from "react";
import {
  AreaChart,
  Area,

  Tooltip
} from "recharts";


export default  function Chart(chart) {
 chart.chart[0].list.map(item => {
    return Math.round(item.main.temp - 273)
  })
  return (
    <AreaChart
      width={320}
      height={100}
      data={chart.chart[0].list.map(item => item.main)}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 15
      }}
    >
     
     
      <Tooltip />
      <Area type="monotone" dataKey="temp" stroke="#FCD1D6" fill="#FCD1D6" />
    </AreaChart>
  );
}
