import React from "react";
import { Bar, defaults } from "react-chartjs-2";

export const DataChart = props => {
  defaults.global.defaultFontColor = "white";
  const { data, text } = props.data;

  const height = window.innerHeight > 700 ? 1 : 2;
  const width = window.innerWidth > 1500 ? 3 : 2;

  return (
    <div className="chart">
      <Bar
        data={data}
        width={width}
        height={height}
        options={{
          title: {
            display: true,
            text: text
          }
        }}
      />
    </div>
  );
};
