import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const BarChart = ({ data }) => {
  return (
    <div style={{ height: 400 }}>
      <ResponsiveBar
        className="chart-svg"
        data={data}
        keys={["count"]}
        indexBy="name"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.4}
        valueScale={{ type: "linear" }}
        colors={{ scheme: "accent" }}
        colorBy="indexValue"
        animate={true}
        labelSkipWidth={12}
        labelSkipHeight={12}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default BarChart;
