import React from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface BarChartState {
  series: {
    data: number[];
  }[];
  options?: ApexOptions;
  currentPage: number;
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
          categories: ["Jan", "Feb", "Mar", "Apr"],
        },
      },
      currentPage: 1,
    };
    // Set page 1 as the default with the initial months
    this.handlePageChange(1);
  }

  handlePageChange = (page: number) => {
    // Update categories based on the current page
    const startIndex = (page - 1) * 4;
    const endIndex = startIndex + 4;
    const allMonths = [
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
    ];
    const updatedCategories = allMonths.slice(startIndex, endIndex);

    this.setState({
      options: {
        ...this.state.options,
        xaxis: {
          categories: updatedCategories,
        },
      },
      currentPage: page,
    });
  };

  render() {
    return (
      <Box>
        <Box id="chart">
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="bar"
            height={250}
            width={"100%"}
          />
        </Box>
        <Flex justifyContent="center" gap={2}>
          <Button
            size="xs"
            onClick={() => this.handlePageChange(1)}
            disabled={this.state.currentPage === 1}
          >
            Page 1
          </Button>
          <Button
            size="xs"
            onClick={() => this.handlePageChange(2)}
            disabled={this.state.currentPage === 2}
          >
            Page 2
          </Button>
          <Button
            size="xs"
            onClick={() => this.handlePageChange(3)}
            disabled={this.state.currentPage === 3}
          >
            Page 3
          </Button>
          {/* Add more buttons for additional pages if needed */}
        </Flex>
        <Box id="html-dist"></Box>
      </Box>
    );
  }
}

export default BarChart;
