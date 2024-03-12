"use client";

import React from "react";
import { Box } from "@chakra-ui/react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface BarChartState {
  series: {
    data: number[];
  }[];
  options?: ApexOptions;
}

class BarChart extends React.Component<{}, BarChartState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      series: [
        {
          data: [44, 55, 41, 64],
        },
        {
          data: [53, 32, 33, 52],
        },
      ],
      options: {
        chart: {
          type: "bar",
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: "top",
            },
          },
        },
        dataLabels: {
          enabled: true,
          offsetX: -6,
          style: {
            fontSize: "12px",
            colors: ["#fff"],
          },
        },
        stroke: {
          show: true,
          width: 1,
          colors: ["#fff"],
        },
        tooltip: {
          shared: true,
          intersect: false,
        },
        xaxis: {
          categories: ["Q1", "Q2", "Q3", "Q4"],
        },
        labels: ["one", "two"],
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
            type="bar"
            height={250}
          />
        </Box>
        <Box id="html-dist"></Box>
      </Box>
    );
  }
}

export default BarChart;
