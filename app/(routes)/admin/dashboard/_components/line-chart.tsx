"use client";

import React from "react";
import { Box } from "@chakra-ui/react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
// import dynamic from "next/dynamic";
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface LineChartState {
  series: {
    name: string;
    data: number[];
  }[];
  options?: ApexOptions;
}

class LineChart extends React.Component<{}, LineChartState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      series: [
        {
          name: "Revenue",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 166, 201, 250],
        },
      ],
      options: {
        chart: {
          height: 300,
          type: "line",
          zoom: {
            enabled: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"],
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        },
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
            type="line"
            height={250}
          />
        </Box>
        <Box id="html-dist"></Box>
      </Box>
    );
  }
}

export default LineChart;
