import React from "react";
import { Bar, defaults } from "react-chartjs-2";

export const DataChart = props => {
  defaults.global.defaultFontColor = "white";
  const { data, text } = props.data;

  const width = window.innerWidth > 1500 ? 3 : 2;

  return (
    <div className="chart">
      <Bar
        data={data}
        width={width}
        height={2}
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
