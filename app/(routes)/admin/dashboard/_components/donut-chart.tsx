"use client";

import React from "react";
import { Box } from "@chakra-ui/react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface ApexChartState {
  series: number[];
  options: ApexOptions;
}

class ApexChart extends React.Component<{}, ApexChartState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      series: [44, 55, 41, 17, 15],
      options: {
        chart: {
          type: "donut",
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
            type="donut"
            height={350}
          />
        </Box>
        <Box id="html-dist"></Box>
      </Box>
    );
  }
}

export default ApexChart;
