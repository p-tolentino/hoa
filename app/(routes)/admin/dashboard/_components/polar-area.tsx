"use client";

import React from "react";
import { Box } from "@chakra-ui/react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface PolarAreaChartState {
  series: number[];
  options?: ApexOptions;
}

class PolarAreaChart extends React.Component<{}, PolarAreaChartState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      series: [14, 23, 21, 17, 15, 10, 12, 17, 21],
      options: {
        chart: {
          type: "polarArea",
        },
        stroke: {
          colors: ["#fff"],
        },
        fill: {
          opacity: 0.8,
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
        labels: [
          "one",
          "two",
          "three",
          "four",
          "five",
          "six",
          "seven",
          "eight",
          "nine",
        ],
        colors: ["#9F7AEA", "#ED64A6", "#4299E1", "#ED8936", "#38B2AC"],
      },
    };
  }

  render() {
    return (
      <Box>
        <Box id="chart">
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="polarArea"
            height={250}
            width={"100%"}
          />
        </Box>
        <Box id="html-dist"></Box>
      </Box>
    );
  }
}

export default PolarAreaChart;
