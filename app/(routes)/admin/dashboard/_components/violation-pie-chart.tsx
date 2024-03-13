import React from "react";
import { Box } from "@chakra-ui/react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface ViolationPieChartState {
  series: number[];
  options: ApexOptions;
}

class ViolationPieChart extends React.Component<{}, ViolationPieChartState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      series: [44, 55, 13, 43, 22],
      options: {
        chart: {
          type: "pie",
        },
        labels: [
          "violation",
          "violation",
          "violation",
          "violation",
          "violation",
        ],
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
            type="pie"
            height={250}
            width={"100%"}
          />
        </Box>
        <Box id="html-dist"></Box>
      </Box>
    );
  }
}

export default ViolationPieChart;